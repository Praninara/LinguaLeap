import { motion } from 'framer-motion';

interface PauseModalProps {
  onResume: () => void;
}

const PauseModal = ({ onResume }: PauseModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-[#3a3a3a] p-8 rounded-lg pixel-border">
        <h2 className="text-2xl mb-4 font-pixel text-center">Game Paused</h2>
        <button 
          className="retro-button px-6 py-2 bg-[#4a4a4a] hover:bg-[#5a5a5a] 
            rounded-lg font-pixel transition-colors"
          onClick={onResume}
        >
          Resume
        </button>
      </div>
    </motion.div>
  );
};

export default PauseModal;