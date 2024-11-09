import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Home, RotateCcw } from 'lucide-react';

interface GameOverProps {
  score: number;
  level: number;
  onRetry: () => void;
  onMainMenu: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, level, onRetry, onMainMenu }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#3a3a3a] p-8 rounded-lg pixel-border max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-pixel text-[#ffd700] mb-4">Game Over!</h2>
          <div className="space-y-2 font-pixel">
            <p className="text-white">Level Reached: {level}</p>
            <p className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-[#ffd700]" />
              <span className="text-white">Final Score: {score}</span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="w-full p-4 bg-[#ffd700] text-[#2b2b2b] font-pixel rounded-lg
                     border-b-4 border-[#cc9900] hover:bg-[#ffed4a]
                     active:border-b-0 active:mt-1 transition-all
                     flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retry Level {level}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onMainMenu}
            className="w-full p-4 bg-[#4a4a4a] text-white font-pixel rounded-lg
                     border-b-4 border-[#333333] hover:bg-[#5a5a5a]
                     active:border-b-0 active:mt-1 transition-all
                     flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Main Menu
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver;