import React from 'react';
import { Question } from '../types';

interface QuestionPanelProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {question.text}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="p-4 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg
                     hover:bg-blue-500 hover:text-white transition-colors
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;