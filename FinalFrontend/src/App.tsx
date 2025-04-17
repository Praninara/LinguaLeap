import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Game from './components/MemoryGame_Game';
import Leaderboard from './components/MemoryGame_Leaderboard';
import Home from './components/Home';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import DinoGameScreen from './screens/DinoGameScreen';
import HomePage from './screens/Home';
import DashboardScreen from './screens/DashboardScreen';
import MultiplayerGame from './components/MultiplayerGame';
import AuthGuard from './components/AuthGuard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#2b2b2b] text-white pixel-font">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <AuthGuard>
              <DashboardScreen />
            </AuthGuard>
          } />
          <Route path="/dinoGame" element={
            <AuthGuard>
              <DinoGameScreen />
            </AuthGuard>
          } />
          <Route path="/login" element={<HomeScreen />} />
          <Route path="/memoryGame" element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          } />
          <Route path="/memoryGame/game" element={
            <AuthGuard>
              <Game />
            </AuthGuard>
          } />
          <Route path="/memoryGame/leaderboard" element={
            <AuthGuard>
              <Leaderboard />
            </AuthGuard>
          } />
          <Route path="/multiplayer" element={
            <AuthGuard>
              <MultiplayerGame />
            </AuthGuard>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;