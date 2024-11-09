import { motion } from 'framer-motion';
import { Play, Home, ArrowLeft } from 'lucide-react';

interface PauseModalProps {
  onResume: () => void;
  onMainMenu: () => void;
  onDashboard: () => void;
}

const PauseModal = ({ onResume, onMainMenu, onDashboard }: PauseModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#3a3a3a] p-8 rounded-lg pixel-border max-w-md w-full"
      >
        <h2 className="text-2xl font-pixel text-[#ffd700] text-center mb-6">Game Paused</h2>
        
        <div className="space-y-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-[#ffd700] text-[#2b2b2b] font-pixel rounded-lg
                     border-b-4 border-[#cc9900] hover:bg-[#ffed4a]
                     active:border-b-0 active:mt-1 transition-all
                     flex items-center justify-center gap-2"
            onClick={onResume}
          >
            <Play className="w-5 h-5" />
            Resume Game
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-[#4a4a4a] text-white font-pixel rounded-lg
                     border-b-4 border-[#333333] hover:bg-[#5a5a5a]
                     active:border-b-0 active:mt-1 transition-all
                     flex items-center justify-center gap-2"
            onClick={onMainMenu}
          >
            <Home className="w-5 h-5" />
            Main Menu
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-red-500 text-white font-pixel rounded-lg
                     border-b-4 border-red-700 hover:bg-red-600
                     active:border-b-0 active:mt-1 transition-all
                     flex items-center justify-center gap-2"
            onClick={onDashboard}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PauseModal;