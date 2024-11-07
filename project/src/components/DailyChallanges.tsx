// DailyChallenges.jsx
import React from "react";
import "../css/DailyChallanges.css";

const DailyChallenges = () => {
  return (
    <div className="daily-challenges">
      <h2>Today's Lessons</h2>
      <div className="lessons">
        <div className="lesson">
          <p>Basic Greetings</p>
          <span>⭐ 50 XP</span>
        </div>
        <div className="lesson">
          <p>Numbers 1-10</p>
          <span>⭐ 75 XP</span>
        </div>
        <div className="lesson">
          <p>Common Phrases</p>
          <span>⭐ 100 XP</span>
        </div>
      </div>
      <button className="start-challenge">Start Daily Challenge</button>
    </div>
  );
};

export default DailyChallenges;
