import React, { useState, useEffect } from "react";

function Timer({ onMintNFT }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [canMint, setCanMint] = useState(false);
  const [logs, setLogs] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  // Preset times for the timer
  const presetTimes = [1, 15, 30, 60, 120, 300]; // 1 min, 15 min, 30 min, 1 hr, 2 hr, 5 hr

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      setCanMint(true);
      setLogs((prev) => [...prev, "Time's Up! You can mint an NFT now."]);
    }
    return () => clearInterval(timer);
  }, [seconds, isRunning]);

  const startTimer = (time) => {
    setSeconds(time * 60); // Convert minutes to seconds
    setSelectedTime(time); // Store the selected time
    setIsRunning(true); // Start the timer
    setCanMint(false); // Hide the mint button until time is up
    setLogs((prev) => [...prev, `Timer started for ${time} minutes.`]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0); // Reset seconds
    setCanMint(false);
    setLogs((prev) => [...prev, "Timer reset."]);
  };

  const mintNFT = async () => {
    if (!selectedTime) return;
    setCanMint(false);
    setLogs((prev) => [...prev, `Minting NFT for ${selectedTime} minutes...`]);
    try {
      // Call the mintNFT function with the selected timer duration
      await onMintNFT(selectedTime); 
      setLogs((prev) => [...prev, `Minted ${selectedTime}-minute NFT successfully!`]);
    } catch (error) {
      setLogs((prev) => [...prev, "Minting NFT in progress..."]);
    }
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

      <div className="console-logs">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default Timer;
