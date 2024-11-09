import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { mockLeaderboard } from '../data/questions';
import { motion } from 'framer-motion';

const Leaderboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#3a3a3a] rounded-xl p-6 pixel-border"
    >
      <h2 className="text-2xl font-pixel text-[#ffd700] mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        Leaderboard
      </h2>
      <div className="space-y-4">
        {mockLeaderboard.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#2b2b2b] p-4 rounded-lg border-2 border-[#4a4a4a] hover:border-[#ffd700] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {index === 0 && <Medal className="w-6 h-6 text-[#ffd700]" />}
                {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
                {index > 2 && <Award className="w-6 h-6 text-blue-500" />}
                <div className="flex flex-col">
                  <span className="font-pixel text-white">{entry.name}</span>
                  <span className="text-sm text-[#ffd700] font-pixel">Level {entry.level}</span>
                </div>
              </div>
              <span className="font-pixel text-[#ffd700]">{entry.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Leaderboard;