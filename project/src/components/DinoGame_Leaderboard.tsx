// import React from 'react';
// import { LeaderboardEntry } from '../types';
// import { Trophy, Medal, Award } from 'lucide-react';
// import { mockLeaderboard } from '../data/questions';

// const Leaderboard: React.FC = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-xl p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <Trophy className="w-6 h-6 text-yellow-500" />
//         Leaderboard
//       </h2>
//       <div className="space-y-4">
//         {mockLeaderboard.map((entry, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//           >
//             <div className="flex items-center gap-3">
//               {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
//               {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
//               {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
//               {index > 2 && <Award className="w-6 h-6 text-blue-500" />}
//               <span className="font-medium text-gray-700">{entry.name}</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-500">Level {entry.level}</span>
//               <span className="font-semibold text-blue-600">{entry.score}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// import React from 'react';
// import { LeaderboardEntry } from '../types';
// import { Trophy, Medal, Award } from 'lucide-react';
// import { mockLeaderboard } from '../data/questions';

// const Leaderboard: React.FC = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <Trophy className="w-6 h-6 text-yellow-500" />
//         Leaderboard
//       </h2>
//       <div className="space-y-4">
//         {mockLeaderboard.map((entry, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg w-full"
//           >
//             <div className="flex items-center gap-3">
//               {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
//               {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
//               {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
//               {index > 2 && <Award className="w-6 h-6 text-blue-500" />}
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-700">{entry.name}</span>
//                 <span className="text-sm text-gray-500">Level {entry.level}</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="font-semibold text-blue-600 text-lg">{entry.score}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;

// import React from 'react';
// import { LeaderboardEntry } from '../types';
// import { Trophy, Medal, Award } from 'lucide-react';
// import { mockLeaderboard } from '../data/questions';

// const Leaderboard: React.FC = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <Trophy className="w-6 h-6 text-yellow-500" />
//         Leaderboard
//       </h2>
//       <div className="space-y-4">
//         {mockLeaderboard.map((entry, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//           >
//             <div className="flex items-center gap-3">
//               {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
//               {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
//               {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
//               {index > 2 && <Award className="w-6 h-6 text-blue-500" />}
//               <span className="font-medium text-gray-700">{entry.name}</span>
//               <span className="text-sm text-gray-500">Level {entry.level}</span>
//             </div>
//             <div className="flex items-center">
//               <span className="font-semibold text-blue-600 text-right">{entry.score}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;
// import React from 'react';
// import { LeaderboardEntry } from '../types';
// import { Trophy, Medal, Award } from 'lucide-react';
// import { mockLeaderboard } from '../data/questions';

// const Leaderboard: React.FC = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <Trophy className="w-6 h-6 text-yellow-500" />
//         Leaderboard
//       </h2>
//       <div className="space-y-4">
//         {mockLeaderboard.map((entry, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//           >
//             <div className="flex items-center gap-5">
//               {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
//               {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
//               {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
//               {index > 2 && <Award className="w-6 h-6 text-blue-500" />}
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-700">{entry.name}</span>
//                 <span className="text-sm text-gray-500">Level {entry.level}</span>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <span className="font-semibold text-blue-600 text-right">{entry.score}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


// import React from 'react';
// import { LeaderboardEntry } from '../types';
// import { Trophy, Medal, Award } from 'lucide-react';
// import { mockLeaderboard } from '../data/questions';

// const Leaderboard: React.FC = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <Trophy className="w-6 h-6 text-yellow-500" />
//         Leaderboard
//       </h2>
//       <div className="space-y-4">
//         {mockLeaderboard.map((entry, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//           >
//             <div className="flex items-center gap-5">
//               {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
//               {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
//               {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
//               {index > 2 && <Award className="w-6 h-6 text-blue-500" />}
//               <div className="flex flex-col items-center">
//                 <span className="font-medium text-gray-700">{entry.name}</span>
//                 <span className="text-sm text-gray-500">Level {entry.level}</span>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <span className="font-semibold text-blue-600 text-right">{entry.score}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


// import React from 'react';
// import { Trophy, Medal, Award } from 'lucide-react';
// import { mockLeaderboard } from '../data/questions';

// const Leaderboard: React.FC = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <Trophy className="w-6 h-6 text-yellow-500" />
//         Leaderboard
//       </h2>
//       <div className="space-y-4">
//         {mockLeaderboard.map((entry, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//           >
//             {/* Left Icon */}
//             <div className="flex items-center gap-5">
//               {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
//               {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
//               {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
//               {index > 2 && <Award className="w-6 h-6 text-blue-500" />}

//               {/* Player Info (Name & Level) */}
//               <div className="flex flex-col items-start">
//                 <span className="font-medium text-gray-700">{entry.name}</span>
//                 <span className="text-sm text-gray-500">Level {entry.level}</span>
//               </div>
//             </div>

//             {/* Score */}
//             <div className="flex items-center">
//               <span className="font-semibold text-blue-600 text-right">{entry.score}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { mockLeaderboard } from '../data/questions';

const Leaderboard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Leaderboard
      </h2>
      <div className="space-y-4">
        {mockLeaderboard.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            {/* Left Icon */}
            <div className="flex items-center gap-5">
              {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
              {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
              {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
              {index > 2 && <Award className="w-6 h-6 text-blue-500" />}

              {/* Player Info (Name & Level) */}
              <div className="flex flex-col items-start">
                <span className="font-medium text-gray-700">{entry.name}</span>
                <span className="text-sm text-gray-500 mt-1">Level {entry.level}</span>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center">
              <span className="font-semibold text-blue-600 text-right">{entry.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
