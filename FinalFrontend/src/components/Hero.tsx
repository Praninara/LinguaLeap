// import React from 'react';
// import { Sparkles, Star, Zap } from 'lucide-react';
//
// const Hero: React.FC = () => (
//   <div className="space-y-6">
//     <h1 className="text-4xl md:text-5xl font-pixel text-indigo-100 leading-tight">
//       Level Up Your
//       <span className="block text-green-400">Language Skills</span>
//     </h1>
//     <p className="text-lg text-indigo-200 font-pixel leading-relaxed">
//       Join our pixel-perfect language learning adventure! Gain XP, unlock achievements,
//       and master new languages through our gamified learning system.
//     </p>
//     <div className="flex flex-wrap gap-4 mt-8">
//       <div className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg border-2 border-indigo-600">
//         <Sparkles className="h-5 w-5 text-yellow-400" />
//         <span className="font-pixel text-indigo-100">Daily Quests</span>
//       </div>
//       <div className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg border-2 border-indigo-600">
//         <Star className="h-5 w-5 text-yellow-400" />
//         <span className="font-pixel text-indigo-100">Achievement System</span>
//       </div>
//       <div className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg border-2 border-indigo-600">
//         <Zap className="h-5 w-5 text-yellow-400" />
//         <span className="font-pixel text-indigo-100">Power-Ups</span>
//       </div>
//     </div>
//   </div>
// )
//
// export default Hero;

import React from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

const Hero: React.FC = () => (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-pixel text-indigo-100 leading-relaxed md:leading-tight">
            Level Up
            <span className="block text-green-400">Your</span>
            <span className="block text-green-400">Language Skills</span>
        </h1>
        <p className="text-sm md:text-lg text-indigo-200 font-pixel leading-relaxed max-w-xl">
            Join our pixel-perfect language learning adventure! Gain XP, unlock achievements,
            and master new languages through our gamified learning system.
        </p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4 md:mt-8">
            <div className="flex items-center space-x-2 bg-indigo-700 px-3 md:px-4 py-2 rounded-lg border-2 border-indigo-600">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                <span className="font-pixel text-xs md:text-sm text-indigo-100">Daily Quests</span>
            </div>
            <div className="flex items-center space-x-2 bg-indigo-700 px-3 md:px-4 py-2 rounded-lg border-2 border-indigo-600">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                <span className="font-pixel text-xs md:text-sm text-indigo-100">Achievement System</span>
            </div>
            <div className="flex items-center space-x-2 bg-indigo-700 px-3 md:px-4 py-2 rounded-lg border-2 border-indigo-600">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                <span className="font-pixel text-xs md:text-sm text-indigo-100">Power-Ups</span>
            </div>
        </div>
    </div>
)

export default Hero;