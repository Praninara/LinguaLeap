import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Redis from 'ioredis';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { generateWordPairs, getFallbackWordPairs } from './services/wordService.js';

let redis;
try {
  redis = new Redis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null // Disable retries
  });

  redis.on('error', (err) => {
    console.log('Redis connection error, falling back to in-memory storage:', err.message);
    redis = null;
  });
} catch (error) {
  console.log('Failed to initialize Redis, falling back to in-memory storage:', error.message);
  redis = null;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

const port = process.env.PORT || 5001;

// In-memory storage (Redis alternative)
const gameState = new Map();
const matchmakingQueue = {
  french: [],
  spanish: []
};
const gameLeaderboard = new Map();
const globalLeaderboard = new Map();
const questionCache = new Map();
const usedQuestions = new Map(); // Track used questions per room

// Redis/fallback operations
async function cacheWordPairs(language, wordPairs) {
  const key = `wordpairs:${language}`;
  if (redis) {
    await redis.sadd(key, ...wordPairs.map(pair => JSON.stringify(pair)));
  } else {
    // Fallback to in-memory cache
    if (!questionCache.has(key)) {
      questionCache.set(key, new Set());
    }
    wordPairs.forEach(pair => {
      questionCache.get(key).add(JSON.stringify(pair));
    });
  }
}

async function getRandomWordPair(roomId, language) {
  const key = `wordpairs:${language}`;
  let pair = null;
  let attempts = 0;
  const maxAttempts = 10;

  // Initialize used questions set for the room if it doesn't exist
  if (!usedQuestions.has(roomId)) {
    usedQuestions.set(roomId, new Set());
  }

  while (!pair && attempts < maxAttempts) {
    if (redis) {
      const randomPair = await redis.srandmember(key);
      if (randomPair && !usedQuestions.get(roomId).has(randomPair)) {
        pair = JSON.parse(randomPair);
        usedQuestions.get(roomId).add(randomPair);
      }
    } else {
      const cache = questionCache.get(key);
      if (cache && cache.size > 0) {
        const unusedPairs = Array.from(cache).filter(p => !usedQuestions.get(roomId).has(p));
        if (unusedPairs.length > 0) {
          const randomIndex = Math.floor(Math.random() * unusedPairs.length);
          pair = JSON.parse(unusedPairs[randomIndex]);
          usedQuestions.get(roomId).add(unusedPairs[randomIndex]);
        }
      }
    }
    attempts++;
  }

  // If we've used all questions or can't find a new one, reset and fetch new batch
  if (!pair) {
    usedQuestions.get(roomId).clear();
    await prefetchWordPairs(language);
    return getRandomWordPair(roomId, language); // Try again with fresh questions
  }

  return pair;
}

async function prefetchWordPairs(language) {
  try {
    const pairs = await generateWordPairs(language, 20);
    await cacheWordPairs(language, pairs);
  } catch (error) {
    console.error('Error prefetching word pairs:', error);
    // Use fallback pairs if API fails
    const fallbackPairs = getFallbackWordPairs(language);
    await cacheWordPairs(language, fallbackPairs);
  }
}

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);

// API endpoints for leaderboards
app.get('/api/leaderboard/global', async (req, res) => {
  try {
    const users = await mongoose.model('User').find().sort('-totalXP').limit(10).select('name totalXP -_id');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

app.get('/api/leaderboard/game/:gameId', (req, res) => {
  const gameLeaderboardData = Array.from(gameLeaderboard.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(gameLeaderboardData);
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Helper function to update global leaderboard
async function updateGlobalLeaderboard(username, xp) {
  try {
    const user = await mongoose.model('User').findOne({ name: username });
    if (user) {
      user.totalXP += xp;
      await user.save();
      
      const globalData = globalLeaderboard.get(username) || { totalXP: 0 };
      globalData.totalXP += xp;
      globalLeaderboard.set(username, globalData);
      
      io.emit('globalLeaderboardUpdate', Array.from(globalLeaderboard.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.totalXP - a.totalXP)
        .slice(0, 10)
      );
    }
  } catch (error) {
    console.error('Error updating global leaderboard:', error);
  }
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle matchmaking
  socket.on('findMatch', async ({ username, language }) => {
    // Ensure we have word pairs cached
    const cacheKey = `wordpairs:${language}`;
    const cacheSize = redis ? 
      await redis.scard(cacheKey) : 
      (questionCache.get(cacheKey)?.size || 0);
    
    if (cacheSize < 10) {
      await prefetchWordPairs(language);
    }

    matchmakingQueue[language].push({ id: socket.id, username });
    
    if (matchmakingQueue[language].length >= 2) {
      const roomId = `${language}_${Date.now()}`;
      const players = matchmakingQueue[language].splice(0, 2);
      
      const room = {
        id: roomId,
        language,
        players,
        scores: {},
        currentWord: '',
        translation: '',
        roundStartTime: null,
        gameStarted: false,
        revealedChars: '',
        questionsUsed: 0
      };
      
      gameState.set(roomId, room);
      players.forEach(player => {
        room.scores[player.id] = 0;
        const playerSocket = io.sockets.sockets.get(player.id);
        if (playerSocket) {
          playerSocket.join(roomId);
        }
      });

      io.to(roomId).emit('matchFound', { roomId });
      startNewRound(roomId);
    }
  });

  // Join private room
  socket.on('joinRoom', ({ roomId, username, language }) => {
    let room = gameState.get(roomId);
    
    if (!room) {
      room = {
        id: roomId,
        language,
        players: [],
        scores: {},
        currentWord: '',
        translation: '',
        roundStartTime: null,
        gameStarted: false,
        revealedChars: '',
        questionsUsed: 0
      };
      gameState.set(roomId, room);
    }

    if (room.players.length >= 4) {
      socket.emit('roomFull');
      return;
    }

    const player = { id: socket.id, username };
    room.players.push(player);
    room.scores[socket.id] = 0;
    socket.join(roomId);

    io.to(roomId).emit('playerJoined', {
      players: room.players,
      scores: room.scores
    });

    if (room.players.length >= 2 && !room.gameStarted) {
      room.gameStarted = true;
      startNewRound(roomId);
    }
  });

  // Leave room
  socket.on('leaveRoom', ({ roomId }) => {
    const room = gameState.get(roomId);
    if (room) {
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        delete room.scores[socket.id];
        socket.leave(roomId);

        if (room.players.length === 0) {
          usedQuestions.delete(roomId); // Clean up used questions tracking
          gameState.delete(roomId);
          io.to(roomId).emit('roomDeleted');
        } else {
          io.to(roomId).emit('playerLeft', {
            players: room.players,
            scores: room.scores
          });
        }
      }
    }
  });

  // Modify the startNewRound function to use Redis/fallback
  async function startNewRound(roomId) {
    const room = gameState.get(roomId);
    if (!room) return;

    const wordPair = await getRandomWordPair(roomId, room.language);
    if (!wordPair) {
      // If we still can't get a word pair after resetting, use fallback
      const fallbackPairs = getFallbackWordPairs(room.language);
      const randomIndex = Math.floor(Math.random() * fallbackPairs.length);
      room.currentWord = fallbackPairs[randomIndex].word;
      room.translation = fallbackPairs[randomIndex].translation;
      room.alternativeTranslations = fallbackPairs[randomIndex].alternativeTranslations;
    } else {
      room.currentWord = wordPair.word;
      room.translation = wordPair.translation;
      room.alternativeTranslations = wordPair.alternativeTranslations;
    }

    room.roundStartTime = Date.now();
    room.revealedChars = '_'.repeat(room.currentWord.length);
    room.questionsUsed++;
    
    io.to(roomId).emit('newRound', {
      word: room.currentWord,
      translation: room.translation,
      hint: room.revealedChars
    });

    // Prefetch more words if cache is running low or we've used many questions
    const cacheKey = `wordpairs:${room.language}`;
    const cacheSize = redis ? 
      await redis.scard(cacheKey) : 
      (questionCache.get(cacheKey)?.size || 0);
    
    if (cacheSize < 5 || room.questionsUsed >= 10) {
      prefetchWordPairs(room.language);
      room.questionsUsed = 0; // Reset counter after fetching new batch
    }
  }

  // Modify the makeGuess handler to support alternative translations
  socket.on('makeGuess', ({ roomId, guess }) => {
    const room = gameState.get(roomId);
    if (!room) return;

    const currentWordLower = room.currentWord.toLowerCase();
    const guessLower = guess.toLowerCase();
    const player = room.players.find(p => p.id === socket.id);
    
    const isCorrect = guessLower === currentWordLower || 
                     room.alternativeTranslations?.includes(guessLower);

    if (isCorrect) {
      // Calculate score based on time taken
      const timeTaken = (Date.now() - room.roundStartTime) / 1000;
      const timeBonus = Math.max(0, Math.floor((30 - timeTaken) * 10));
      const points = 100 + timeBonus;
      
      room.scores[socket.id] += points;
      room.revealedChars = room.currentWord;

      // Update game leaderboard
      const playerGameData = gameLeaderboard.get(player.username) || { score: 0 };
      playerGameData.score += points;
      gameLeaderboard.set(player.username, playerGameData);

      // Update global leaderboard
      updateGlobalLeaderboard(player.username, points);

      io.to(roomId).emit('correctGuess', {
        player,
        scores: room.scores,
        revealedChars: room.currentWord
      });

      // Send updated leaderboards
      io.to(roomId).emit('gameLeaderboardUpdate', Array.from(gameLeaderboard.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      );

      // Start new round after delay
      setTimeout(() => startNewRound(roomId), 2000);
    } else {
      // Partial match handling
      let newRevealedChars = '';
      let correctChars = 0;
      
      for (let i = 0; i < currentWordLower.length; i++) {
        if (i < guessLower.length && guessLower[i] === currentWordLower[i]) {
          newRevealedChars += room.currentWord[i];
          correctChars++;
        } else {
          newRevealedChars += room.revealedChars[i] !== '_' 
            ? room.revealedChars[i] 
            : '_';
        }
      }
      
      if (correctChars > 0) {
        const partialPoints = correctChars * 10;
        room.scores[socket.id] += partialPoints;
        room.revealedChars = newRevealedChars;
        
        io.to(roomId).emit('correctGuess', {
          player,
          scores: room.scores,
          revealedChars: newRevealedChars
        });
      } else {
        room.scores[socket.id] = Math.max(0, room.scores[socket.id] - 20);
        io.to(roomId).emit('wrongGuess', {
          player,
          scores: room.scores
        });
      }
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    gameState.forEach((room, roomId) => {
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        delete room.scores[socket.id];
        
        if (room.players.length === 0) {
          usedQuestions.delete(roomId); // Clean up used questions tracking
          gameState.delete(roomId);
        } else {
          io.to(roomId).emit('playerLeft', {
            players: room.players,
            scores: room.scores
          });
        }
      }
    });

    // Remove from matchmaking queue
    Object.keys(matchmakingQueue).forEach(language => {
      const index = matchmakingQueue[language].findIndex(p => p.id === socket.id);
      if (index !== -1) {
        matchmakingQueue[language].splice(index, 1);
      }
    });
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://narayanaudayagiri88:narayanaudayagiri88@cluster0.xfb8w.mongodb.net/synergy`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start Server
connectDB().then(() => {
  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});