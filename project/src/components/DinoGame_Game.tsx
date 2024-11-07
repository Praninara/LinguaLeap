import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { Gamepad2 } from 'lucide-react';
import DinoGame from './DinoGame';
import QuestionPanel from './QuestionPanel';
import ScoreBoard from './ScoreBoard';
import { questions } from '../data/questions';

const Game: React.FC = () => {
  const [player, setPlayer] = useState<Player>({
    name: localStorage.getItem('playerName') || 'Player',
    score: 0,
    level: 1,
    lives: 3
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  const handleCollision = () => {
    setPlayer(prev => ({
      ...prev,
      lives: prev.lives - 1,
      score: Math.max(0, prev.score - 50)
    }));
    // Reset to previous checkpoint
    setCurrentQuestionIndex(prev => Math.max(0, prev));
  };

  const handleAnswer = (answer: string) => {
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    
    if (correct) {
      setIsJumping(true);
      setConsecutiveCorrect(prev => prev + 1);
      setPlayer(prev => ({
        ...prev,
        score: prev.score + 100,
        level: Math.floor(prev.score / 500) + 1
      }));
      
      setTimeout(() => {
        setIsJumping(false);
        setCurrentQuestionIndex(prev => 
          prev + 1 >= questions.length ? 0 : prev + 1
        );
      }, 1000);

      if (consecutiveCorrect + 1 >= 5) {
        setConsecutiveCorrect(0);
        setPlayer(prev => ({
          ...prev,
          level: prev.level + 1,
          score: prev.score + 200
        }));
        alert(`Congratulations! You've reached Level ${player.level + 1}!`);
      }
    } else {
      setConsecutiveCorrect(0);
      setPlayer(prev => ({
        ...prev,
        lives: prev.lives - 1,
        score: Math.max(0, prev.score - 50)
      }));
      // Reset to previous checkpoint on wrong answer
      setCurrentQuestionIndex(prev => Math.max(0, prev));
    }
  };

  useEffect(() => {
    if (player.lives <= 0) {
      alert(`Game Over! Final Score: ${player.score}`);
      setPlayer({
        ...player,
        lives: 3,
        score: 0,
        level: 1
      });
      setConsecutiveCorrect(0);
      setCurrentQuestionIndex(0);
    }
  }, [player.lives]);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <Gamepad2 className="w-8 h-8" />
          LinguaLeap
        </h1>
        <ScoreBoard player={player} />
      </div>

      <div className="bg-gray-50 rounded-xl shadow-lg p-6 mb-8">
        <DinoGame 
          isJumping={isJumping}
          questionIndex={currentQuestionIndex}
          lives={player.lives}
          onCollision={handleCollision}
        />
      </div>

      <QuestionPanel 
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Game;