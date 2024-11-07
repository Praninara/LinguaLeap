import { motion } from 'framer-motion';

interface GameHeaderProps {
  timer: number;
  score: number;
  level: number;
}

const GameHeader = ({ timer, score, level }: GameHeaderProps) => {
  return (
    <motion.div 
      className="flex justify-between items-center p-4 bg-[#2a2a2a] rounded-lg mb-4 pixel-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="level text-xl font-pixel text-[#ffd700]">Level {level}</div>
      <div className="timer text-xl font-pixel">Time: {timer}s</div>
      <div className="score text-xl font-pixel">Score: {score}</div>
    </motion.div>
  );
};

export default GameHeader;