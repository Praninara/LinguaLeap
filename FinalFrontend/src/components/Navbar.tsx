import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span role="img" aria-label="game-controller">🎮</span> Pixel Lingo
      </div>
      <button className="profile-button">Profile</button>
    </nav>
  );
};

export default Navbar;
