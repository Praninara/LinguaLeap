// // // Import required dependencies
// // import express from 'express';
// // import cors from 'cors';
// // import cookieParser from 'cookie-parser';
// // import mongoose from 'mongoose';
// // import { createServer } from 'http';
// // import { Server } from 'socket.io';
// // import Redis from 'ioredis';
// // import userRoutes from './routes/userRoutes.js';
// // import gameRoutes from './routes/gameRoutes.js';
// // import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// // import { generateWordPairs, getFallbackWordPairs, generateMemoryPairs, generateDinoQuestions } from './services/wordService.js';
// // import promClient from 'prom-client';
// //
// // // Initialize Prometheus metrics collection
// // const collectDefaultMetrics = promClient.collectDefaultMetrics;
// // collectDefaultMetrics({ timeout: 5000 });
// //
// // // Custom Prometheus metrics
// // const activeGamesGauge = new promClient.Gauge({
// //   name: 'active_games_total',
// //   help: 'Number of active game rooms'
// // });
// //
// // const activePlayersGauge = new promClient.Gauge({
// //   name: 'active_players_total',
// //   help: 'Number of connected players'
// // });
// //
// // const wordGuessCounter = new promClient.Counter({
// //   name: 'word_guesses_total',
// //   help: 'Total number of word guesses',
// //   labelNames: ['correct']
// // });
// //
// // /**
// //  * Redis Configuration with Retry Mechanism
// //  * - Handles connection failures gracefully
// //  * - Implements retry strategy with backoff
// //  * - Falls back to in-memory storage if Redis is unavailable
// //  */
// // let redis;
// // const initRedis = () => {
// //   try {
// //     redis = new Redis({
// //       host: process.env.REDIS_HOST || 'redis',
// //       port: parseInt(process.env.REDIS_PORT || '6379'),
// //       password: 'RedisPassword123',
// //       maxRetriesPerRequest: 3,
// //       retryStrategy: (times) => {
// //         if (times > 3) {
// //           console.log('Redis retry limit exceeded, falling back to in-memory storage');
// //           return null;
// //         }
// //         const delay = Math.min(times * 1000, 3000);
// //         console.log(`Retrying Redis connection in ${delay}ms...`);
// //         return delay;
// //       },
// //       reconnectOnError: (err) => {
// //         console.log('Redis connection error:', err.message);
// //         return true;
// //       }
// //     });
// //
// //     redis.on('connect', () => {
// //       console.log('Successfully connected to Redis');
// //     });
// //
// //     redis.on('error', (err) => {
// //       console.log('Redis connection error, falling back to in-memory storage:', err.message);
// //       redis = null;
// //     });
// //
// //     return redis;
// //   } catch (error) {
// //     console.log('Failed to initialize Redis, falling back to in-memory storage:', error.message);
// //     return null;
// //   }
// // };
// //
// // redis = initRedis();
// //
// // // Initialize Express app and create HTTP server
// // const app = express();
// // const httpServer = createServer(app);
// // const io = new Server(httpServer, {
// //   cors: {
// //     origin: 'https://praninara.github.io',
// //     credentials: true,
// //     methods: ['GET', 'POST', 'PUT', 'DELETE']
// //   }
// // });
// //
// // const port = process.env.PORT || 5003;
// //
// // /**
// //  * In-memory Storage (Redis Alternative)
// //  * Used as fallback when Redis is unavailable
// //  */
// // const gameState = new Map();
// // const matchmakingQueue = {
// //   french: [],
// //   spanish: []
// // };
// // const gameLeaderboard = new Map();
// // const globalLeaderboard = new Map();
// // const questionCache = new Map();
// // const usedQuestions = new Map();
// //
// // /**
// //  * Cache word pairs in Redis or fallback storage
// //  * @param {string} language - Target language for word pairs
// //  * @param {Array} wordPairs - Array of word pairs to cache
// //  */
// // async function cacheWordPairs(language, wordPairs) {
// //   const key = `wordpairs:${language}`;
// //   if (redis) {
// //     try {
// //       await redis.sadd(key, ...wordPairs.map(pair => JSON.stringify(pair)));
// //       console.log(`Successfully cached ${wordPairs.length} word pairs for ${language}`);
// //     } catch (error) {
// //       console.error('Error caching word pairs:', error);
// //       if (!questionCache.has(key)) {
// //         questionCache.set(key, new Set());
// //       }
// //       wordPairs.forEach(pair => {
// //         questionCache.get(key).add(JSON.stringify(pair));
// //       });
// //     }
// //   } else {
// //     if (!questionCache.has(key)) {
// //       questionCache.set(key, new Set());
// //     }
// //     wordPairs.forEach(pair => {
// //       questionCache.get(key).add(JSON.stringify(pair));
// //     });
// //   }
// // }
// //
// // /**
// //  * Get a random word pair for a game room
// //  * - Tracks used questions per room
// //  * - Handles Redis failures gracefully
// //  * - Implements automatic question rotation
// //  *
// //  * @param {string} roomId - Game room identifier
// //  * @param {string} language - Target language
// //  * @returns {Object} Word pair object
// //  */
// // async function getRandomWordPair(roomId, language) {
// //   const key = `wordpairs:${language}`;
// //   let pair = null;
// //   let attempts = 0;
// //   const maxAttempts = 10;
// //
// //   if (!usedQuestions.has(roomId)) {
// //     usedQuestions.set(roomId, new Set());
// //   }
// //
// //   while (!pair && attempts < maxAttempts) {
// //     if (redis) {
// //       try {
// //         const randomPair = await redis.srandmember(key);
// //         if (randomPair && !usedQuestions.get(roomId).has(randomPair)) {
// //           pair = JSON.parse(randomPair);
// //           usedQuestions.get(roomId).add(randomPair);
// //         }
// //       } catch (error) {
// //         console.error('Error getting random word pair from Redis:', error);
// //         redis = null;
// //         break;
// //       }
// //     } else {
// //       const cache = questionCache.get(key);
// //       if (cache && cache.size > 0) {
// //         const unusedPairs = Array.from(cache).filter(p => !usedQuestions.get(roomId).has(p));
// //         if (unusedPairs.length > 0) {
// //           const randomIndex = Math.floor(Math.random() * unusedPairs.length);
// //           pair = JSON.parse(unusedPairs[randomIndex]);
// //           usedQuestions.get(roomId).add(unusedPairs[randomIndex]);
// //         }
// //       }
// //     }
// //     attempts++;
// //   }
// //
// //   if (!pair) {
// //     usedQuestions.get(roomId).clear();
// //     await prefetchWordPairs(language);
// //     return getRandomWordPair(roomId, language);
// //   }
// //
// //   return pair;
// // }
// //
// // /**
// //  * Prefetch word pairs for a language
// //  * - Ensures content availability
// //  * - Handles API failures with fallback content
// //  *
// //  * @param {string} language - Target language
// //  */
// // async function prefetchWordPairs(language) {
// //   try {
// //     const pairs = await generateWordPairs(language, 20);
// //     await cacheWordPairs(language, pairs);
// //   } catch (error) {
// //     console.error('Error prefetching word pairs:', error);
// //     const fallbackPairs = getFallbackWordPairs(language);
// //     await cacheWordPairs(language, fallbackPairs);
// //   }
// // }
// //
// // // Middleware Configuration
// // app.use(cors({
// //   origin: 'https://praninara.github.io',
// //   credentials: true,
// //   methods: ['GET', 'POST', 'PUT', 'DELETE']
// // }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());
// //
// // // Prometheus metrics endpoint
// // app.get('/metrics', async (req, res) => {
// //   try {
// //     res.set('Content-Type', promClient.register.contentType);
// //     res.end(await promClient.register.metrics());
// //   } catch (err) {
// //     res.status(500).end(err);
// //   }
// // });
// //
// // // API Routes
// // app.use('/api/users', userRoutes);
// // app.use('/api/games', gameRoutes);
// //
// // // Single-player game endpoints
// // app.get('/api/memory-game/pairs/:level', async (req, res) => {
// //   try {
// //     const level = parseInt(req.params.level);
// //     const pairs = await generateMemoryPairs(level);
// //     res.json(pairs);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error generating memory pairs' });
// //   }
// // });
// //
// // app.get('/api/dino-game/questions/:level', async (req, res) => {
// //   try {
// //     const level = parseInt(req.params.level);
// //     const questions = await generateDinoQuestions(level);
// //     res.json(questions);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error generating questions' });
// //   }
// // });
// //
// // // Leaderboard endpoints
// // app.get('/api/leaderboard/global', async (req, res) => {
// //   try {
// //     const users = await mongoose.model('User').find().sort('-totalXP').limit(10).select('name totalXP -_id');
// //     res.json(users);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching leaderboard' });
// //   }
// // });
// //
// // app.get('/api/leaderboard/game/:gameId', (req, res) => {
// //   const gameLeaderboardData = Array.from(gameLeaderboard.entries())
// //     .map(([name, data]) => ({ name, ...data }))
// //     .sort((a, b) => b.score - a.score)
// //     .slice(0, 10);
// //   res.json(gameLeaderboardData);
// // });
// //
// // // Error Handling Middleware
// // app.use(notFound);
// // app.use(errorHandler);
// //
// // /**
// //  * Update global leaderboard and persist to database
// //  * @param {string} username - Player username
// //  * @param {number} xp - Experience points to add
// //  */
// // async function updateGlobalLeaderboard(username, xp) {
// //   try {
// //     const user = await mongoose.model('User').findOne({ name: username });
// //     if (user) {
// //       user.totalXP += xp;
// //       await user.save();
// //
// //       const globalData = globalLeaderboard.get(username) || { totalXP: 0 };
// //       globalData.totalXP += xp;
// //       globalLeaderboard.set(username, globalData);
// //
// //       io.emit('globalLeaderboardUpdate', Array.from(globalLeaderboard.entries())
// //         .map(([name, data]) => ({ name, ...data }))
// //         .sort((a, b) => b.totalXP - a.totalXP)
// //         .slice(0, 10)
// //       );
// //     }
// //   } catch (error) {
// //     console.error('Error updating global leaderboard:', error);
// //   }
// // }
// //
// // // Socket.IO connection handling
// // io.on('connection', (socket) => {
// //   console.log('User connected:', socket.id);
// //   activePlayersGauge.inc();
// //
// //   socket.on('findMatch', async ({ username, language }) => {
// //     const cacheKey = `wordpairs:${language}`;
// //     const cacheSize = redis ?
// //       await redis.scard(cacheKey) :
// //       (questionCache.get(cacheKey)?.size || 0);
// //
// //     if (cacheSize < 10) {
// //       await prefetchWordPairs(language);
// //     }
// //
// //     matchmakingQueue[language].push({ id: socket.id, username });
// //
// //     if (matchmakingQueue[language].length >= 2) {
// //       const roomId = `${language}_${Date.now()}`;
// //       const players = matchmakingQueue[language].splice(0, 2);
// //
// //       const room = {
// //         id: roomId,
// //         language,
// //         players,
// //         scores: {},
// //         currentWord: '',
// //         translation: '',
// //         roundStartTime: null,
// //         gameStarted: false,
// //         revealedChars: '',
// //         questionsUsed: 0
// //       };
// //
// //       gameState.set(roomId, room);
// //       players.forEach(player => {
// //         room.scores[player.id] = 0;
// //         const playerSocket = io.sockets.sockets.get(player.id);
// //         if (playerSocket) {
// //           playerSocket.join(roomId);
// //         }
// //       });
// //
// //       io.to(roomId).emit('roomInfo', {
// //         roomId,
// //         players: room.players,
// //         scores: room.scores
// //       });
// //
// //       setTimeout(() => {
// //         io.to(roomId).emit('matchFound', { roomId });
// //         startNewRound(roomId);
// //       }, 2000);
// //
// //       activeGamesGauge.inc();
// //     }
// //   });
// //
// //   socket.on('joinRoom', ({ roomId, username, language }) => {
// //     let room = gameState.get(roomId);
// //
// //     if (!room) {
// //       room = {
// //         id: roomId,
// //         language,
// //         players: [],
// //         scores: {},
// //         currentWord: '',
// //         translation: '',
// //         roundStartTime: null,
// //         gameStarted: false,
// //         revealedChars: '',
// //         questionsUsed: 0
// //       };
// //       gameState.set(roomId, room);
// //       activeGamesGauge.inc();
// //     }
// //
// //     if (room.players.length >= 4) {
// //       socket.emit('roomFull');
// //       return;
// //     }
// //
// //     const player = { id: socket.id, username };
// //     room.players.push(player);
// //     room.scores[socket.id] = 0;
// //     socket.join(roomId);
// //
// //     io.to(roomId).emit('roomInfo', {
// //       roomId,
// //       players: room.players,
// //       scores: room.scores
// //     });
// //
// //     io.to(roomId).emit('playerJoined', {
// //       players: room.players,
// //       scores: room.scores
// //     });
// //
// //     if (room.players.length >= 2 && !room.gameStarted) {
// //       room.gameStarted = true;
// //       setTimeout(() => startNewRound(roomId), 2000);
// //     }
// //   });
// //
// //   socket.on('leaveRoom', ({ roomId }) => {
// //     const room = gameState.get(roomId);
// //     if (room) {
// //       const playerIndex = room.players.findIndex(p => p.id === socket.id);
// //       if (playerIndex !== -1) {
// //         room.players.splice(playerIndex, 1);
// //         delete room.scores[socket.id];
// //         socket.leave(roomId);
// //
// //         if (room.players.length === 0) {
// //           usedQuestions.delete(roomId);
// //           gameState.delete(roomId);
// //           activeGamesGauge.dec();
// //           io.to(roomId).emit('roomDeleted');
// //         } else {
// //           io.to(roomId).emit('playerLeft', {
// //             players: room.players,
// //             scores: room.scores
// //           });
// //         }
// //       }
// //     }
// //   });
// //
// //   /**
// //    * Start a new game round
// //    * - Fetches new word pair
// //    * - Updates game state
// //    * - Notifies players
// //    *
// //    * @param {string} roomId - Game room identifier
// //    */
// //   async function startNewRound(roomId) {
// //     const room = gameState.get(roomId);
// //     if (!room) return;
// //
// //     const wordPair = await getRandomWordPair(roomId, room.language);
// //     if (!wordPair) {
// //       const fallbackPairs = getFallbackWordPairs(room.language);
// //       const randomIndex = Math.floor(Math.random() * fallbackPairs.length);
// //       room.currentWord = fallbackPairs[randomIndex].word;
// //       room.translation = fallbackPairs[randomIndex].translation;
// //       room.alternativeTranslations = fallbackPairs[randomIndex].alternativeTranslations;
// //     } else {
// //       room.currentWord = wordPair.word;
// //       room.translation = wordPair.translation;
// //       room.alternativeTranslations = wordPair.alternativeTranslations;
// //     }
// //
// //     room.roundStartTime = Date.now();
// //     room.revealedChars = '_'.repeat(room.currentWord.length);
// //     room.questionsUsed++;
// //
// //     io.to(roomId).emit('newRound', {
// //       word: room.currentWord,
// //       translation: room.translation,
// //       hint: room.revealedChars
// //     });
// //
// //     const cacheKey = `wordpairs:${room.language}`;
// //     const cacheSize = redis ?
// //       await redis.scard(cacheKey) :
// //       (questionCache.get(cacheKey)?.size || 0);
// //
// //     if (cacheSize < 5 || room.questionsUsed >= 10) {
// //       prefetchWordPairs(room.language);
// //       room.questionsUsed = 0;
// //     }
// //   }
// //
// //   socket.on('makeGuess', ({ roomId, guess }) => {
// //     const room = gameState.get(roomId);
// //     if (!room) return;
// //
// //     const currentWordLower = room.currentWord.toLowerCase();
// //     const guessLower = guess.toLowerCase();
// //     const player = room.players.find(p => p.id === socket.id);
// //
// //     const isCorrect = guessLower === currentWordLower ||
// //                      room.alternativeTranslations?.includes(guessLower);
// //
// //     if (isCorrect) {
// //       wordGuessCounter.inc({ correct: 'true' });
// //       const timeTaken = (Date.now() - room.roundStartTime) / 1000;
// //       const timeBonus = Math.max(0, Math.floor((30 - timeTaken) * 10));
// //       const points = 100 + timeBonus;
// //
// //       room.scores[socket.id] += points;
// //       room.revealedChars = room.currentWord;
// //
// //       const playerGameData = gameLeaderboard.get(player.username) || { score: 0 };
// //       playerGameData.score += points;
// //       gameLeaderboard.set(player.username, playerGameData);
// //
// //       updateGlobalLeaderboard(player.username, points);
// //
// //       io.to(roomId).emit('correctGuess', {
// //         player,
// //         scores: room.scores,
// //         revealedChars: room.currentWord
// //       });
// //
// //       io.to(roomId).emit('gameLeaderboardUpdate', Array.from(gameLeaderboard.entries())
// //         .map(([name, data]) => ({ name, ...data }))
// //         .sort((a, b) => b.score - a.score)
// //         .slice(0, 10)
// //       );
// //
// //       setTimeout(() => startNewRound(roomId), 2000);
// //     } else {
// //       wordGuessCounter.inc({ correct: 'false' });
// //       let newRevealedChars = '';
// //       let correctChars = 0;
// //
// //       for (let i = 0; i < currentWordLower.length; i++) {
// //         if (i < guessLower.length && guessLower[i] === currentWordLower[i]) {
// //           newRevealedChars += room.currentWord[i];
// //           correctChars++;
// //         } else {
// //           newRevealedChars += room.revealedChars[i] !== '_'
// //             ? room.revealedChars[i]
// //             : '_';
// //         }
// //       }
// //
// //       if (correctChars > 0) {
// //         const partialPoints = correctChars * 10;
// //         room.scores[socket.id] += partialPoints;
// //         room.revealedChars = newRevealedChars;
// //
// //         io.to(roomId).emit('correctGuess', {
// //           player,
// //           scores: room.scores,
// //           revealedChars: newRevealedChars
// //         });
// //       } else {
// //         room.scores[socket.id] = Math.max(0, room.scores[socket.id] - 20);
// //         io.to(roomId).emit('wrongGuess', {
// //           player,
// //           scores: room.scores
// //         });
// //       }
// //     }
// //   });
// //
// //   socket.on('disconnect', () => {
// //     activePlayersGauge.dec();
// //     gameState.forEach((room, roomId) => {
// //       const playerIndex = room.players.findIndex(p => p.id === socket.id);
// //       if (playerIndex !== -1) {
// //         room.players.splice(playerIndex, 1);
// //         delete room.scores[socket.id];
// //
// //         if (room.players.length === 0) {
// //           usedQuestions.delete(roomId);
// //           gameState.delete(roomId);
// //           activeGamesGauge.dec();
// //         } else {
// //           io.to(roomId).emit('playerLeft', {
// //             players: room.players,
// //             scores: room.scores
// //           });
// //         }
// //       }
// //     });
// //
// //     Object.keys(matchmakingQueue).forEach(language => {
// //       const index = matchmakingQueue[language].findIndex(p => p.id === socket.id);
// //       if (index !== -1) {
// //         matchmakingQueue[language].splice(index, 1);
// //       }
// //     });
// //   });
// // });
// //
// // // MongoDB Connection
// // const connectDB = async () => {
// //   try {
// //     const conn = await mongoose.connect(`mongodb+srv://narayanaudayagiri88:narayanaudayagiri88@cluster0.xfb8w.mongodb.net/synergy`);
// //     console.log(`MongoDB Connected: ${conn.connection.host}`);
// //   } catch (error) {
// //     console.error(`Error: ${error.message}`);
// //     process.exit(1);
// //   }
// // };
// //
// // // Start Server
// // connectDB().then(() => {
// //   httpServer.listen(port, () => {
// //     console.log(`Server is running on port ${port}`);
// //   });
// // });
// //
// // app.get('/', (req, res) => {
// //   res.send('Welcome to LinguaLeap API');
// // });
//
// // Import required dependencies
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import Redis from 'ioredis';
// import userRoutes from './routes/userRoutes.js';
// import gameRoutes from './routes/gameRoutes.js';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import { generateWordPairs, getFallbackWordPairs, generateMemoryPairs, generateDinoQuestions } from './services/wordService.js';
// import promClient from 'prom-client';
//
// // Initialize Prometheus metrics collection
// const collectDefaultMetrics = promClient.collectDefaultMetrics;
// collectDefaultMetrics({ timeout: 5000 });
//
// // Custom Prometheus metrics
// const activeGamesGauge = new promClient.Gauge({
//   name: 'active_games_total',
//   help: 'Number of active game rooms'
// });
//
// const activePlayersGauge = new promClient.Gauge({
//   name: 'active_players_total',
//   help: 'Number of connected players'
// });
//
// const wordGuessCounter = new promClient.Counter({
//   name: 'word_guesses_total',
//   help: 'Total number of word guesses',
//   labelNames: ['correct']
// });
//
// /**
//  * Redis Configuration with Retry Mechanism
//  * - Handles connection failures gracefully
//  * - Implements retry strategy with backoff
//  * - Falls back to in-memory storage if Redis is unavailable
//  */
// let redis;
// const initRedis = () => {
//   try {
//     redis = new Redis({
//       // host: process.env.REDIS_HOST || 'redis',
//       host: process.env.REDIS_HOST || 'red-d0i8kt24d50c73b7ag20',
//       port: parseInt(process.env.REDIS_PORT || '6379'),
//       // password: 'RedisPassword123',
//       maxRetriesPerRequest: 3,
//       retryStrategy: (times) => {
//         if (times > 3) {
//           console.log('Redis retry limit exceeded, falling back to in-memory storage');
//           return null;
//         }
//         const delay = Math.min(times * 1000, 3000);
//         console.log(`Retrying Redis connection in ${delay}ms...`);
//         return delay;
//       },
//       reconnectOnError: (err) => {
//         console.log('Redis connection error:', err.message);
//         return true;
//       }
//     });
//
//     redis.on('connect', () => {
//       console.log('Successfully connected to Redis');
//     });
//
//     redis.on('error', (err) => {
//       console.log('Redis connection error, falling back to in-memory storage:', err.message);
//       redis = null;
//     });
//
//     return redis;
//   } catch (error) {
//     console.log('Failed to initialize Redis, falling back to in-memory storage:', error.message);
//     return null;
//   }
// };
//
// redis = initRedis();
//
// // Initialize Express app and create HTTP server
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'https://praninara.github.io',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
//   }
// });
//
// const port = process.env.PORT || 5003;
//
// /**
//  * In-memory Storage (Redis Alternative)
//  * Used as fallback when Redis is unavailable
//  */
// const gameState = new Map();
// const matchmakingQueue = {
//   french: [],
//   spanish: []
// };
// const gameLeaderboard = new Map();
// const globalLeaderboard = new Map();
// const questionCache = new Map();
// const usedQuestions = new Map();
//
// /**
//  * Cache word pairs in Redis or fallback storage
//  * @param {string} language - Target language for word pairs
//  * @param {Array} wordPairs - Array of word pairs to cache
//  */
// async function cacheWordPairs(language, wordPairs) {
//   const key = `wordpairs:${language}`;
//   if (redis) {
//     try {
//       await redis.sadd(key, ...wordPairs.map(pair => JSON.stringify(pair)));
//       console.log(`Successfully cached ${wordPairs.length} word pairs for ${language}`);
//     } catch (error) {
//       console.error('Error caching word pairs:', error);
//       if (!questionCache.has(key)) {
//         questionCache.set(key, new Set());
//       }
//       wordPairs.forEach(pair => {
//         questionCache.get(key).add(JSON.stringify(pair));
//       });
//     }
//   } else {
//     if (!questionCache.has(key)) {
//       questionCache.set(key, new Set());
//     }
//     wordPairs.forEach(pair => {
//       questionCache.get(key).add(JSON.stringify(pair));
//     });
//   }
// }
//
// /**
//  * Get a random word pair for a game room
//  * - Tracks used questions per room
//  * - Handles Redis failures gracefully
//  * - Implements automatic question rotation
//  *
//  * @param {string} roomId - Game room identifier
//  * @param {string} language - Target language
//  * @returns {Object} Word pair object
//  */
// async function getRandomWordPair(roomId, language) {
//   const key = `wordpairs:${language}`;
//   let pair = null;
//   let attempts = 0;
//   const maxAttempts = 10;
//
//   if (!usedQuestions.has(roomId)) {
//     usedQuestions.set(roomId, new Set());
//   }
//
//   while (!pair && attempts < maxAttempts) {
//     if (redis) {
//       try {
//         const randomPair = await redis.srandmember(key);
//         if (randomPair && !usedQuestions.get(roomId).has(randomPair)) {
//           pair = JSON.parse(randomPair);
//           usedQuestions.get(roomId).add(randomPair);
//         }
//       } catch (error) {
//         console.error('Error getting random word pair from Redis:', error);
//         redis = null;
//         break;
//       }
//     } else {
//       const cache = questionCache.get(key);
//       if (cache && cache.size > 0) {
//         const unusedPairs = Array.from(cache).filter(p => !usedQuestions.get(roomId).has(p));
//         if (unusedPairs.length > 0) {
//           const randomIndex = Math.floor(Math.random() * unusedPairs.length);
//           pair = JSON.parse(unusedPairs[randomIndex]);
//           usedQuestions.get(roomId).add(unusedPairs[randomIndex]);
//         }
//       }
//     }
//     attempts++;
//   }
//
//   if (!pair) {
//     usedQuestions.get(roomId).clear();
//     await prefetchWordPairs(language);
//     return getRandomWordPair(roomId, language);
//   }
//
//   return pair;
// }
//
// /**
//  * Prefetch word pairs for a language
//  * - Ensures content availability
//  * - Handles API failures with fallback content
//  *
//  * @param {string} language - Target language
//  */
// async function prefetchWordPairs(language) {
//   try {
//     const pairs = await generateWordPairs(language, 20);
//     await cacheWordPairs(language, pairs);
//   } catch (error) {
//     console.error('Error prefetching word pairs:', error);
//     const fallbackPairs = getFallbackWordPairs(language);
//     await cacheWordPairs(language, fallbackPairs);
//   }
// }
//
// // Middleware Configuration
// app.use(cors({
//   origin: 'https://praninara.github.io',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
//
// // Prometheus metrics endpoint
// app.get('/metrics', async (req, res) => {
//   try {
//     res.set('Content-Type', promClient.register.contentType);
//     res.end(await promClient.register.metrics());
//   } catch (err) {
//     res.status(500).end(err);
//   }
// });
//
// // API Routes
// app.use('/api/users', userRoutes);
// app.use('/api/games', gameRoutes);
//
// // Add a redirect for the base API URL
// app.get('/api', (req, res) => {
//   res.send('LinguaLeap API v1');
// });
//
// // Single-player game endpoints
// app.get('/api/memory-game/pairs/:level', async (req, res) => {
//   try {
//     const level = parseInt(req.params.level);
//     const pairs = await generateMemoryPairs(level);
//     res.json(pairs);
//   } catch (error) {
//     res.status(500).json({ message: 'Error generating memory pairs' });
//   }
// });
//
// app.get('/api/dino-game/questions/:level', async (req, res) => {
//   try {
//     const level = parseInt(req.params.level);
//     const questions = await generateDinoQuestions(level);
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error generating questions' });
//   }
// });
//
// // Leaderboard endpoints
// app.get('/api/leaderboard/global', async (req, res) => {
//   try {
//     const users = await mongoose.model('User').find().sort('-totalXP').limit(10).select('name totalXP -_id');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching leaderboard' });
//   }
// });
//
// app.get('/api/leaderboard/game/:gameId', (req, res) => {
//   const gameLeaderboardData = Array.from(gameLeaderboard.entries())
//       .map(([name, data]) => ({ name, ...data }))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, 10);
//   res.json(gameLeaderboardData);
// });
//
// // Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);
//
// /**
//  * Update global leaderboard and persist to database
//  * @param {string} username - Player username
//  * @param {number} xp - Experience points to add
//  */
// async function updateGlobalLeaderboard(username, xp) {
//   try {
//     const user = await mongoose.model('User').findOne({ name: username });
//     if (user) {
//       user.totalXP += xp;
//       await user.save();
//
//       const globalData = globalLeaderboard.get(username) || { totalXP: 0 };
//       globalData.totalXP += xp;
//       globalLeaderboard.set(username, globalData);
//
//       io.emit('globalLeaderboardUpdate', Array.from(globalLeaderboard.entries())
//           .map(([name, data]) => ({ name, ...data }))
//           .sort((a, b) => b.totalXP - a.totalXP)
//           .slice(0, 10)
//       );
//     }
//   } catch (error) {
//     console.error('Error updating global leaderboard:', error);
//   }
// }
//
// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);
//   activePlayersGauge.inc();
//
//   socket.on('findMatch', async ({ username, language }) => {
//     const cacheKey = `wordpairs:${language}`;
//     const cacheSize = redis ?
//         await redis.scard(cacheKey) :
//         (questionCache.get(cacheKey)?.size || 0);
//
//     if (cacheSize < 10) {
//       await prefetchWordPairs(language);
//     }
//
//     matchmakingQueue[language].push({ id: socket.id, username });
//
//     if (matchmakingQueue[language].length >= 2) {
//       const roomId = `${language}_${Date.now()}`;
//       const players = matchmakingQueue[language].splice(0, 2);
//
//       const room = {
//         id: roomId,
//         language,
//         players,
//         scores: {},
//         currentWord: '',
//         translation: '',
//         roundStartTime: null,
//         gameStarted: false,
//         revealedChars: '',
//         questionsUsed: 0
//       };
//
//       gameState.set(roomId, room);
//       players.forEach(player => {
//         room.scores[player.id] = 0;
//         const playerSocket = io.sockets.sockets.get(player.id);
//         if (playerSocket) {
//           playerSocket.join(roomId);
//         }
//       });
//
//       io.to(roomId).emit('roomInfo', {
//         roomId,
//         players: room.players,
//         scores: room.scores
//       });
//
//       setTimeout(() => {
//         io.to(roomId).emit('matchFound', { roomId });
//         startNewRound(roomId);
//       }, 2000);
//
//       activeGamesGauge.inc();
//     }
//   });
//
//   socket.on('joinRoom', ({ roomId, username, language }) => {
//     let room = gameState.get(roomId);
//
//     if (!room) {
//       room = {
//         id: roomId,
//         language,
//         players: [],
//         scores: {},
//         currentWord: '',
//         translation: '',
//         roundStartTime: null,
//         gameStarted: false,
//         revealedChars: '',
//         questionsUsed: 0
//       };
//       gameState.set(roomId, room);
//       activeGamesGauge.inc();
//     }
//
//     if (room.players.length >= 4) {
//       socket.emit('roomFull');
//       return;
//     }
//
//     const player = { id: socket.id, username };
//     room.players.push(player);
//     room.scores[socket.id] = 0;
//     socket.join(roomId);
//
//     io.to(roomId).emit('roomInfo', {
//       roomId,
//       players: room.players,
//       scores: room.scores
//     });
//
//     io.to(roomId).emit('playerJoined', {
//       players: room.players,
//       scores: room.scores
//     });
//
//     if (room.players.length >= 2 && !room.gameStarted) {
//       room.gameStarted = true;
//       setTimeout(() => startNewRound(roomId), 2000);
//     }
//   });
//
//   socket.on('leaveRoom', ({ roomId }) => {
//     const room = gameState.get(roomId);
//     if (room) {
//       const playerIndex = room.players.findIndex(p => p.id === socket.id);
//       if (playerIndex !== -1) {
//         room.players.splice(playerIndex, 1);
//         delete room.scores[socket.id];
//         socket.leave(roomId);
//
//         if (room.players.length === 0) {
//           usedQuestions.delete(roomId);
//           gameState.delete(roomId);
//           activeGamesGauge.dec();
//           io.to(roomId).emit('roomDeleted');
//         } else {
//           io.to(roomId).emit('playerLeft', {
//             players: room.players,
//             scores: room.scores
//           });
//         }
//       }
//     }
//   });
//
//   /**
//    * Start a new game round
//    * - Fetches new word pair
//    * - Updates game state
//    * - Notifies players
//    *
//    * @param {string} roomId - Game room identifier
//    */
//   async function startNewRound(roomId) {
//     const room = gameState.get(roomId);
//     if (!room) return;
//
//     const wordPair = await getRandomWordPair(roomId, room.language);
//     if (!wordPair) {
//       const fallbackPairs = getFallbackWordPairs(room.language);
//       const randomIndex = Math.floor(Math.random() * fallbackPairs.length);
//       room.currentWord = fallbackPairs[randomIndex].word;
//       room.translation = fallbackPairs[randomIndex].translation;
//       room.alternativeTranslations = fallbackPairs[randomIndex].alternativeTranslations;
//     } else {
//       room.currentWord = wordPair.word;
//       room.translation = wordPair.translation;
//       room.alternativeTranslations = wordPair.alternativeTranslations;
//     }
//
//     room.roundStartTime = Date.now();
//     room.revealedChars = '_'.repeat(room.currentWord.length);
//     room.questionsUsed++;
//
//     io.to(roomId).emit('newRound', {
//       word: room.currentWord,
//       translation: room.translation,
//       hint: room.revealedChars
//     });
//
//     const cacheKey = `wordpairs:${room.language}`;
//     const cacheSize = redis ?
//         await redis.scard(cacheKey) :
//         (questionCache.get(cacheKey)?.size || 0);
//
//     if (cacheSize < 5 || room.questionsUsed >= 10) {
//       prefetchWordPairs(room.language);
//       room.questionsUsed = 0;
//     }
//   }
//
//   socket.on('makeGuess', ({ roomId, guess }) => {
//     const room = gameState.get(roomId);
//     if (!room) return;
//
//     const currentWordLower = room.currentWord.toLowerCase();
//     const guessLower = guess.toLowerCase();
//     const player = room.players.find(p => p.id === socket.id);
//
//     const isCorrect = guessLower === currentWordLower ||
//         room.alternativeTranslations?.includes(guessLower);
//
//     if (isCorrect) {
//       wordGuessCounter.inc({ correct: 'true' });
//       const timeTaken = (Date.now() - room.roundStartTime) / 1000;
//       const timeBonus = Math.max(0, Math.floor((30 - timeTaken) * 10));
//       const points = 100 + timeBonus;
//
//       room.scores[socket.id] += points;
//       room.revealedChars = room.currentWord;
//
//       const playerGameData = gameLeaderboard.get(player.username) || { score: 0 };
//       playerGameData.score += points;
//       gameLeaderboard.set(player.username, playerGameData);
//
//       updateGlobalLeaderboard(player.username, points);
//
//       io.to(roomId).emit('correctGuess', {
//         player,
//         scores: room.scores,
//         revealedChars: room.currentWord
//       });
//
//       io.to(roomId).emit('gameLeaderboardUpdate', Array.from(gameLeaderboard.entries())
//           .map(([name, data]) => ({ name, ...data }))
//           .sort((a, b) => b.score - a.score)
//           .slice(0, 10)
//       );
//
//       setTimeout(() => startNewRound(roomId), 2000);
//     } else {
//       wordGuessCounter.inc({ correct: 'false' });
//       let newRevealedChars = '';
//       let correctChars = 0;
//
//       for (let i = 0; i < currentWordLower.length; i++) {
//         if (i < guessLower.length && guessLower[i] === currentWordLower[i]) {
//           newRevealedChars += room.currentWord[i];
//           correctChars++;
//         } else {
//           newRevealedChars += room.revealedChars[i] !== '_'
//               ? room.revealedChars[i]
//               : '_';
//         }
//       }
//
//       if (correctChars > 0) {
//         const partialPoints = correctChars * 10;
//         room.scores[socket.id] += partialPoints;
//         room.revealedChars = newRevealedChars;
//
//         io.to(roomId).emit('correctGuess', {
//           player,
//           scores: room.scores,
//           revealedChars: newRevealedChars
//         });
//       } else {
//         room.scores[socket.id] = Math.max(0, room.scores[socket.id] - 20);
//         io.to(roomId).emit('wrongGuess', {
//           player,
//           scores: room.scores
//         });
//       }
//     }
//   });
//
//   socket.on('disconnect', () => {
//     activePlayersGauge.dec();
//     gameState.forEach((room, roomId) => {
//       const playerIndex = room.players.findIndex(p => p.id === socket.id);
//       if (playerIndex !== -1) {
//         room.players.splice(playerIndex, 1);
//         delete room.scores[socket.id];
//
//         if (room.players.length === 0) {
//           usedQuestions.delete(roomId);
//           gameState.delete(roomId);
//           activeGamesGauge.dec();
//         } else {
//           io.to(roomId).emit('playerLeft', {
//             players: room.players,
//             scores: room.scores
//           });
//         }
//       }
//     });
//
//     Object.keys(matchmakingQueue).forEach(language => {
//       const index = matchmakingQueue[language].findIndex(p => p.id === socket.id);
//       if (index !== -1) {
//         matchmakingQueue[language].splice(index, 1);
//       }
//     });
//   });
// });
//
// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb+srv://narayanaudayagiri88:narayanaudayagiri88@cluster0.xfb8w.mongodb.net/synergy`);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };
//
// // Start Server
// connectDB().then(() => {
//   httpServer.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });
//
// app.get('/', (req, res) => {
//   res.send('Welcome to LinguaLeap API');
// });

// // Import required dependencies
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import Redis from 'ioredis';
// import userRoutes from './routes/userRoutes.js';
// import gameRoutes from './routes/gameRoutes.js';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import { generateWordPairs, getFallbackWordPairs, generateMemoryPairs, generateDinoQuestions } from './services/wordService.js';
// import promClient from 'prom-client';
//
// // Initialize Prometheus metrics collection
// const collectDefaultMetrics = promClient.collectDefaultMetrics;
// collectDefaultMetrics({ timeout: 5000 });
//
// // Custom Prometheus metrics
// const activeGamesGauge = new promClient.Gauge({
//   name: 'active_games_total',
//   help: 'Number of active game rooms'
// });
//
// const activePlayersGauge = new promClient.Gauge({
//   name: 'active_players_total',
//   help: 'Number of connected players'
// });
//
// const wordGuessCounter = new promClient.Counter({
//   name: 'word_guesses_total',
//   help: 'Total number of word guesses',
//   labelNames: ['correct']
// });
//
// /**
//  * Redis Configuration with Retry Mechanism
//  * - Handles connection failures gracefully
//  * - Implements retry strategy with backoff
//  * - Falls back to in-memory storage if Redis is unavailable
//  */
// let redis;
// const initRedis = () => {
//   try {
//     redis = new Redis({
//       host: process.env.REDIS_HOST || 'red-d0i8kt24d50c73b7ag20',
//       port: parseInt(process.env.REDIS_PORT || '6379'),
//       // password: 'RedisPassword123',
//       maxRetriesPerRequest: 3,
//       retryStrategy: (times) => {
//         if (times > 3) {
//           console.log('Redis retry limit exceeded, falling back to in-memory storage');
//           return null;
//         }
//         const delay = Math.min(times * 1000, 3000);
//         console.log(`Retrying Redis connection in ${delay}ms...`);
//         return delay;
//       },
//       reconnectOnError: (err) => {
//         console.log('Redis connection error:', err.message);
//         return true;
//       }
//     });
//
//     redis.on('connect', () => {
//       console.log('Successfully connected to Redis');
//     });
//
//     redis.on('error', (err) => {
//       console.log('Redis connection error, falling back to in-memory storage:', err.message);
//       redis = null;
//     });
//
//     return redis;
//   } catch (error) {
//     console.log('Failed to initialize Redis, falling back to in-memory storage:', error.message);
//     return null;
//   }
// };
//
// redis = initRedis();
//
// // Initialize Express app and create HTTP server
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'https://praninara.github.io',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
//   }
// });
//
// const port = process.env.PORT || 5004;
//
// /**
//  * In-memory Storage (Redis Alternative)
//  * Used as fallback when Redis is unavailable
//  */
// const gameState = new Map();
// const matchmakingQueue = {
//   french: [],
//   spanish: []
// };
// const gameLeaderboard = new Map();
// const globalLeaderboard = new Map();
// const questionCache = new Map();
// const usedQuestions = new Map();
//
// /**
//  * Cache word pairs in Redis or fallback storage
//  * @param {string} language - Target language for word pairs
//  * @param {Array} wordPairs - Array of word pairs to cache
//  */
// async function cacheWordPairs(language, wordPairs) {
//   const key = `wordpairs:${language}`;
//   if (redis) {
//     try {
//       await redis.sadd(key, ...wordPairs.map(pair => JSON.stringify(pair)));
//       console.log(`Successfully cached ${wordPairs.length} word pairs for ${language}`);
//     } catch (error) {
//       console.error('Error caching word pairs:', error);
//       if (!questionCache.has(key)) {
//         questionCache.set(key, new Set());
//       }
//       wordPairs.forEach(pair => {
//         questionCache.get(key).add(JSON.stringify(pair));
//       });
//     }
//   } else {
//     if (!questionCache.has(key)) {
//       questionCache.set(key, new Set());
//     }
//     wordPairs.forEach(pair => {
//       questionCache.get(key).add(JSON.stringify(pair));
//     });
//   }
// }
//
// /**
//  * Get a random word pair for a game room
//  * - Tracks used questions per room
//  * - Handles Redis failures gracefully
//  * - Implements automatic question rotation
//  *
//  * @param {string} roomId - Game room identifier
//  * @param {string} language - Target language
//  * @returns {Object} Word pair object
//  */
// async function getRandomWordPair(roomId, language) {
//   const key = `wordpairs:${language}`;
//   let pair = null;
//   let attempts = 0;
//   const maxAttempts = 10;
//
//   if (!usedQuestions.has(roomId)) {
//     usedQuestions.set(roomId, new Set());
//   }
//
//   while (!pair && attempts < maxAttempts) {
//     if (redis) {
//       try {
//         const randomPair = await redis.srandmember(key);
//         if (randomPair && !usedQuestions.get(roomId).has(randomPair)) {
//           pair = JSON.parse(randomPair);
//           usedQuestions.get(roomId).add(randomPair);
//         }
//       } catch (error) {
//         console.error('Error getting random word pair from Redis:', error);
//         redis = null;
//         break;
//       }
//     } else {
//       const cache = questionCache.get(key);
//       if (cache && cache.size > 0) {
//         const unusedPairs = Array.from(cache).filter(p => !usedQuestions.get(roomId).has(p));
//         if (unusedPairs.length > 0) {
//           const randomIndex = Math.floor(Math.random() * unusedPairs.length);
//           pair = JSON.parse(unusedPairs[randomIndex]);
//           usedQuestions.get(roomId).add(unusedPairs[randomIndex]);
//         }
//       }
//     }
//     attempts++;
//   }
//
//   if (!pair) {
//     usedQuestions.get(roomId).clear();
//     await prefetchWordPairs(language);
//     return getRandomWordPair(roomId, language);
//   }
//
//   return pair;
// }
//
// /**
//  * Prefetch word pairs for a language
//  * - Ensures content availability
//  * - Handles API failures with fallback content
//  *
//  * @param {string} language - Target language
//  */
// async function prefetchWordPairs(language) {
//   try {
//     const pairs = await generateWordPairs(language, 20);
//     await cacheWordPairs(language, pairs);
//   } catch (error) {
//     console.error('Error prefetching word pairs:', error);
//     const fallbackPairs = getFallbackWordPairs(language);
//     await cacheWordPairs(language, fallbackPairs);
//   }
// }
//
// // Middleware Configuration
// app.use(cors({
//   origin: 'https://praninara.github.io',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
//
// // Prometheus metrics endpoint
// app.get('/metrics', async (req, res) => {
//   try {
//     res.set('Content-Type', promClient.register.contentType);
//     res.end(await promClient.register.metrics());
//   } catch (err) {
//     res.status(500).end(err);
//   }
// });
//
// // Base route
// app.get('/', (req, res) => {
//   res.send('Welcome to LinguaLeap API');
// });
//
// // API Routes
// app.use('/api/users', userRoutes);
// app.use('/api/games', gameRoutes);
//
// // Add a redirect for the base API URL
// app.get('/api', (req, res) => {
//   res.send('LinguaLeap API v1');
// });
//
// // Single-player game endpoints
// app.get('/api/memory-game/pairs/:level', async (req, res) => {
//   try {
//     const level = parseInt(req.params.level);
//     const pairs = await generateMemoryPairs(level);
//     res.json(pairs);
//   } catch (error) {
//     res.status(500).json({ message: 'Error generating memory pairs' });
//   }
// });
//
// app.get('/api/dino-game/questions/:level', async (req, res) => {
//   try {
//     const level = parseInt(req.params.level);
//     const questions = await generateDinoQuestions(level);
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error generating questions' });
//   }
// });
//
// // Leaderboard endpoints
// app.get('/api/leaderboard/global', async (req, res) => {
//   try {
//     const users = await mongoose.model('User').find().sort('-totalXP').limit(10).select('name totalXP -_id');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching leaderboard' });
//   }
// });
//
// app.get('/api/leaderboard/game/:gameId', (req, res) => {
//   const gameLeaderboardData = Array.from(gameLeaderboard.entries())
//       .map(([name, data]) => ({ name, ...data }))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, 10);
//   res.json(gameLeaderboardData);
// });
//
// // Error Handling Middleware
// app.use(notFound);
// app.use(errorHandler);
//
// /**
//  * Update global leaderboard and persist to database
//  * @param {string} username - Player username
//  * @param {number} xp - Experience points to add
//  */
// async function updateGlobalLeaderboard(username, xp) {
//   try {
//     const user = await mongoose.model('User').findOne({ name: username });
//     if (user) {
//       user.totalXP += xp;
//       await user.save();
//
//       const globalData = globalLeaderboard.get(username) || { totalXP: 0 };
//       globalData.totalXP += xp;
//       globalLeaderboard.set(username, globalData);
//
//       io.emit('globalLeaderboardUpdate', Array.from(globalLeaderboard.entries())
//           .map(([name, data]) => ({ name, ...data }))
//           .sort((a, b) => b.totalXP - a.totalXP)
//           .slice(0, 10)
//       );
//     }
//   } catch (error) {
//     console.error('Error updating global leaderboard:', error);
//   }
// }
//
// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);
//   activePlayersGauge.inc();
//
//   socket.on('findMatch', async ({ username, language }) => {
//     const cacheKey = `wordpairs:${language}`;
//     const cacheSize = redis ?
//         await redis.scard(cacheKey) :
//         (questionCache.get(cacheKey)?.size || 0);
//
//     if (cacheSize < 10) {
//       await prefetchWordPairs(language);
//     }
//
//     matchmakingQueue[language].push({ id: socket.id, username });
//
//     if (matchmakingQueue[language].length >= 2) {
//       const roomId = `${language}_${Date.now()}`;
//       const players = matchmakingQueue[language].splice(0, 2);
//
//       const room = {
//         id: roomId,
//         language,
//         players,
//         scores: {},
//         currentWord: '',
//         translation: '',
//         roundStartTime: null,
//         gameStarted: false,
//         revealedChars: '',
//         questionsUsed: 0
//       };
//
//       gameState.set(roomId, room);
//       players.forEach(player => {
//         room.scores[player.id] = 0;
//         const playerSocket = io.sockets.sockets.get(player.id);
//         if (playerSocket) {
//           playerSocket.join(roomId);
//         }
//       });
//
//       io.to(roomId).emit('roomInfo', {
//         roomId,
//         players: room.players,
//         scores: room.scores
//       });
//
//       setTimeout(() => {
//         io.to(roomId).emit('matchFound', { roomId });
//         startNewRound(roomId);
//       }, 2000);
//
//       activeGamesGauge.inc();
//     }
//   });
//
//   socket.on('joinRoom', ({ roomId, username, language }) => {
//     let room = gameState.get(roomId);
//
//     if (!room) {
//       room = {
//         id: roomId,
//         language,
//         players: [],
//         scores: {},
//         currentWord: '',
//         translation: '',
//         roundStartTime: null,
//         gameStarted: false,
//         revealedChars: '',
//         questionsUsed: 0
//       };
//       gameState.set(roomId, room);
//       activeGamesGauge.inc();
//     }
//
//     if (room.players.length >= 4) {
//       socket.emit('roomFull');
//       return;
//     }
//
//     const player = { id: socket.id, username };
//     room.players.push(player);
//     room.scores[socket.id] = 0;
//     socket.join(roomId);
//
//     io.to(roomId).emit('roomInfo', {
//       roomId,
//       players: room.players,
//       scores: room.scores
//     });
//
//     io.to(roomId).emit('playerJoined', {
//       players: room.players,
//       scores: room.scores
//     });
//
//     if (room.players.length >= 2 && !room.gameStarted) {
//       room.gameStarted = true;
//       setTimeout(() => startNewRound(roomId), 2000);
//     }
//   });
//
//   socket.on('leaveRoom', ({ roomId }) => {
//     const room = gameState.get(roomId);
//     if (room) {
//       const playerIndex = room.players.findIndex(p => p.id === socket.id);
//       if (playerIndex !== -1) {
//         room.players.splice(playerIndex, 1);
//         delete room.scores[socket.id];
//         socket.leave(roomId);
//
//         if (room.players.length === 0) {
//           usedQuestions.delete(roomId);
//           gameState.delete(roomId);
//           activeGamesGauge.dec();
//           io.to(roomId).emit('roomDeleted');
//         } else {
//           io.to(roomId).emit('playerLeft', {
//             players: room.players,
//             scores: room.scores
//           });
//         }
//       }
//     }
//   });
//
//   /**
//    * Start a new game round
//    * - Fetches new word pair
//    * - Updates game state
//    * - Notifies players
//    *
//    * @param {string} roomId - Game room identifier
//    */
//   async function startNewRound(roomId) {
//     const room = gameState.get(roomId);
//     if (!room) return;
//
//     const wordPair = await getRandomWordPair(roomId, room.language);
//     if (!wordPair) {
//       const fallbackPairs = getFallbackWordPairs(room.language);
//       const randomIndex = Math.floor(Math.random() * fallbackPairs.length);
//       room.currentWord = fallbackPairs[randomIndex].word;
//       room.translation = fallbackPairs[randomIndex].translation;
//       room.alternativeTranslations = fallbackPairs[randomIndex].alternativeTranslations;
//     } else {
//       room.currentWord = wordPair.word;
//       room.translation = wordPair.translation;
//       room.alternativeTranslations = wordPair.alternativeTranslations;
//     }
//
//     room.roundStartTime = Date.now();
//     room.revealedChars = '_'.repeat(room.currentWord.length);
//     room.questionsUsed++;
//
//     io.to(roomId).emit('newRound', {
//       word: room.currentWord,
//       translation: room.translation,
//       hint: room.revealedChars
//     });
//
//     const cacheKey = `wordpairs:${room.language}`;
//     const cacheSize = redis ?
//         await redis.scard(cacheKey) :
//         (questionCache.get(cacheKey)?.size || 0);
//
//     if (cacheSize < 5 || room.questionsUsed >= 10) {
//       prefetchWordPairs(room.language);
//       room.questionsUsed = 0;
//     }
//   }
//
//   socket.on('makeGuess', ({ roomId, guess }) => {
//     const room = gameState.get(roomId);
//     if (!room) return;
//
//     const currentWordLower = room.currentWord.toLowerCase();
//     const guessLower = guess.toLowerCase();
//     const player = room.players.find(p => p.id === socket.id);
//
//     const isCorrect = guessLower === currentWordLower ||
//         room.alternativeTranslations?.includes(guessLower);
//
//     if (isCorrect) {
//       wordGuessCounter.inc({ correct: 'true' });
//       const timeTaken = (Date.now() - room.roundStartTime) / 1000;
//       const timeBonus = Math.max(0, Math.floor((30 - timeTaken) * 10));
//       const points = 100 + timeBonus;
//
//       room.scores[socket.id] += points;
//       room.revealedChars = room.currentWord;
//
//       const playerGameData = gameLeaderboard.get(player.username) || { score: 0 };
//       playerGameData.score += points;
//       gameLeaderboard.set(player.username, playerGameData);
//
//       updateGlobalLeaderboard(player.username, points);
//
//       io.to(roomId).emit('correctGuess', {
//         player,
//         scores: room.scores,
//         revealedChars: room.currentWord
//       });
//
//       io.to(roomId).emit('gameLeaderboardUpdate', Array.from(gameLeaderboard.entries())
//           .map(([name, data]) => ({ name, ...data }))
//           .sort((a, b) => b.score - a.score)
//           .slice(0, 10)
//       );
//
//       setTimeout(() => startNewRound(roomId), 2000);
//     } else {
//       wordGuessCounter.inc({ correct: 'false' });
//       let newRevealedChars = '';
//       let correctChars = 0;
//
//       for (let i = 0; i < currentWordLower.length; i++) {
//         if (i < guessLower.length && guessLower[i] === currentWordLower[i]) {
//           newRevealedChars += room.currentWord[i];
//           correctChars++;
//         } else {
//           newRevealedChars += room.revealedChars[i] !== '_'
//               ? room.revealedChars[i]
//               : '_';
//         }
//       }
//
//       if (correctChars > 0) {
//         const partialPoints = correctChars * 10;
//         room.scores[socket.id] += partialPoints;
//         room.revealedChars = newRevealedChars;
//
//         io.to(roomId).emit('correctGuess', {
//           player,
//           scores: room.scores,
//           revealedChars: newRevealedChars
//         });
//       } else {
//         room.scores[socket.id] = Math.max(0, room.scores[socket.id] - 20);
//         io.to(roomId).emit('wrongGuess', {
//           player,
//           scores: room.scores
//         });
//       }
//     }
//   });
//
//   socket.on('disconnect', () => {
//     activePlayersGauge.dec();
//     gameState.forEach((room, roomId) => {
//       const playerIndex = room.players.findIndex(p => p.id === socket.id);
//       if (playerIndex !== -1) {
//         room.players.splice(playerIndex, 1);
//         delete room.scores[socket.id];
//
//         if (room.players.length === 0) {
//           usedQuestions.delete(roomId);
//           gameState.delete(roomId);
//           activeGamesGauge.dec();
//         } else {
//           io.to(roomId).emit('playerLeft', {
//             players: room.players,
//             scores: room.scores
//           });
//         }
//       }
//     });
//
//     Object.keys(matchmakingQueue).forEach(language => {
//       const index = matchmakingQueue[language].findIndex(p => p.id === socket.id);
//       if (index !== -1) {
//         matchmakingQueue[language].splice(index, 1);
//       }
//     });
//   });
// });
//
// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb+srv://narayanaudayagiri88:narayanaudayagiri88@cluster0.xfb8w.mongodb.net/synergy`);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };
//
// // Start Server
// connectDB().then(() => {
//   httpServer.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });



// Import required dependencies
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Redis from 'ioredis';
import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import {
  generateWordPairs,
  getFallbackWordPairs,
  generateMemoryPairs,
  generateDinoQuestions
} from './services/wordService.js';
import promClient from 'prom-client';

// Initialize Prometheus metrics collection
console.log('Initializing Prometheus metrics collection');
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Custom Prometheus metrics
console.log('Setting up custom Prometheus metrics');
const activeGamesGauge = new promClient.Gauge({
  name: 'active_games_total',
  help: 'Number of active game rooms'
});
const activePlayersGauge = new promClient.Gauge({
  name: 'active_players_total',
  help: 'Number of connected players'
});
const wordGuessCounter = new promClient.Counter({
  name: 'word_guesses_total',
  help: 'Total number of word guesses',
  labelNames: ['correct']
});

// Redis Configuration with Retry Mechanism
console.log('Initializing Redis configuration');
let redis;
const initRedis = () => {
  console.log('Entering initRedis');
  try {
    redis = new Redis({
      host: process.env.REDIS_HOST || 'red-d0i8kt24d50c73b7ag20',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        console.log(`Redis retry attempt #${times}`);
        if (times > 3) {
          console.log('Redis retry limit exceeded, falling back to in-memory storage');
          return null;
        }
        const delay = Math.min(times * 1000, 3000);
        console.log(`Retrying Redis connection in ${delay}ms...`);
        return delay;
      },
      reconnectOnError: (err) => {
        console.error('Redis connection error:', err.message);
        return true;
      }
    });

    redis.on('connect', () => {
      console.log('Successfully connected to Redis');
    });
    redis.on('error', (err) => {
      console.error('Redis connection error, falling back to in-memory storage:', err.message);
      redis = null;
    });

    console.log('Redis initialization completed');
    return redis;
  } catch (error) {
    console.error('Failed to initialize Redis, falling back to in-memory storage:', error.message);
    return null;
  }
};
redis = initRedis();

// Initialize Express app and create HTTP server
console.log('Setting up Express app and HTTP server');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'https://praninara.github.io',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});
const port = process.env.PORT || 5004;
console.log(`Server will listen on port ${port}`);

// In-memory Storage (Redis Alternative)
console.log('Setting up in-memory fallback storage');
const gameState = new Map();
const matchmakingQueue = { french: [], spanish: [] };
const gameLeaderboard = new Map();
const globalLeaderboard = new Map();
const questionCache = new Map();
const usedQuestions = new Map();

// Cache word pairs in Redis or fallback storage
async function cacheWordPairs(language, wordPairs) {
  console.log(`cacheWordPairs called for language: ${language}, count: ${wordPairs.length}`);
  const key = `wordpairs:${language}`;
  if (redis) {
    try {
      await redis.sadd(key, ...wordPairs.map(pair => JSON.stringify(pair)));
      console.log(`Successfully cached ${wordPairs.length} word pairs for ${language}`);
    } catch (error) {
      console.error('Error caching word pairs:', error);
      if (!questionCache.has(key)) questionCache.set(key, new Set());
      wordPairs.forEach(pair => questionCache.get(key).add(JSON.stringify(pair)));
    }
  } else {
    console.log('Using in-memory cache for caching word pairs');
    if (!questionCache.has(key)) questionCache.set(key, new Set());
    wordPairs.forEach(pair => questionCache.get(key).add(JSON.stringify(pair)));
  }
}

// Get a random word pair for a game room
async function getRandomWordPair(roomId, language) {
  console.log(`getRandomWordPair called for roomId: ${roomId}, language: ${language}`);
  const key = `wordpairs:${language}`;
  let pair = null;
  let attempts = 0;
  const maxAttempts = 10;

  if (!usedQuestions.has(roomId)) usedQuestions.set(roomId, new Set());

  while (!pair && attempts < maxAttempts) {
    console.log(`Attempt ${attempts + 1} to fetch random pair`);
    if (redis) {
      try {
        const randomPair = await redis.srandmember(key);
        if (randomPair && !usedQuestions.get(roomId).has(randomPair)) {
          pair = JSON.parse(randomPair);
          usedQuestions.get(roomId).add(randomPair);
          console.log('Pair fetched from Redis');
        }
      } catch (error) {
        console.error('Error getting random word pair from Redis:', error);
        redis = null;
        break;
      }
    } else {
      console.log('Fetching from in-memory cache');
      const cache = questionCache.get(key);
      if (cache && cache.size > 0) {
        const unusedPairs = Array.from(cache).filter(p => !usedQuestions.get(roomId).has(p));
        if (unusedPairs.length > 0) {
          const randomIndex = Math.floor(Math.random() * unusedPairs.length);
          pair = JSON.parse(unusedPairs[randomIndex]);
          usedQuestions.get(roomId).add(unusedPairs[randomIndex]);
          console.log('Pair fetched from in-memory cache');
        }
      }
    }
    attempts++;
  }

  if (!pair) {
    console.warn('No pair found after max attempts, clearing used questions and prefetching');
    usedQuestions.get(roomId).clear();
    await prefetchWordPairs(language);
    return getRandomWordPair(roomId, language);
  }

  console.log('Returning word pair:', pair);
  return pair;
}

// Prefetch word pairs for a language
async function prefetchWordPairs(language) {
  console.log(`Prefetching word pairs for language: ${language}`);
  try {
    const pairs = await generateWordPairs(language, 20);
    await cacheWordPairs(language, pairs);
    console.log('Prefetch successful');
  } catch (error) {
    console.error('Error prefetching word pairs:', error);
    const fallbackPairs = getFallbackWordPairs(language);
    await cacheWordPairs(language, fallbackPairs);
    console.log('Cached fallback pairs');
  }
}

// Middleware Configuration
console.log('Configuring middleware');
app.use(cors({
  origin: 'https://praninara.github.io',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  console.log('GET /metrics');
  try {
    res.set('Content-Type', promClient.register.contentType);
    const metrics = await promClient.register.metrics();
    res.end(metrics);
  } catch (err) {
    console.error('Error in /metrics:', err);
    res.status(500).end(err);
  }
});

// Base route
app.get('/', (req, res) => {
  console.log('GET /');
  res.send('Welcome to LinguaLeap API');
});

// API Routes
console.log('Registering API routes');
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.get('/api', (req, res) => {
  console.log('GET /api');
  res.send('LinguaLeap API v1');
});

// Single-player game endpoints
app.get('/api/memory-game/pairs/:level', async (req, res) => {
  const { level } = req.params;
  console.log(`GET /api/memory-game/pairs/${level}`);
  try {
    const pairs = generateMemoryPairs(parseInt(level));
    res.json(pairs);
  } catch (err) {
    console.error('Error generating memory game pairs:', err);
    res.status(500).json({ message: 'Error generating memory game pairs' });
  }
});

app.get('/api/dino-game/questions/:level', async (req, res) => {
  const { level } = req.params;
  console.log(`GET /api/dino-game/questions/${level}`);
  try {
    const questions = generateDinoQuestions(parseInt(level));
    res.json(questions);
  } catch (err) {
    console.error('Error generating dino quiz questions:', err);
    res.status(500).json({ message: 'Error generating dino quiz questions' });
  }
});

// Leaderboard endpoints
app.get('/api/leaderboard/global', async (req, res) => {
  console.log('GET /api/leaderboard/global');
  try {
    const users = await mongoose.model('User')
        .find()
        .sort('-totalXP')
        .limit(10)
        .select('name totalXP -_id');
    res.json(users);
  } catch (err) {
    console.error('Error fetching global leaderboard:', err);
    res.status(500).json({ message: 'Error fetching global leaderboard' });
  }
});

app.get('/api/leaderboard/game/:gameId', (req, res) => {
  const { gameId } = req.params;
  console.log(`GET /api/leaderboard/game/${gameId}`);
  const data = Array.from(gameLeaderboard.entries())
      .map(([name, d]) => ({ name, ...d }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  res.json(data);
});

// Error Handling Middleware
console.log('Registering error handling middleware');
app.use(notFound);
app.use(errorHandler);

// Update global leaderboard
async function updateGlobalLeaderboard(username, xp) {
  console.log(`updateGlobalLeaderboard called for ${username} with xp: ${xp}`);
  try {
    const user = await mongoose.model('User').findOne({ name: username });
    if (user) {
      user.totalXP += xp;
      await user.save();
      console.log(`Updated MongoDB XP for ${username}: ${user.totalXP}`);

      const globalData = globalLeaderboard.get(username) || { totalXP: 0 };
      globalData.totalXP += xp;
      globalLeaderboard.set(username, globalData);

      io.emit('globalLeaderboardUpdate',
          Array.from(globalLeaderboard.entries())
              .map(([name, d]) => ({ name, ...d }))
              .sort((a, b) => b.totalXP - a.totalXP)
              .slice(0, 10)
      );
      console.log('Emitted globalLeaderboardUpdate');
    }
  } catch (err) {
    console.error('Error updating global leaderboard:', err);
  }
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  activePlayersGauge.inc();

  socket.on('findMatch', async ({ username, language }) => {
    console.log(`findMatch event: username=${username}, language=${language}`);
    const cacheKey = `wordpairs:${language}`;
    const cacheSize = redis
        ? await redis.scard(cacheKey)
        : (questionCache.get(cacheKey)?.size || 0);
    console.log(`Cache size for ${language}: ${cacheSize}`);

    if (cacheSize < 10) {
      console.log('Cache low, prefetching...');
      await prefetchWordPairs(language);
    }

    matchmakingQueue[language].push({ id: socket.id, username });
    console.log(`Queue updated for ${language}:`, matchmakingQueue[language]);

    if (matchmakingQueue[language].length >= 2) {
      console.log('Match found, setting up room');
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

      players.forEach(p => {
        room.scores[p.id] = 0;
        const ps = io.sockets.sockets.get(p.id);
        if (ps) ps.join(roomId);
      });

      io.to(roomId).emit('roomInfo', {
        roomId,
        players: room.players,
        scores: room.scores
      });
      console.log('roomInfo emitted');

      setTimeout(() => {
        io.to(roomId).emit('matchFound', { roomId });
        console.log('matchFound emitted');
        startNewRound(roomId);
      }, 2000);

      activeGamesGauge.inc();
      console.log('activeGamesGauge incremented');
    }
  });

  socket.on('joinRoom', ({ roomId, username, language }) => {
    console.log(`joinRoom event: roomId=${roomId}, username=${username}, language=${language}`);
    let room = gameState.get(roomId);
    if (!room) {
      console.log('Room not found, creating new');
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
      activeGamesGauge.inc();
      console.log('activeGamesGauge incremented for new room');
    }

    if (room.players.length >= 4) {
      console.warn('Room full, emitting roomFull');
      socket.emit('roomFull');
      return;
    }

    const player = { id: socket.id, username };
    room.players.push(player);
    room.scores[socket.id] = 0;
    socket.join(roomId);

    io.to(roomId).emit('roomInfo', { players: room.players, scores: room.scores });
    io.to(roomId).emit('playerJoined', { players: room.players, scores: room.scores });
    console.log('playerJoined emitted');

    if (room.players.length >= 2 && !room.gameStarted) {
      room.gameStarted = true;
      console.log('Starting new round after join');
      setTimeout(() => startNewRound(roomId), 2000);
    }
  });

  socket.on('leaveRoom', ({ roomId }) => {
    console.log(`leaveRoom event: roomId=${roomId}, socket.id=${socket.id}`);
    const room = gameState.get(roomId);
    if (room) {
      const idx = room.players.findIndex(p => p.id === socket.id);
      if (idx !== -1) {
        room.players.splice(idx, 1);
        delete room.scores[socket.id];
        socket.leave(roomId);

        if (room.players.length === 0) {
          console.log('Last player left, deleting room', roomId);
          usedQuestions.delete(roomId);
          gameState.delete(roomId);
          activeGamesGauge.dec();
          io.to(roomId).emit('roomDeleted');
        } else {
          console.log('Player left, emitting playerLeft');
          io.to(roomId).emit('playerLeft', { players: room.players, scores: room.scores });
        }
      }
    }
  });

  // Start a new game round
  async function startNewRound(roomId) {
    console.log(`startNewRound called for ${roomId}`);
    const room = gameState.get(roomId);
    if (!room) {
      console.warn('Room not found in startNewRound');
      return;
    }

    const pair = await getRandomWordPair(roomId, room.language);
    if (!pair) {
      console.warn('No pair returned, using fallback');
      const fallback = getFallbackWordPairs(room.language);
      const idx = Math.floor(Math.random() * fallback.length);
      room.currentWord = fallback[idx].word;
      room.translation = fallback[idx].translation;
      room.alternativeTranslations = fallback[idx].alternativeTranslations;
    } else {
      room.currentWord = pair.word;
      room.translation = pair.translation;
      room.alternativeTranslations = pair.alternativeTranslations;
    }

    room.roundStartTime = Date.now();
    room.revealedChars = '_'.repeat(room.currentWord.length);
    room.questionsUsed++;
    console.log(`New round: word=${room.currentWord}, questionsUsed=${room.questionsUsed}`);

    io.to(roomId).emit('newRound', {
      word: room.currentWord,
      translation: room.translation,
      hint: room.revealedChars
    });
    console.log('newRound emitted');

    const cacheKey = `wordpairs:${room.language}`;
    const cacheSize = redis
        ? await redis.scard(cacheKey)
        : (questionCache.get(cacheKey)?.size || 0);
    console.log(`Cache size after new round: ${cacheSize}`);

    if (cacheSize < 5 || room.questionsUsed >= 10) {
      console.log('Cache low or questionsUsed high, prefetching');
      prefetchWordPairs(room.language);
      room.questionsUsed = 0;
    }
  }

  socket.on('makeGuess', ({ roomId, guess }) => {
    console.log(`makeGuess event: roomId=${roomId}, guess=${guess}`);
    const room = gameState.get(roomId);
    if (!room) {
      console.warn('Room not found in makeGuess');
      return;
    }

    const current = room.currentWord.toLowerCase();
    const g = guess.toLowerCase();
    const player = room.players.find(p => p.id === socket.id);
    const correct = (g === current) || (room.alternativeTranslations?.includes(g));

    if (correct) {
      console.log('Correct guess');
      wordGuessCounter.inc({ correct: 'true' });
      const timeTaken = (Date.now() - room.roundStartTime) / 1000;
      const bonus = Math.max(0, Math.floor((30 - timeTaken) * 10));
      const points = 100 + bonus;

      room.scores[socket.id] += points;
      room.revealedChars = room.currentWord;

      const pd = gameLeaderboard.get(player.username) || { score: 0 };
      pd.score += points;
      gameLeaderboard.set(player.username, pd);

      updateGlobalLeaderboard(player.username, points);

      io.to(roomId).emit('correctGuess', {
        player,
        scores: room.scores,
        revealedChars: room.currentWord
      });
      io.to(roomId).emit('gameLeaderboardUpdate',
          Array.from(gameLeaderboard.entries())
              .map(([n, d]) => ({ name: n, ...d }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 10)
      );
      console.log('correctGuess & leaderboardUpdate emitted');

      setTimeout(() => startNewRound(roomId), 2000);
    } else {
      console.log('Wrong guess');
      wordGuessCounter.inc({ correct: 'false' });
      let newHint = '';
      let matches = 0;
      for (let i = 0; i < current.length; i++) {
        if (i < g.length && g[i] === current[i]) {
          newHint += room.currentWord[i];
          matches++;
        } else {
          newHint += room.revealedChars[i] !== '_' ? room.revealedChars[i] : '_';
        }
      }

      if (matches > 0) {
        console.log(`Partial hits: ${matches}`);
        const pts = matches * 10;
        room.scores[socket.id] += pts;
        room.revealedChars = newHint;
        io.to(roomId).emit('correctGuess', {
          player,
          scores: room.scores,
          revealedChars: newHint
        });
      } else {
        console.log('No hits, deducting points');
        room.scores[socket.id] = Math.max(0, room.scores[socket.id] - 20);
        io.to(roomId).emit('wrongGuess', {
          player,
          scores: room.scores
        });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    activePlayersGauge.dec();

    // Remove from any rooms
    gameState.forEach((room, roomId) => {
      const idx = room.players.findIndex(p => p.id === socket.id);
      if (idx !== -1) {
        console.log(`Cleaning up disconnected user in room ${roomId}`);
        room.players.splice(idx, 1);
        delete room.scores[socket.id];

        if (room.players.length === 0) {
          console.log('Room empty after disconnect, deleting', roomId);
          usedQuestions.delete(roomId);
          gameState.delete(roomId);
          activeGamesGauge.dec();
        } else {
          console.log('Emitting playerLeft after disconnect');
          io.to(roomId).emit('playerLeft', {
            players: room.players,
            scores: room.scores
          });
        }
      }
    });

    // Remove from matchmaking queues
    Object.keys(matchmakingQueue).forEach(lang => {
      const qi = matchmakingQueue[lang].findIndex(p => p.id === socket.id);
      if (qi !== -1) {
        matchmakingQueue[lang].splice(qi, 1);
        console.log(`Removed disconnected user from ${lang} queue`);
      }
    });
  });
});

// MongoDB Connection
const connectDB = async () => {
  console.log('Connecting to MongoDB');
  try {
    const conn = await mongoose.connect(
        'mongodb+srv://narayanaudayagiri88:narayanaudayagiri88@cluster0.xfb8w.mongodb.net/synergy'
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

// Start Server
connectDB().then(() => {
  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
