import React from 'react';
import { Player } from '../types';
import { Heart, Trophy, Star } from 'lucide-react';

interface ScoreBoardProps {
  player: Player;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ player }) => {
  // Ensure lives is a non-negative number and cap it at a maximum of 5
  const livesCount = Math.max(0, Math.min(player.lives, 5));

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Trophy className="w-6 h-6 text-[#ffd700]" />
        <span className="text-[#ffd700] font-pixel">{player.score}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Star className="w-6 h-6 text-[#ffd700]" />
        <span className="text-[#ffd700] font-pixel">Level {player.level}</span>
      </div>
      <div className="flex items-center space-x-1">
        {Array.from({ length: livesCount }).map((_, i) => (
          <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;