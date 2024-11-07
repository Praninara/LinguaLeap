import React from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, Medal, Award } from 'lucide-react';
import { mockLeaderboard } from '../data/questions';

const Leaderboard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Leaderboard
      </h2>
      <div className="space-y-4">
        {mockLeaderboard.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
              {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
              {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
              {index > 2 && <Award className="w-6 h-6 text-blue-500" />}
              <span className="font-medium text-gray-700">{entry.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Level {entry.level}</span>
              <span className="font-semibold text-blue-600">{entry.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;