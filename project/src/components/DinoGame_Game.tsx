import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { Gamepad2 } from 'lucide-react';
import DinoGame from './DinoGame';
import QuestionPanel from './QuestionPanel';
import ScoreBoard from './ScoreBoard';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  level: number;
}

const Game = () => {
  const [player, setPlayer] = useState<Player>({
    name: localStorage.getItem('playerName') || 'Player',
    score: 0,
    level: 1,
    lives: 3
  });

  const API_KEY = 'AIzaSyC3yHpnW2gV-LQShLOit_1av0S_pDcV_8w';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const generateContent = async (prompt: string) => {
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const generateQuestions = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate 25 Spanish learning questions as a JSON array only, without any additional text, code blocks, or formatting. Each question should be in this format:
        {
          "id": <number>,
          "text": "<Spanish learning question>",
          "options": ["<option1>", "<option2>", "<option3>", "<option4>"],
          "correctAnswer": "<correct option>",
          "level": <level number>
        }
        
        Levels:
        - Levels 1-2: Basic Spanish
        - Levels 3-4: A1 DELE level Spanish
        - Level 5: A2 DELE level Spanish
  
        Provide questions ordered by level.`;
  
      const response = await generateContent(prompt);
      console.log(response);
  
      // Remove code block markers and extraneous characters
      const cleanedResponse = response.replace(/```json|```/g, "").trim();
  
      // Check for a valid JSON array structure
      if (!cleanedResponse.startsWith("[") || !cleanedResponse.endsWith("]")) {
        throw new Error("Invalid JSON array format");
      }
  
      // Attempt to parse the cleaned response
      const newQuestions = JSON.parse(cleanedResponse);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback questions in case of error
      setQuestions([
        {
          id: 1,
          text: "What is 'Hello' in Spanish?",
          options: ["Hola", "Bonjour", "Ciao", "Hallo"],
          correctAnswer: "Hola",
          level: 1
        },
        {
          id: 2,
          text: "What is 'Food' in Spanish?",
          options: ["Nourriture", "Comida", "Cibo", "Essen"],
          correctAnswer: "Comida",
          level: 1
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    generateQuestions();
  }, []); // Generate questions only once when component mounts

  const handleCollision = () => {
    setPlayer(prev => ({
      ...prev,
      lives: prev.lives - 1,
      score: Math.max(0, prev.score - 50)
    }));
    setCurrentQuestionIndex(prev => Math.max(0, prev));
  };

  const handleAnswer = (answer: string) => {
    if (!questions[currentQuestionIndex]) return;

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
        if (currentQuestionIndex + 1 >= questions.length) {
          // If we've run out of questions, cycle back to the start
          // but filter for questions at the current level
          const currentLevel = Math.floor(player.score / 500) + 1;
          const levelQuestions = questions.filter(q => q.level === currentLevel);
          if (levelQuestions.length > 0) {
            const nextIndex = questions.indexOf(levelQuestions[0]);
            setCurrentQuestionIndex(nextIndex);
          } else {
            setCurrentQuestionIndex(0);
          }
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      }, 1000);

      if (consecutiveCorrect + 1 >= 5) {
        setConsecutiveCorrect(0);
        setPlayer(prev => ({
          ...prev,
          level: prev.level + 1,
          score: prev.score + 200
        }));
        alert(`¡Felicitaciones! You've reached Level ${player.level + 1}!`);
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
      alert(`¡Juego terminado! Final Score: ${player.score}`);
      setPlayer({ ...player, lives: 3, score: 0, level: 1 });
      setConsecutiveCorrect(0);
      setCurrentQuestionIndex(0);
    }
  }, [player.lives]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
      {questions[currentQuestionIndex] && (
        <QuestionPanel
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Game;




