import React, { useState, useEffect } from "react";

// Custom hook to capture console logs
function useConsoleLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args) => {
      setLogs((prevLogs) => [...prevLogs, args.join(" ")]);
      originalLog(...args);
    };

    return () => {
      console.log = originalLog; // Reset console.log to its original functionality
    };
  }, []);

  return logs;
}

function Timer({ onTimerFinish }) {
  const [seconds, setSeconds] = useState(0);
  const [inputTime, setInputTime] = useState(25); // Default time is 25 minutes
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  // Using the custom hook to capture console logs
  const logs = useConsoleLogs();

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      alert("Time's Up!");
      setIsRunning(false);
      onTimerFinish(); // Notify parent component when timer finishes
      console.log("Time's up! Timer finished."); // Log to console
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
    console.log(`Timer started for ${inputTime} minutes`); // Log to console
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false); // Stop the timer when resetting
    console.log("Timer reset"); // Log to console
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

      {/* Timer display with nice formatting */}
      <h3>
        {Math.floor(seconds / 60)} : {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </h3>

      <div>
        {!isRunning && seconds === 0 && (
          <button onClick={startTimer}>
            Start Timer
          </button>
        )}
        <button onClick={resetTimer} disabled={isRunning}>
          Reset Timer
        </button>
      </div>

      {/* Display the console logs */}
      <div className="console-logs">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default Timer;
