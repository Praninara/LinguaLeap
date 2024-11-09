import React from 'react';
import '../css/Statistics.css';

const Statistics = () => {
  return (
    <div className="statistics">
      <div className="stat-item">
        <span role="img" aria-label="streak" className="stat-icon">🔥</span>
        <div className="stat-text">
          <span className="stat-value">5 days</span>
          <span className="stat-label">Streak</span>
        </div>
      </div>
      <div className="stat-item">
        <span role="img" aria-label="xp" className="stat-icon">⭐</span>
        <div className="stat-text">
          <span className="stat-value">325</span>
          <span className="stat-label">XP</span>
        </div>
      </div>
      <div className="stat-item">
        <span role="img" aria-label="level" className="stat-icon">🏆</span>
        <div className="stat-text">
          <span className="stat-value">3</span>
          <span className="stat-label">Level</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
