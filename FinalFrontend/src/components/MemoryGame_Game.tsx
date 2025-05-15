// import { useState, useEffect } from 'react';
// import useKeypress from 'react-use-keypress';
// import { motion } from 'framer-motion';
// import { useGameStore } from '../stores/gameStore';
// import { StoryModal } from './StoryModal';
// import GameCard from './GameCard';
// import GameHeader from './GameHeader';
// import PauseModal from './PauseModal';
// import GameOverModal from './GameOverModal';
// import LoadingScreen from './LoadingScreen';
// import MainMenu from './MemoryGame_MainMenu';
// import { Pause, Play } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { generateStories } from '../services/storyService';
// import { frenchFacts } from '../data/languageFacts';
// import type { Story } from '../types';
// import { useUserStore } from '../stores/userStore';
// import axios from 'axios';
//
// interface Card {
//   id: number;
//   french: string;
//   english: string;
//   isFlipped: boolean;
//   isMatched: boolean;
// }
//
// const Game = () => {
//   const navigate = useNavigate();
//   const { level, score, highScore, updateLevel, updateScore, resetGame } = useGameStore();
//   const [cards, setCards] = useState<Card[]>([]);
//   const [selectedCards, setSelectedCards] = useState<Card[]>([]);
//   const [timer, setTimer] = useState(45);
//   const [isPaused, setIsPaused] = useState(false);
//   const [showStory, setShowStory] = useState(true);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [isLevelComplete, setIsLevelComplete] = useState(false);
//   const [currentStory, setCurrentStory] = useState<Story | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMainMenu, setShowMainMenu] = useState(true);
//   const user = useUserStore((state) => state.user);
//
//   const updateTotalXP = async (xpToAdd: number) => {
//     if (!user?.name) {
//       console.error('No user found');
//       return;
//     }
//
//     try {
//       const response = await axios.post(`https://lingualeap-backend.onrender.com/api/users/${user.name}/addXP`, {
//         xp: xpToAdd
//       });
//
//       if (response.data.totalXP !== undefined) {
//         useUserStore.getState().updateXP(xpToAdd);
//         toast.success(`Earned ${xpToAdd} XP!`);
//       }
//     } catch (error) {
//       console.error('Failed to update XP:', error);
//       toast.error('Failed to update XP');
//     }
//   };
//
//   useEffect(() => {
//     const fetchStory = async () => {
//       if (!showStory) return;
//
//       setIsLoading(true);
//       try {
//         const stories = await generateStories(level);
//         const storyIndex = (level - 1) % stories.length;
//         setCurrentStory(stories[storyIndex] ?? null);
//       } catch (error) {
//         console.error('Failed to fetch story:', error);
//       } finally {
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 3000);
//       }
//     };
//
//     fetchStory();
//   }, [level, showStory]);
//
//   useEffect(() => {
//     if (isGameOver && score > 0) {
//       updateTotalXP(score);
//     }
//   }, [isGameOver, score]);
//
//   const togglePause = () => {
//     if (!showStory && !isGameOver && !showMainMenu) {
//       setIsPaused(prev => !prev);
//       toast.success(!isPaused ? 'Game Paused' : 'Game Resumed');
//     }
//   };
//
//   useKeypress(['Escape'], togglePause);
//
//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval>;
//
//     if (!showStory && !isPaused && timer > 0 && !isLevelComplete && !isGameOver && !showMainMenu) {
//       interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);
//     }
//
//     return () => clearInterval(interval);
//   }, [showStory, isPaused, timer, isLevelComplete, isGameOver, showMainMenu]);
//
//   useEffect(() => {
//     if (timer === 0 && !showStory && !isGameOver && !showMainMenu) {
//       setIsGameOver(true);
//     }
//   }, [timer, showStory]);
//
//   useEffect(() => {
//     if (cards.length > 0 && !isLevelComplete && !isGameOver && cards.every(card => card.isMatched)) {
//       setIsLevelComplete(true);
//       const nextLevel = level + 1;
//
//       toast.success('Level Complete!');
//       setTimeout(() => {
//         updateLevel(nextLevel);
//         setShowStory(true);
//       }, 1500);
//     }
//   }, [cards, level, isLevelComplete, isGameOver]);
//
//   const resetLevel = () => {
//     if (!currentStory) return;
//
//     const pairs = currentStory.words;
//     const newCards: Card[] = [];
//
//     pairs.forEach((pair, index) => {
//       newCards.push(
//         { id: index * 2, french: pair.french, english: '', isFlipped: false, isMatched: false },
//         { id: index * 2 + 1, english: pair.english, french: '', isFlipped: false, isMatched: false }
//       );
//     });
//
//     setCards(newCards.sort(() => Math.random() - 0.5));
//     setTimer(45);
//     setSelectedCards([]);
//     setIsGameOver(false);
//     setIsLevelComplete(false);
//     setIsPaused(false);
//   };
//
//   const handleCardClick = (card: Card) => {
//     if (!currentStory || isPaused || card.isMatched || selectedCards.length === 2 ||
//         card.isFlipped || isLevelComplete || isGameOver) return;
//
//     const newCards = cards.map((c) =>
//       c.id === card.id ? { ...c, isFlipped: true } : c
//     );
//     setCards(newCards);
//
//     setSelectedCards([...selectedCards, card]);
//
//     if (selectedCards.length === 1) {
//       const firstCard = selectedCards[0];
//       const secondCard = card;
//
//       if (!firstCard) return;
//
//       const matchFound = currentStory.words.some(pair =>
//         (firstCard.french && secondCard.english && firstCard.french === pair.french && secondCard.english === pair.english) ||
//         (firstCard.english && secondCard.french && firstCard.english === pair.english && secondCard.french === pair.french)
//       );
//
//       if (matchFound) {
//         setTimeout(() => {
//           const updatedCards = cards.map((c) =>
//             c.id === firstCard.id || c.id === secondCard.id
//               ? { ...c, isMatched: true, isFlipped: true }
//               : c
//           );
//           setCards(updatedCards);
//           updateScore(score + 100);
//           setSelectedCards([]);
//           toast.success('Match found!');
//         }, 500);
//       } else {
//         setTimeout(() => {
//           setCards(cards.map((c) =>
//             c.id === firstCard.id || c.id === secondCard.id
//               ? { ...c, isFlipped: false }
//               : c
//           ));
//           setSelectedCards([]);
//         }, 1000);
//       }
//     }
//   };
//
//   const handleMainMenu = () => {
//     setShowMainMenu(true);
//     setIsGameOver(false);
//     resetGame();
//     setIsPaused(false);
//   };
//
//   if (showMainMenu) {
//     return <MainMenu onStartGame={() => setShowMainMenu(false)} onDashboard={() => navigate('/dashboard')} />;
//   }
//
//   if (isLoading) {
//     return <LoadingScreen game="memory" facts={frenchFacts} />;
//   }
//
//   if (!currentStory) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-[#ffd700] text-xl">Failed to load game content. Please refresh.</div>
//       </div>
//     );
//   }
//
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {showStory ? (
//         <StoryModal
//           level={level}
//           story={currentStory}
//           onClose={() => {
//             setShowStory(false);
//             resetLevel();
//           }}
//         />
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-8"
//         >
//           <div className="flex justify-between items-center">
//             <GameHeader level={level} timer={timer} score={score} />
//             <button
//               onClick={togglePause}
//               className="p-2 rounded-lg hover:bg-[#2b2b2b] transition-colors"
//             >
//               {isPaused ? (
//                 <Play className="w-6 h-6 text-[#ffd700]" />
//               ) : (
//                 <Pause className="w-6 h-6 text-[#ffd700]" />
//               )}
//             </button>
//           </div>
//
//           <div className="grid grid-cols-4 gap-4">
//             {cards.map((card) => (
//               <GameCard
//                 key={card.id}
//                 id={card.id}
//                 content={card.french || card.english}
//                 isFlipped={card.isFlipped}
//                 isMatched={card.isMatched}
//                 onClick={() => handleCardClick(card)}
//               />
//             ))}
//           </div>
//
//           {isPaused && (
//             <PauseModal
//               onResume={() => setIsPaused(false)}
//               onMainMenu={handleMainMenu}
//               onDashboard={() => navigate('/dashboard')}
//             />
//           )}
//           {isGameOver && (
//             <GameOverModal
//               score={score}
//               highScore={highScore}
//               level={level}
//               onRetry={() => {
//                 resetGame();
//                 resetLevel();
//               }}
//             />
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };
//
// export default Game;

import React, { useState, useEffect } from 'react';
import useKeypress from 'react-use-keypress';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { StoryModal } from './StoryModal';
import GameCard from './GameCard';
import GameHeader from './GameHeader';
import PauseModal from './PauseModal';
import GameOverModal from './GameOverModal';
import LoadingScreen from './LoadingScreen';
import MainMenu from './MemoryGame_MainMenu';
import { Pause, Play } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { generateStories } from '../services/storyService';
import { frenchFacts } from '../data/languageFacts';
import type { Story } from '../types';
import { useUserStore } from '../stores/userStore';
import axios from 'axios';

interface Card {
  id: number;
  french: string;
  english: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const Game = () => {
  const navigate = useNavigate();
  const { level, score, highScore, updateLevel, updateScore, resetGame } = useGameStore();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [timer, setTimer] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const user = useUserStore((state) => state.user);

  const updateTotalXP = async (xpToAdd: number) => {
    if (!user?.name) return;
    try {
      const res = await axios.post(
          `https://lingualeap-backend.onrender.com/api/users/${user.name}/addXP`,
          { xp: xpToAdd }
      );
      if (res.data.totalXP !== undefined) {
        useUserStore.getState().updateXP(xpToAdd);
        toast.success(`Earned ${xpToAdd} XP!`);
      }
    } catch {
      toast.error('Failed to update XP');
    }
  };

  useEffect(() => {
    const fetchStory = async () => {
      if (!showStory) return;
      setIsLoading(true);
      try {
        const stories = await generateStories(level);
        const idx = (level - 1) % stories.length;
        setCurrentStory(stories[idx] ?? null);
      } catch {
        console.error('Failed to fetch story');
      } finally {
        setTimeout(() => setIsLoading(false), 3000);
      }
    };
    fetchStory();
  }, [level, showStory]);

  useEffect(() => {
    if (isGameOver && score > 0) {
      updateTotalXP(score);
    }
  }, [isGameOver, score]);

  const togglePause = () => {
    if (!showStory && !isGameOver && !showMainMenu) {
      setIsPaused((p) => !p);
      toast.success(!isPaused ? 'Game Paused' : 'Game Resumed');
    }
  };
  useKeypress(['Escape'], togglePause);

  useEffect(() => {
    let iv: ReturnType<typeof setInterval>;
    if (!showStory && !isPaused && timer > 0 && !isLevelComplete && !isGameOver && !showMainMenu) {
      iv = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(iv);
  }, [showStory, isPaused, timer, isLevelComplete, isGameOver, showMainMenu]);

  useEffect(() => {
    if (timer === 0 && !showStory && !isGameOver && !showMainMenu) {
      setIsGameOver(true);
    }
  }, [timer, showStory]);

  useEffect(() => {
    if (
        cards.length > 0 &&
        !isLevelComplete &&
        !isGameOver &&
        cards.every((c) => c.isMatched)
    ) {
      setIsLevelComplete(true);
      const next = level + 1;
      toast.success('Level Complete!');
      setTimeout(() => {
        updateLevel(next);
        setShowStory(true);
      }, 1500);
    }
  }, [cards, level, isLevelComplete, isGameOver]);

  const resetLevel = () => {
    if (!currentStory) return;
    const newCards: Card[] = [];
    currentStory.words.forEach((pair, i) => {
      newCards.push(
          { id: i * 2, french: pair.french, english: '', isFlipped: false, isMatched: false },
          { id: i * 2 + 1, french: '', english: pair.english, isFlipped: false, isMatched: false }
      );
    });
    setCards(newCards.sort(() => Math.random() - 0.5));
    setTimer(45);
    setSelectedCards([]);
    setIsGameOver(false);
    setIsLevelComplete(false);
    setIsPaused(false);
  };

  const handleCardClick = (card: Card) => {
    if (
        !currentStory ||
        isPaused ||
        card.isMatched ||
        selectedCards.length === 2 ||
        card.isFlipped ||
        isLevelComplete ||
        isGameOver
    ) return;

    // flip immediately
    setCards(prev => prev.map(c =>
        c.id === card.id ? { ...c, isFlipped: true } : c
    ));

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstCard, secondCard] = newSelected;
      if (!firstCard || !secondCard) return;

      const match = currentStory.words.some(pair =>
          (firstCard.french && secondCard.english && firstCard.french === pair.french && secondCard.english === pair.english) ||
          (firstCard.english && secondCard.french && firstCard.english === pair.english && secondCard.french === pair.french)
      );

      if (match) {
        // quick match reveal
        setTimeout(() => {
          setCards(prev =>
              prev.map(c =>
                  c.id === firstCard.id || c.id === secondCard.id
                      ? { ...c, isMatched: true, isFlipped: true }
                      : c
              )
          );
          updateScore(score + 100);
          setSelectedCards([]);
          toast.success('Match found!');
        }, 250);  // ↓ 250ms instead of 500ms
      } else {
        // quick mismatch flip‑back
        setTimeout(() => {
          setCards(prev =>
              prev.map(c =>
                  c.id === firstCard.id || c.id === secondCard.id
                      ? { ...c, isFlipped: false }
                      : c
              )
          );
          setSelectedCards([]);
        }, 300);  // ↓ 300ms instead of 1000ms
      }
    }
  };


  const handleMainMenu = () => {
    setShowMainMenu(true);
    setIsGameOver(false);
    resetGame();
    setIsPaused(false);
  };

  if (showMainMenu) {
    return <MainMenu onStartGame={() => setShowMainMenu(false)} onDashboard={() => navigate('/dashboard')} />;
  }

  if (isLoading) {
    return <LoadingScreen game="memory" facts={frenchFacts} />;
  }

  if (!currentStory) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-[#ffd700] text-xl">Failed to load content. Please refresh.</p>
        </div>
    );
  }

  return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {showStory ? (
            <StoryModal
                level={level}
                story={currentStory}
                onClose={() => {
                  setShowStory(false);
                  resetLevel();
                }}
            />
        ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 sm:space-y-8">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <GameHeader level={level} timer={timer} score={score} />
                <button onClick={togglePause} className="p-2 rounded-lg hover:bg-[#2b2b2b] transition-colors">
                  {isPaused ? <Play className="w-6 h-6 text-[#ffd700]" /> : <Pause className="w-6 h-6 text-[#ffd700]" />}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
                {cards.map((c) => (
                    <GameCard
                        key={c.id}
                        id={c.id}
                        content={c.french || c.english}
                        isFlipped={c.isFlipped}
                        isMatched={c.isMatched}
                        onClick={() => handleCardClick(c)}
                    />
                ))}
              </div>

              {isPaused && <PauseModal onResume={() => setIsPaused(false)} onMainMenu={handleMainMenu} onDashboard={() => navigate('/dashboard')} />}
              {isGameOver && <GameOverModal score={score} highScore={highScore} level={level} onRetry={() => { resetGame(); resetLevel(); }} />}
            </motion.div>
        )}
      </div>
  );
};

export default Game;

