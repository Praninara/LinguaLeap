import React, { useState } from 'react';
import '../css/LoginScreen.css';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Logged in with ${email}`);
  };

  return (
    <div className="pixel-container">
      <div className="pixel-login-box">
        <h1 className="pixel-title">Login</h1>
        <form onSubmit={handleLogin} className="pixel-form">
          <label htmlFor="email" className="pixel-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pixel-input"
          />
          <label htmlFor="password" className="pixel-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pixel-input"
          />
          <button type="submit" className="pixel-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
