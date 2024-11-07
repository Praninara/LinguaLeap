import { motion } from 'framer-motion';

interface GameCardProps {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const GameCard = ({ content, isFlipped, onClick }: GameCardProps) => {
  return (
    <motion.div
      className={`game-card ${isFlipped ? 'flipped' : ''} 
        bg-[#2a2a2a] rounded-lg p-4 cursor-pointer 
        aspect-square flex items-center justify-center
        text-xl font-bold shadow-lg
        border-2 border-[#3a3a3a] hover:border-[#4a4a4a]`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="h-full flex items-center justify-center">
        {isFlipped ? content : '?'}
      </div>
    </motion.div>
  );
};

export default GameCard;