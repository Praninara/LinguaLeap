// // import { motion } from 'framer-motion';
// //
// // interface GameCardProps {
// //   id: number;
// //   content: string;
// //   isFlipped: boolean;
// //   isMatched: boolean;
// //   onClick: () => void;
// // }
// //
// // const GameCard = ({ content, isFlipped, onClick }: GameCardProps) => {
// //   return (
// //     <motion.div
// //       className={`game-card ${isFlipped ? 'flipped' : ''}
// //         bg-[#2a2a2a] rounded-lg p-4 cursor-pointer
// //         aspect-square flex items-center justify-center
// //         text-xl font-bold shadow-lg
// //         border-2 border-[#3a3a3a] hover:border-[#4a4a4a]`}
// //       onClick={onClick}
// //       whileHover={{ scale: 1.05 }}
// //       whileTap={{ scale: 0.95 }}
// //     >
// //       <div className="h-full flex items-center justify-center">
// //         {isFlipped ? content : '?'}
// //       </div>
// //     </motion.div>
// //   );
// // };
// //
// // export default GameCard;
// import { motion } from 'framer-motion';
//
// interface GameCardProps {
//   id: number;
//   content: string;
//   isFlipped: boolean;
//   isMatched: boolean;
//   onClick: () => void;
// }
//
// const GameCard = ({ content, isFlipped, onClick }: GameCardProps) => {
//   return (
//       <motion.div
//           className={`game-card ${isFlipped ? 'flipped' : ''}
//         bg-[#2a2a2a] rounded-lg p-2 md:p-4 cursor-pointer
//         aspect-square flex items-center justify-center
//         text-base md:text-xl font-bold shadow-lg
//         border-2 border-[#3a3a3a] hover:border-[#4a4a4a]
//         min-h-[60px] md:min-h-[100px]`}
//           onClick={onClick}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//       >
//         <div className="h-full w-full flex items-center justify-center">
//         <span className="text-sm md:text-base lg:text-xl">
//           {isFlipped ? content : '?'}
//         </span>
//         </div>
//       </motion.div>
//   );
// };
//
// export default GameCard;

import { motion } from 'framer-motion';

interface GameCardProps {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const GameCard = ({ content, isFlipped, onClick }: GameCardProps) => {
  return (
      <motion.div
          className={`
        game-card ${isFlipped ? 'flipped' : ''}
        bg-[#2a2a2a] rounded-lg
        p-2 sm:p-3 md:p-4 lg:p-6
        cursor-pointer
        aspect-square
        flex items-center justify-center
        text-sm sm:text-base md:text-lg lg:text-xl
        font-bold
        shadow-lg
        border-2 border-[#3a3a3a] hover:border-[#4a4a4a]
        min-h-[60px] md:min-h-[100px]
        transition-all
      `}
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
      >
      <span className="select-none">
        {isFlipped ? content : '?'}
      </span>
      </motion.div>
  );
};

export default GameCard;
