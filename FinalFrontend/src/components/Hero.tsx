import React from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

const Hero: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-4xl md:text-5xl font-pixel text-indigo-100 leading-tight">
      Level Up Your
      <span className="block text-green-400">Language Skills</span>
    </h1>
    <p className="text-lg text-indigo-200 font-pixel leading-relaxed">
      Join our pixel-perfect language learning adventure! Gain XP, unlock achievements, 
      and master new languages through our gamified learning system.
    </p>
    <div className="flex flex-wrap gap-4 mt-8">
      <div className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg border-2 border-indigo-600">
        <Sparkles className="h-5 w-5 text-yellow-400" />
        <span className="font-pixel text-indigo-100">Daily Quests</span>
      </div>
      <div className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg border-2 border-indigo-600">
        <Star className="h-5 w-5 text-yellow-400" />
        <span className="font-pixel text-indigo-100">Achievement System</span>
      </div>
      <div className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg border-2 border-indigo-600">
        <Zap className="h-5 w-5 text-yellow-400" />
        <span className="font-pixel text-indigo-100">Power-Ups</span>
      </div>
    </div>
  </div>
)

export default Hero;