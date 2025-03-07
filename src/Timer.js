import React, { useState, useEffect } from 'react';
import { mintNFT } from './solanaMint';  // Import your mintNFT function

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);  // Timer for 25 minutes (for example)
  const [isActive, setIsActive] = useState(false);

  // Start the timer
  const startTimer = () => {
    setIsActive(true);
  };

  // Stop the timer
  const stopTimer = () => {
    setIsActive(false);
  };

  // Decrement time left every second
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      mintNFT();  // Call mintNFT when timer finishes
      setIsActive(false);  // Stop the timer once done
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  return (
    <div>
      <h2>Focus Timer</h2>
      <div>
        <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
        <button onClick={startTimer} disabled={isActive}>
          Start Timer
        </button>
        <button onClick={stopTimer} disabled={!isActive}>
          Stop Timer
        </button>
      </div>
    </div>
  );
};

export default Timer;

