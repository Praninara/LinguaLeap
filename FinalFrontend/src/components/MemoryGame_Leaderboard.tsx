import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  // This would normally fetch from an API
  const scores = [
    { name: 'Player 1', score: 1200, level: 4 },
    { name: 'Player 2', score: 900, level: 3 },
    { name: 'Player 3', score: 600, level: 2 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#3a3a3a] p-8 rounded-lg pixel-border"
      >
        <h2 className="text-3xl text-center mb-8 text-[#ffd700]">Leaderboard</h2>

        <div className="space-y-4 mb-8">
          {scores.map((score, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2b2b2b] p-4 rounded flex justify-between items-center"
            >
              <span className="text-[#ffd700]">#{index + 1}</span>
              <span>{score.name}</span>
              <span>Level {score.level}</span>
              <span>{score.score} pts</span>
            </motion.div>
          ))}
        </div>

        <Link to="/">
          <button className="retro-button w-full">
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Leaderboard;