import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { Gamepad2, Pause, Play } from 'lucide-react';
import DinoGame from './DinoGame';
import QuestionPanel from './QuestionPanel';
import ScoreBoard from './ScoreBoard';
import PauseModal from './PauseModal';
import GameOver from './DinoGame_GameOver';
import MainMenu from './DinoGame_MainMenu';
import LoadingScreen from './LoadingScreen';
import { spanishFacts } from '../data/languageFacts';
import toast from 'react-hot-toast';
import { generateQuestions } from '../services/questionService';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import axios from 'axios';

const Game = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player>({
    name: localStorage.getItem('playerName') || 'Player',
    score: 0,
    level: 1,
    lives: 3
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const user = useUserStore((state) => state.user);

  const updateTotalXP = async (xpToAdd: number) => {
    if (!user?.name) {
      console.error('No user found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/users/${user.name}/addXP`, { 
        xp: xpToAdd 
      });
      
      if (response.data.totalXP !== undefined) {
        useUserStore.getState().updateXP(xpToAdd);
        toast.success(`Earned ${xpToAdd} XP!`);
      }
    } catch (error) {
      console.error('Failed to update XP:', error);
      toast.error('Failed to update XP');
    }
  };

  useEffect(() => {
    if (isGameOver && player.score > 0) {
      updateTotalXP(player.score);
    }
  }, [isGameOver, player.score]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !showMainMenu) {
        setIsPaused(prev => !prev);
        toast.success(isPaused ? 'Game Resumed' : 'Game Paused');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPaused, showMainMenu]);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const newQuestions = await generateQuestions(player.level);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast.error('Error loading questions. Please try again.');
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [player.level]);

  const handleCollision = () => {
    if (!isPaused) {
      setPlayer(prev => ({
        ...prev,
        lives: prev.lives - 1,
        score: Math.max(0, prev.score - 50)
      }));
      setCurrentQuestionIndex(prev => Math.max(0, prev));
    }
  };

  const handleAnswer = (answer: string) => {
    if (!questions[currentQuestionIndex] || isPaused) return;

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
        const nextIndex = (currentQuestionIndex + 1) % questions.length;
        setCurrentQuestionIndex(nextIndex);

        if (nextIndex === 0) {
          loadQuestions();
        }
      }, 1000);

      if (consecutiveCorrect + 1 >= 5) {
        setConsecutiveCorrect(0);
        setPlayer(prev => ({
          ...prev,
          level: prev.level + 1,
          score: prev.score + 200
        }));
        toast.success(`¡Felicitaciones! You've reached Level ${player.level + 1}!`);
      }
    } else {
      setConsecutiveCorrect(0);
      setPlayer(prev => ({
        ...prev,
        lives: prev.lives - 1,
        score: Math.max(0, prev.score - 50)
      }));
      setCurrentQuestionIndex(prev => Math.max(0, prev));
    }
  };

  useEffect(() => {
    if (player.lives <= 0) {
      setIsGameOver(true);
    }
  }, [player.lives]);

  const handleRetry = () => {
    setIsGameOver(false);
    setPlayer({ ...player, lives: 3, score: Math.max(0, player.score - 200) });
    setConsecutiveCorrect(0);
    setCurrentQuestionIndex(0);
    loadQuestions();
  };

  const handleMainMenu = () => {
    setIsGameOver(false);
    setShowMainMenu(true);
    setPlayer({ name: player.name, score: 0, level: 1, lives: 3 });
    setConsecutiveCorrect(0);
    setCurrentQuestionIndex(0);
    setIsPaused(false);
  };

  if (showMainMenu) {
    return <MainMenu onStartGame={() => setShowMainMenu(false)} onDashboard={() => navigate('/dashboard')} />;
  }

  if (isLoading) {
    return <LoadingScreen game="dino" facts={spanishFacts} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#2b2b2b] text-white pixel-font p-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-[#3a3a3a] p-6 rounded-lg pixel-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#ffd700] flex items-center gap-2">
              <Gamepad2 className="w-8 h-8" />
              DinoLingo
            </h1>
            <div className="flex items-center gap-4">
              <ScoreBoard player={player} />
              <button
                onClick={() => {
                  setIsPaused(prev => !prev);
                  toast.success(isPaused ? 'Game Resumed' : 'Game Paused');
                }}
                className="p-2 rounded-lg hover:bg-[#2b2b2b] transition-colors"
              >
                {isPaused ? (
                  <Play className="w-6 h-6 text-[#ffd700]" />
                ) : (
                  <Pause className="w-6 h-6 text-[#ffd700]" />
                )}
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-[#2b2b2b] rounded-lg p-4 mb-6"
          >
            <DinoGame
              isJumping={isJumping}
              questionIndex={currentQuestionIndex}
              lives={player.lives}
              onCollision={handleCollision}
            />
          </motion.div>

          {questions[currentQuestionIndex] && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <QuestionPanel
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {isPaused && (
        <PauseModal 
          onResume={() => setIsPaused(false)} 
          onMainMenu={handleMainMenu}
          onDashboard={() => navigate('/dashboard')}
        />
      )}
      {isGameOver && (
        <GameOver
          score={player.score}
          level={player.level}
          onRetry={handleRetry}
          onMainMenu={handleMainMenu}
        />
      )}
    </motion.div>
  );
};

export default Game;