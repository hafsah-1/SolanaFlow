import React, { useState, useEffect } from "react";

function Timer({ onTimerFinish }) {  // Accept a prop to notify when the timer finishes
  const [seconds, setSeconds] = useState(0);
  const [inputTime, setInputTime] = useState(25); // Default time is 25 minutes
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  useEffect(() => {
    let timer;
    
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      alert("Time's Up!");
      setIsRunning(false);
      onTimerFinish();  // Notify parent component when timer finishes
    }

    return () => clearInterval(timer);
  }, [seconds, isRunning, onTimerFinish]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value > 0) {
      setInputTime(value); // Update input time in minutes
    }
  };

  const startTimer = () => {
    setSeconds(inputTime * 60); // Convert minutes to seconds
    setIsRunning(true); // Start the timer
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false); // Stop the timer when resetting
  };

  return (
    <div className="timer-container">
      <div className="timer">
        <h3>
          {Math.floor(seconds / 60)}:
          {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
        </h3>
        <div className="preset-buttons">
          {presetTimes.map((time) => (
            <button
              key={time}
              onClick={() => startTimer(time)}
              disabled={isRunning}
            >
              {time} min
            </button>
          ))}
        </div>
        <div className="controls">
          {canMint && <button onClick={mintNFT}>Mint NFT</button>}
          <button onClick={resetTimer}>Reset Timer</button>
        </div>
      </div>

      <div className="console-terminal">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default Timer;
