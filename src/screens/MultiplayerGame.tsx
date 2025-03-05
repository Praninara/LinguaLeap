import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { io, Socket } from 'socket.io-client';
import { Users, Send, Crown, ArrowLeft, Gamepad2, Shuffle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUserStore } from '../stores/userStore';

const socket = io('http://localhost:5000');

interface Player {
  id: string;
  username: string;
}

type GameMode = 'matchmaking' | 'private' | null;
type Language = 'french' | 'spanish' | null;

const MultiplayerGame = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [language, setLanguage] = useState<Language>(null);
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [currentWord, setCurrentWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [revealedWord, setRevealedWord] = useState('');
  const [guess, setGuess] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Socket event listeners
    socket.on('playerJoined', ({ players, scores }) => {
      setPlayers(players);
      setScores(scores);
      toast.success('Player joined the game!');
    });

    socket.on('playerLeft', ({ players, scores }) => {
      setPlayers(players);
      setScores(scores);
      toast.error('Player left the game');
    });

    socket.on('newRound', ({ word, translation, hint }) => {
      setCurrentWord(word);
      setTranslation(translation);
      setRevealedWord(hint);
      setGuess('');
      setGameStarted(true);
      toast.success('New round started!');
    });

    socket.on('correctGuess', ({ player, scores, revealedChars }) => {
      setScores(scores);
      setRevealedWord(revealedChars);
      toast.success(`${player.username} made progress!`);
    });

    socket.on('wrongGuess', ({ player, scores }) => {
      setScores(scores);
      toast.error(`${player.username} guessed wrong!`);
    });

    socket.on('matchFound', ({ roomId }) => {
      setRoomId(roomId);
      toast.success('Match found! Game starting...');
    });

    socket.on('roomFull', () => {
      toast.error('Room is full!');
    });

    return () => {
      socket.off('playerJoined');
      socket.off('playerLeft');
      socket.off('newRound');
      socket.off('correctGuess');
      socket.off('wrongGuess');
      socket.off('matchFound');
      socket.off('roomFull');
    };
  }, [user, navigate]);

  const startMatchmaking = () => {
    if (!language) {
      toast.error('Please select a language first');
      return;
    }
    socket.emit('findMatch', { username: user?.name, language });
    toast.success('Looking for players...');
  };

  const joinPrivateRoom = () => {
    if (!roomId.trim() || !language) {
      toast.error('Please enter a room ID and select a language');
      return;
    }
    socket.emit('joinRoom', { roomId, username: user?.name, language });
  };

  const makeGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;
    
    socket.emit('makeGuess', { roomId, guess });
    setGuess('');
  };

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-[#2b2b2b] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-pixel text-[#ffd700] flex items-center gap-2">
              <Users className="w-8 h-8" />
              Choose Game Mode
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#ffd700]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#3a3a3a] p-8 rounded-lg pixel-border cursor-pointer"
              onClick={() => setGameMode('matchmaking')}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shuffle className="w-8 h-8 text-[#ffd700]" />
                <h2 className="text-xl font-pixel text-white">Auto Matchmaking</h2>
              </div>
              <p className="text-[#ffd700] font-pixel">Find players automatically!</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#3a3a3a] p-8 rounded-lg pixel-border cursor-pointer"
              onClick={() => setGameMode('private')}
            >
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="w-8 h-8 text-[#ffd700]" />
                <h2 className="text-xl font-pixel text-white">Private Room</h2>
              </div>
              <p className="text-[#ffd700] font-pixel">Play with friends!</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (!language) {
    return (
      <div className="min-h-screen bg-[#2b2b2b] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-pixel text-[#ffd700] flex items-center gap-2">
              <Users className="w-8 h-8" />
              Choose Language
            </h1>
            <button
              onClick={() => setGameMode(null)}
              className="p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#ffd700]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#3a3a3a] p-8 rounded-lg pixel-border cursor-pointer"
              onClick={() => setLanguage('french')}
            >
              <h2 className="text-xl font-pixel text-white">French</h2>
              <p className="text-[#ffd700] font-pixel">Learn French with friends!</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#3a3a3a] p-8 rounded-lg pixel-border cursor-pointer"
              onClick={() => setLanguage('spanish')}
            >
              <h2 className="text-xl font-pixel text-white">Spanish</h2>
              <p className="text-[#ffd700] font-pixel">Learn Spanish with friends!</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#2b2b2b] p-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-pixel text-[#ffd700] flex items-center gap-2">
              <Users className="w-8 h-8" />
              {gameMode === 'matchmaking' ? 'Finding Players...' : 'Join Game Room'}
            </h1>
            <button
              onClick={() => setLanguage(null)}
              className="p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#ffd700]" />
            </button>
          </div>

          {gameMode === 'matchmaking' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#3a3a3a] p-8 rounded-lg pixel-border"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Shuffle className="w-12 h-12 text-[#ffd700]" />
                </motion.div>
                <h2 className="text-xl font-pixel text-white mb-4">Looking for players...</h2>
                <button
                  onClick={startMatchmaking}
                  className="px-6 py-2 bg-[#ffd700] text-[#2b2b2b] rounded-lg font-pixel"
                >
                  Start Matchmaking
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#3a3a3a] p-8 rounded-lg pixel-border"
            >
              <h2 className="text-xl font-pixel text-white mb-6">Join a Game Room</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  className="flex-1 px-4 py-2 bg-[#2b2b2b] text-white rounded-lg font-pixel"
                />
                <button
                  onClick={joinPrivateRoom}
                  className="px-6 py-2 bg-[#ffd700] text-[#2b2b2b] rounded-lg font-pixel"
                >
                  Join Room
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2b2b2b] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#3a3a3a] p-8 rounded-lg pixel-border"
          >
            <h2 className="text-2xl font-pixel text-[#ffd700] mb-6">Word to Guess</h2>
            <div className="space-y-4">
              <p className="text-4xl font-pixel text-white tracking-widest mb-4">
                {revealedWord}
              </p>
              <p className="text-xl font-pixel text-[#ffd700]">
                Translation: {translation}
              </p>
            </div>
            <form onSubmit={makeGuess} className="flex gap-4 mt-8">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
                className="flex-1 px-4 py-2 bg-[#2b2b2b] text-white rounded-lg font-pixel"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#ffd700] text-[#2b2b2b] rounded-lg font-pixel flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Guess
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#3a3a3a] p-8 rounded-lg pixel-border"
          >
            <h2 className="text-xl font-pixel text-[#ffd700] mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6" />
              Players
            </h2>
            <div className="space-y-4">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center bg-[#2b2b2b] p-4 rounded-lg"
                >
                  <span className="font-pixel text-white">{player.username}</span>
                  <span className="font-pixel text-[#ffd700]">
                    {scores[player.id] || 0} pts
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerGame;