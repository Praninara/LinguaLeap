import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#2b2b2b] text-white pixel-font">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;