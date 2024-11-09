import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface GameOverModalProps {
  score: number;
  highScore: number;
  level: number;
  onRetry: () => void;
}

const GameOverModal = ({ score, highScore, level, onRetry }: GameOverModalProps) => {
  const isNewHighScore = score > highScore;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-[#3a3a3a] p-8 rounded-lg pixel-border max-w-md w-full">
        <h2 className="text-2xl mb-4 font-pixel text-center text-[#ffd700]">Game Over!</h2>
        
        <div className="space-y-4 mb-6">
          <p className="text-center">Level Reached: {level}</p>
          <p className="text-center">Final Score: {score}</p>
          {isNewHighScore && (
            <p className="text-center text-[#ffd700]">New High Score! 🏆</p>
          )}
        </div>

        <div className="space-y-4">
          <button 
            className="retro-button w-full"
            onClick={onRetry}
          >
            Try Again (Level {level})
          </button>

          <Link to="/">
            <button className="retro-button w-full bg-[#4CAF50]">
              Back to Menu
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GameOverModal;