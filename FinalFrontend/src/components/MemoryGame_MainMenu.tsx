import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Info, Sparkles, ArrowLeft } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
  onDashboard: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onDashboard }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#2b2b2b] flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-[#3a3a3a] p-8 rounded-lg pixel-border max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#ffd700] flex items-center justify-center gap-2 mb-4">
            <Brain className="w-10 h-10" />
            Memory Match
          </h1>
          <p className="text-white font-pixel mb-6">Master French with Memory Magic!</p>
        </div>

        <div className="bg-[#2b2b2b] p-6 rounded-lg mb-8">
          <h2 className="text-xl text-[#ffd700] font-pixel mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            How to Play
          </h2>
          <ul className="text-white font-pixel space-y-3 mb-6">
            <li>🎯 Match French words with their English translations</li>
            <li>⏰ Complete each level before time runs out (45 seconds)</li>
            <li>⭐ Earn 100 points for each successful match</li>
            <li>🔄 Clear all pairs to advance to the next level</li>
            <li>📚 Read the story at the start of each level</li>
          </ul>

          <div className="mt-6 bg-[#1a1a1a] p-4 rounded-lg">
            <h3 className="text-[#ffd700] font-pixel mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Pro Tips
            </h3>
            <ul className="text-indigo-200 font-pixel text-sm space-y-2">
              <li>Press ESC to pause/resume the game</li>
              <li>Study the story carefully - it contains the words you'll match</li>
              <li>Remember card positions to make matches quickly</li>
              <li>Try to complete levels with time remaining for bonus points</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartGame}
            className="w-full p-4 bg-[#ffd700] text-[#2b2b2b] font-pixel rounded-lg
                     border-b-4 border-[#cc9900] hover:bg-[#ffed4a]
                     active:border-b-0 active:mt-1 transition-all"
          >
            Start Memory Quest
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDashboard}
            className="w-full p-4 bg-[#4a4a4a] text-white font-pixel rounded-lg
                     border-b-4 border-[#333333] hover:bg-[#5a5a5a]
                     active:border-b-0 active:mt-1 transition-all
                     flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;