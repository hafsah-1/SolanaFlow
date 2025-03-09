import React, { useState, useEffect } from "react"; // Only one import statement
import { mintNFT } from "./solana";  // Import the NFT minting function

function Timer() {
  const [seconds, setSeconds] = useState(0); // Store seconds for countdown
  const [inputTime, setInputTime] = useState(25); // Default time in minutes
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      // Start the timer countdown when it's running
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      // When timer reaches 0, stop it and trigger minting NFT
      alert("Time's Up!");
      mintNFT();  // Trigger NFT minting when time is up
      setIsRunning(false);
    }

    return () => clearInterval(timer); // Cleanup the interval when the component unmounts or timer stops
  }, [seconds, isRunning]); // Dependency array to run the effect when seconds or isRunning change

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
    setSeconds(0);  // Reset the timer to 0
    setIsRunning(false); // Stop the timer
  };

  return (
    <div className="timer-container">
      <div>
        <input
          type="number"
          value={inputTime}
          onChange={handleInputChange}
          min="1"
        />
        <label>minutes</label>
      </div>

      {/* Timer display */}
      <h3>
        {Math.floor(seconds / 60)} : {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </h3>

      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start Timer
        </button>
        <button onClick={resetTimer} disabled={!isRunning}>
          Stop Timer
        </button>
      </div>
    </div>
  );
};

export default Timer;
