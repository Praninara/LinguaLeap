import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { UserData } from '../screens/Home';

interface AuthCardProps {
  activePanel: 'none' | 'login' | 'signup';
  formData: UserData;
  onFormChange: (data: Partial<UserData>) => void;
  onLogin: (e: React.FormEvent) => void;
  onSignup: (e: React.FormEvent) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  activePanel,
  formData,
  onFormChange,
  onLogin,
  onSignup,
}) => {
  const inputClass = "pl-10 w-full bg-indigo-100 rounded-lg border-2 border-indigo-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 font-pixel";
  const labelClass = "block text-sm font-pixel text-indigo-200 mb-1";
  const iconClass = "absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5";

  return (
    <div className="">
      {/* Login Panel */}
      <div className={`space-y-4 ${activePanel === 'login' ? 'block' : 'hidden'}`}>
        <h2 className="text-2xl font-pixel text-green-400">Player Login</h2>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label className={labelClass}>Email</label>
            <div className="mt-1 relative">
              <Mail className={iconClass} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onFormChange({ email: e.target.value })}
                className={inputClass}
                placeholder="Enter your email"
                style={{color:'black'}}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <div className="mt-1 relative">
              <Lock className={iconClass} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => onFormChange({ password: e.target.value })}
                className={inputClass}
                placeholder="Enter your password"
                style={{color:'black'}}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-indigo-900 rounded-lg px-4 py-2 font-pixel border-b-4 border-green-600 hover:bg-green-500 active:border-b-0 active:mt-1 transition-all"
          >
            Start Adventure
          </button>
        </form>
      </div>

      {/* Signup Panel */}
      <div className={`space-y-4 ${activePanel === 'signup' ? 'block' : 'hidden'}`}>
        <h2 className="text-2xl font-pixel text-yellow-400">New Player</h2>
        <form onSubmit={onSignup} className="space-y-4">
          <div>
            <label className={labelClass}>Character Name</label>
            <div className="mt-1 relative">
              <User className={iconClass} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onFormChange({ name: e.target.value })}
                className={inputClass}
                placeholder="Enter your name"
                style={{color:'black'}}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <div className="mt-1 relative">
              <Mail className={iconClass} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onFormChange({ email: e.target.value })}
                className={inputClass}
                placeholder="Enter your email"
                style={{color:'black'}}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <div className="mt-1 relative">
              <Lock className={iconClass} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => onFormChange({ password: e.target.value })}
                className={inputClass}
                placeholder="Create a password"
                style={{color:'black'}}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-indigo-900 rounded-lg px-4 py-2 font-pixel border-b-4 border-yellow-600 hover:bg-yellow-500 active:border-b-0 active:mt-1 transition-all"
          >
            Create Character
          </button>
        </form>
      </div>

      {/* Default State */}
      {/* <div className={`text-center ${activePanel === 'none' ? 'block' : 'hidden'}`}>
        <div className="font-pixel text-indigo-200 animate-pulse">
          Press Start
        </div>
      </div> */}
    </div>
  );
};

export default AuthCard;