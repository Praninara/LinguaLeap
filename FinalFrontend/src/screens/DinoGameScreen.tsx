import React from 'react';
import Game from '../components/DinoGame_Game';
import Leaderboard from '../components/DinoGame_Leaderboard';
import { motion } from 'framer-motion';

const DinoGameScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#2b2b2b] p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-8 gap-8">
          <motion.div 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="lg:col-span-6"
          >
            <Game />
          </motion.div>
          <motion.div 
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="lg:col-span-2"
          >
            <Leaderboard />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DinoGameScreen;