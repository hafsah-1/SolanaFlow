import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);  // Track whether the timer is active

  useEffect(() => {
    let timer;
    if (seconds > 0 && isActive) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1);  // Decrement time
      }, 1000);
    } else if (seconds === 0 && isActive) {
      alert("Time's Up!");  // Alert when time is up
      setIsActive(false);  // Stop the timer after alert
    }

    return () => clearInterval(timer);  // Clear the interval when timer is stopped
  }, [seconds, isActive]);  // Watch for changes in seconds and active state

  // Start the timer
  const startTimer = () => {
    setIsActive(true);  // Set timer to active
    setSeconds(25);  // Start timer at 25 seconds
  };

  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);  // Stop the timer
    setSeconds(0);  // Reset seconds to 0
  };

  return (
    <div>
      <h2>{seconds} seconds</h2>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
}

export default Timer;
