import React from 'react';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Game />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;