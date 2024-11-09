import React from 'react';
import { Question } from '../types';
import { motion } from 'framer-motion';

interface QuestionPanelProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-[#3a3a3a] rounded-lg p-6 pixel-border">
      <h2 className="text-xl font-pixel text-[#ffd700] mb-6 text-center">
        {question.text}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(option)}
            className="p-4 text-lg font-pixel bg-[#2b2b2b] text-white rounded-lg
                     hover:bg-[#ffd700] hover:text-[#2b2b2b] transition-colors
                     focus:outline-none border-b-4 border-[#1a1a1a] hover:border-[#cc9900]
                     active:border-b-0 active:mt-1"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;