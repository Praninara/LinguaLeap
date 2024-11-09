import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar1: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => (
  <nav className="flex justify-between items-center mb-16 px-6 py-4 bg-indigo-900 border-b-4 border-indigo-700">
    <div className="flex items-center space-x-2">
      <Gamepad2 className="h-8 w-8 text-green-400" />
      <span className="text-2xl font-bold text-green-400 font-pixel">LinguaLeap</span>
    </div>
    <div className="flex space-x-4">
      <button
        onClick={onLoginClick}
        className="px-6 py-2 bg-green-400 text-indigo-900 font-pixel border-b-4 border-green-600 hover:bg-green-500 active:border-b-0 active:mt-1 transition-all"
      >
        Login
      </button>
      <button
        onClick={onSignupClick}
        className="px-6 py-2 bg-yellow-400 text-indigo-900 font-pixel border-b-4 border-yellow-600 hover:bg-yellow-500 active:border-b-0 active:mt-1 transition-all"
      >
        Sign Up
      </button>
    </div>
  </nav>
)

export default Navbar1;