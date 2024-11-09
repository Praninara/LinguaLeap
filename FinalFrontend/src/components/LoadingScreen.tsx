import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Languages } from 'lucide-react';

interface Fact {
  text: string;
  source: string;
}

interface LoadingScreenProps {
  game: 'dino' | 'memory';
  facts: Fact[];
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ game, facts }) => {
  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  return (
    <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#3a3a3a] p-8 rounded-lg pixel-border max-w-2xl w-full"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-24 h-24 relative"
          >
            {/* Pixel Art Dino */}
            <div className="absolute inset-0 bg-[#4CAF50] rounded-lg transform -skew-x-6">
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute bottom-0 left-1/4 w-2 h-4 bg-[#388E3C]"></div>
              <div className="absolute bottom-0 right-1/4 w-2 h-4 bg-[#388E3C]"></div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-pixel text-[#ffd700] mb-4 flex items-center justify-center gap-2">
            <Languages className="w-6 h-6" />
            {game === 'dino' ? 'Spanish Learning Tips' : 'French Learning Tips'}
          </h2>
          <p className="text-white font-pixel mb-6">Loading your language adventure...</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#2b2b2b] p-6 rounded-lg mb-6"
        >
          <div className="flex items-start gap-4">
            <BookOpen className="w-6 h-6 text-[#ffd700] flex-shrink-0 mt-1" />
            <div>
              <p className="text-white font-pixel mb-2">{randomFact.text}</p>
              <p className="text-sm text-[#ffd700] font-pixel">Source: {randomFact.source}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-16 h-1 bg-[#ffd700] rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;