import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Game from './components/MemoryGame_Game';
import Leaderboard from './components/MemoryGame_Leaderboard';
import Home from './components/Home';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import DinoGameScreen from './screens/DinoGameScreen';
import HomePage from './screens/Home';
import DashboardScreen from './screens/DashboardScreen';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#2b2b2b] text-white pixel-font">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/dinoGame" element={<DinoGameScreen />} />
          <Route path="/login" element={<HomeScreen />} />
          <Route path="/memoryGame" element={<Home />} />
          <Route path="/memoryGame/game" element={<Game />} />
          <Route path="/memoryGame/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
