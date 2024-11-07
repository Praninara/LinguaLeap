import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';

const Home = () => {
  const { level, score, highScore, resetGame } = useGameStore();

  return (
    <div className="min-h-screen flex items-center justify-center retro-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#3a3a3a] p-8 rounded-lg max-w-md w-full pixel-border"
      >
        <h1 className="text-3xl text-center mb-8 text-[#ffd700]">
          French Memory
        </h1>

        <div className="space-y-4 mb-8">
          <div className="bg-[#2b2b2b] p-4 rounded">
            <p>Current Level: {level}</p>
            <p>High Score: {highScore}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/game">
            <button className="retro-button w-full">
              {score > 0 ? 'Continue Game' : 'Start Game'}
            </button>
          </Link>

          {score > 0 && (
            <button 
              className="retro-button w-full bg-[#ff6b6b]"
              onClick={resetGame}
            >
              New Game
            </button>
          )}

          <Link to="/leaderboard">
            <button className="retro-button w-full bg-[#4CAF50]">
              Leaderboard
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;