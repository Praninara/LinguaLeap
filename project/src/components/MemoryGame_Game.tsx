// import { useState, useEffect } from 'react';
// import useKeypress from 'react-use-keypress';
// import { motion } from 'framer-motion';
// import { useGameStore } from '../stores/gameStore';
// import StoryModal from './StoryModal';
// import GameCard from './GameCard';
// import GameHeader from './GameHeader';
// import PauseModal from './PauseModal';
// import GameOverModal from './GameOverModal';
// import { WORD_PAIRS } from '../data/wordPairs';
// import toast from 'react-hot-toast';

// interface Card {
//   id: number;
//   french: string;
//   english: string;
//   isFlipped: boolean;
//   isMatched: boolean;
// }

// const Game = () => {
//   const { level, score, highScore, updateLevel, updateScore } = useGameStore();
//   const [cards, setCards] = useState<Card[]>([]);
//   const [selectedCards, setSelectedCards] = useState<Card[]>([]);
//   const [timer, setTimer] = useState(20);
//   const [isPaused, setIsPaused] = useState(false);
//   const [showStory, setShowStory] = useState(true);
//   const [isGameOver, setIsGameOver] = useState(false);

//   useKeypress(['Escape'], () => {
//     setIsPaused(!isPaused);
//     toast.success(isPaused ? 'Game Resumed' : 'Game Paused');
//   });

//   useEffect(() => {
//     if (!showStory && !isPaused && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [showStory, isPaused, timer]);

//   // useEffect(() => {
//   //   if (timer === 0) {
//   //     setIsGameOver(true);
//   //   }
//   // }, [timer]);
//   useEffect(() => {
//     if (cards.length > 0 && cards.every(card => card.isMatched)) {
//       toast.success('Level Complete!');
//       updateLevel(level + 1);
//       setShowStory(true);
//     }
//   }, [cards, level, updateLevel]);

//   const resetLevel = () => {
//     const newCards = generateCards(level);
//     setCards(newCards);
//     setTimer(20);
//     setSelectedCards([]);
//     setIsGameOver(false);
//   };

//   const generateCards = (level: number) => {
//     const pairs = WORD_PAIRS.slice(0, 3 + level);
//     const cards: Card[] = [];
    
//     pairs.forEach((pair, index) => {
//       cards.push(
//         { id: index * 2, french: pair.french, english: '', isFlipped: false, isMatched: false },
//         { id: index * 2 + 1, english: pair.english, french: '', isFlipped: false, isMatched: false }
//       );
//     });

//     return cards.sort(() => Math.random() - 0.5);
//   };

//   const handleCardClick = (card: Card) => {
//     if (isPaused || card.isMatched || selectedCards.length === 2 || card.isFlipped) return;

//     const newCards = cards.map((c) => 
//       c.id === card.id ? { ...c, isFlipped: true } : c
//     );
//     setCards(newCards);

//     setSelectedCards([...selectedCards, card]);

//     if (selectedCards.length === 1) {
//       const firstCard = selectedCards[0];
//       const secondCard = card;
//       const matchFound = WORD_PAIRS.some(pair => 
//         (firstCard.french && secondCard.english && firstCard.french === pair.french && secondCard.english === pair.english) ||
//         (firstCard.english && secondCard.french && firstCard.english === pair.english && secondCard.french === pair.french)
//       );

//       if (matchFound) {
//         // Match found
//         // setTimeout(() => {
//         //   setCards(cards.map((c) => 
//         //     c.id === firstCard.id || c.id === secondCard.id
//         //       ? { ...c, isMatched: true, isFlipped: true }
//         //       : c
//         //   ));
//         //   updateScore(score + 100);
//         //   setSelectedCards([]);

//         //   // Check if level complete
//         //   if (cards.every((c) => c.isMatched || (c.id === secondCard.id))) {
//         //     toast.success('Level Complete!');
//         //     updateLevel(level + 1);
//         //     setShowStory(true);
//         //   }
//         // }, 500);
//           setTimeout(() => {
//             const updatedCards = cards.map((c) => 
//               c.id === firstCard.id || c.id === secondCard.id
//                 ? { ...c, isMatched: true, isFlipped: true }
//                 : c
//             );
//             setCards(updatedCards);
//             updateScore(score + 100);
//             setSelectedCards([]);
//           }, 500);
//       } else {
//         // No match
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

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {showStory ? (
//         <StoryModal 
//           level={level} 
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
//           <GameHeader level={level} timer={timer} score={score} />

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

//           {isPaused && <PauseModal onResume={() => setIsPaused(false)} />}
//           {isGameOver && (
//             <GameOverModal 
//               score={score}
//               highScore={highScore}
//               level={level}
//               onRetry={() => {
//                 resetLevel();
//               }}
//             />
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Game;

// import { useState, useEffect } from 'react';
// import useKeypress from 'react-use-keypress';
// import { motion } from 'framer-motion';
// import { useGameStore } from '../stores/gameStore';
// import StoryModal from './StoryModal';
// import GameCard from './GameCard';
// import GameHeader from './GameHeader';
// import PauseModal from './PauseModal';
// import GameOverModal from './GameOverModal';
// import { WORD_PAIRS } from '../data/wordPairs';
// import toast from 'react-hot-toast';

// interface Card {
//   id: number;
//   french: string;
//   english: string;
//   isFlipped: boolean;
//   isMatched: boolean;
// }

// const Game = () => {
//   const { level, score, highScore, updateLevel, updateScore } = useGameStore();
//   const [cards, setCards] = useState<Card[]>([]);
//   const [selectedCards, setSelectedCards] = useState<Card[]>([]);
//   const [timer, setTimer] = useState(20);
//   const [isPaused, setIsPaused] = useState(false);
//   const [showStory, setShowStory] = useState(true);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [isLevelComplete, setIsLevelComplete] = useState(false);

//   // Handle pause/resume
//   const togglePause = () => {
//     setIsPaused(prev => !prev);
//   };

//   useKeypress(['Escape'], togglePause);

//   // Timer effect
//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval>;
    
//     if (!showStory && !isPaused && timer > 0 && !isLevelComplete) {
//       interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);
//     }
    
//     return () => clearInterval(interval);
//   }, [showStory, isPaused, timer, isLevelComplete]);

//   // Game over check
//   useEffect(() => {
//     if (timer === 0) {
//       setIsGameOver(true);
//     }
//   }, [timer]);

//   // Level completion check
//   useEffect(() => {
//     if (cards.length > 0 && !isLevelComplete && cards.every(card => card.isMatched)) {
//       setIsLevelComplete(true);
//       updateLevel(level + 1);
//       setShowStory(true);
//     }
//   }, [cards, level, updateLevel, isLevelComplete]);

//   // Pause/resume notifications
//   useEffect(() => {
//     if (!showStory && !isLevelComplete) {
//       toast.success(isPaused ? 'Game Paused' : 'Game Resumed');
//     }
//   }, [isPaused, showStory, isLevelComplete]);

//   const resetLevel = () => {
//     const newCards = generateCards(level);
//     setCards(newCards);
//     setTimer(20);
//     setSelectedCards([]);
//     setIsGameOver(false);
//     setIsLevelComplete(false);
//   };

//   const generateCards = (level: number) => {
//     const pairs = WORD_PAIRS.slice(0, 3 + level);
//     const cards: Card[] = [];
    
//     pairs.forEach((pair, index) => {
//       cards.push(
//         { id: index * 2, french: pair.french, english: '', isFlipped: false, isMatched: false },
//         { id: index * 2 + 1, english: pair.english, french: '', isFlipped: false, isMatched: false }
//       );
//     });

//     return cards.sort(() => Math.random() - 0.5);
//   };

//   const handleCardClick = (card: Card) => {
//     if (isPaused || card.isMatched || selectedCards.length === 2 || card.isFlipped || isLevelComplete) return;

//     const newCards = cards.map((c) => 
//       c.id === card.id ? { ...c, isFlipped: true } : c
//     );
//     setCards(newCards);

//     setSelectedCards([...selectedCards, card]);

//     if (selectedCards.length === 1) {
//       const firstCard = selectedCards[0];
//       const secondCard = card;
//       const matchFound = WORD_PAIRS.some(pair => 
//         (firstCard.french && secondCard.english && firstCard.french === pair.french && secondCard.english === pair.english) ||
//         (firstCard.english && secondCard.french && firstCard.english === pair.english && secondCard.french === pair.french)
//       );

//       if (matchFound) {
//         // Match found
//         setTimeout(() => {
//           const updatedCards = cards.map((c) => 
//             c.id === firstCard.id || c.id === secondCard.id
//               ? { ...c, isMatched: true, isFlipped: true }
//               : c
//           );
//           setCards(updatedCards);
//           updateScore(score + 100);
//           setSelectedCards([]);
//         }, 500);
//       } else {
//         // No match
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

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {showStory ? (
//         <StoryModal 
//           level={level} 
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
//           <GameHeader level={level} timer={timer} score={score} />

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

//           {isPaused && <PauseModal onResume={() => setIsPaused(false)} />}
//           {isGameOver && (
//             <GameOverModal 
//               score={score}
//               highScore={highScore}
//               level={level}
//               onRetry={() => {
//                 resetLevel();
//               }}
//             />
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Game;



import { useState, useEffect } from 'react';
import useKeypress from 'react-use-keypress';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import StoryModal from './StoryModal';
import GameCard from './GameCard';
import GameHeader from './GameHeader';
import PauseModal from './PauseModal';
import GameOverModal from './GameOverModal';
import { WORD_PAIRS } from '../data/wordPairs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
interface Card {
  id: number;
  french: string;
  english: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Define maximum level based on available word pairs
const MAX_LEVEL = Math.floor(WORD_PAIRS.length / 3);

const Game = () => {
  const { level, score, highScore, updateLevel, updateScore, resetGame } = useGameStore();
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [timer, setTimer] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    if (showStory) {
      resetLevel();
    }
  }, [level]);

  const togglePause = () => {
    if (!showStory && !isGameOver) {
      setIsPaused(prev => !prev);
      toast.success(!isPaused ? 'Game Paused' : 'Game Resumed');
    }
  };

  useKeypress(['Escape'], togglePause);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (!showStory && !isPaused && timer > 0 && !isLevelComplete && !isGameOver) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [showStory, isPaused, timer, isLevelComplete, isGameOver]);

  // Game over check
  useEffect(() => {
    if (timer === 0 && !showStory && !isGameOver) {
      setIsGameOver(true);
    }
  }, [timer, showStory]);

  // Level completion check
  useEffect(() => {
    if (cards.length > 0 && !isLevelComplete && !isGameOver && cards.every(card => card.isMatched)) {
      setIsLevelComplete(true);
      const nextLevel = Math.min(level + 1, MAX_LEVEL);
      
      if (nextLevel === MAX_LEVEL && level === MAX_LEVEL) {
        toast.success('Congratulations! You completed all levels!');
        setTimeout(() => {
          resetGame();
          setShowStory(true);
          navigate('/memoryGame');
        }, 1500);
      } else {
        toast.success('Level Complete!');
        setTimeout(() => {
          updateLevel(nextLevel);
          setShowStory(true);
        }, 1500);
      }
    }
  }, [cards, level, isLevelComplete, isGameOver]);

  const resetLevel = () => {
    const currentLevel = Math.min(Math.max(1, level), MAX_LEVEL);
    if (level !== currentLevel) {
      updateLevel(currentLevel);
    }
    
    const newCards = generateCards(currentLevel);
    setCards(newCards);
    setTimer(45);
    setSelectedCards([]);
    setIsGameOver(false);
    setIsLevelComplete(false);
    setIsPaused(false);
  };

  const generateCards = (currentLevel: number) => {
    const pairsCount = Math.min(3 + currentLevel - 1, WORD_PAIRS.length);
    const pairs = WORD_PAIRS.slice(0, pairsCount);
    const cards: Card[] = [];
    
    pairs.forEach((pair, index) => {
      cards.push(
        { id: index * 2, french: pair.french, english: '', isFlipped: false, isMatched: false },
        { id: index * 2 + 1, english: pair.english, french: '', isFlipped: false, isMatched: false }
      );
    });

    return cards.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (card: Card) => {
    if (isPaused || card.isMatched || selectedCards.length === 2 || card.isFlipped || isLevelComplete || isGameOver) return;

    const newCards = cards.map((c) => 
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1) {
      const firstCard = selectedCards[0];
      const secondCard = card;
      const matchFound = WORD_PAIRS.some(pair => 
        (firstCard.french && secondCard.english && firstCard.french === pair.french && secondCard.english === pair.english) ||
        (firstCard.english && secondCard.french && firstCard.english === pair.english && secondCard.french === pair.french)
      );

      if (matchFound) {
        setTimeout(() => {
          const updatedCards = cards.map((c) => 
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true, isFlipped: true }
              : c
          );
          setCards(updatedCards);
          updateScore(score + 100);
          setSelectedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(cards.map((c) => 
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c
          ));
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showStory ? (
        <StoryModal 
          level={level} 
          onClose={() => {
            setShowStory(false);
            resetLevel();
          }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <GameHeader level={level} timer={timer} score={score} />

          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <GameCard
                key={card.id}
                id={card.id}
                content={card.french || card.english}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>

          {isPaused && <PauseModal onResume={() => setIsPaused(false)} />}
          {isGameOver && (
            <GameOverModal 
              score={score}
              highScore={highScore}
              level={level}
              onRetry={() => {
                resetGame();
                resetLevel();
              }}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Game;