import React, { useState, useEffect } from 'react';
import './App.css';
import Timer from './Timer'; // Import Timer component
import { mintNFT } from './solanaService';  // Import minting function

function App() {
  const [isMinting, setIsMinting] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [mintStatus, setMintStatus] = useState('');
  const [consoleMessages, setConsoleMessages] = useState([]); // To store console log messages

  const handleMintNFT = async () => {
    setIsMinting(true);
    setMintStatus('Minting in progress...');
    setConsoleMessages((prevLogs) => [...prevLogs, 'Minting in progress...']);
    try {
      await mintNFT();
      setMintStatus('NFT Minted Successfully!');
      setConsoleMessages((prevLogs) => [...prevLogs, 'NFT Minted Successfully!']);
    } catch (error) {
      setMintStatus('Minting Failed. Please try again.');
      setConsoleMessages((prevLogs) => [...prevLogs, 'Minting Failed. Please try again.']);
    } finally {
      setIsMinting(false);
    }
  };

  const handleTimerFinish = () => {
    setIsTimerFinished(true);
    setConsoleMessages((prevLogs) => [...prevLogs, 'Timer Finished']);
  };

  const handleReset = () => {
    setIsTimerFinished(false);
    setMintStatus('');
    setConsoleMessages((prevLogs) => [...prevLogs, 'Timer Reset']);
  };

  return (
    <div className="App">
      {/* Profile Section */}
      <div className="profile">
        <button onClick={() => alert("Profile Info Here")}>Profile</button>
      </div>

      {/* Timer Section */}
      <div className="timer">
        <Timer onTimerFinish={handleTimerFinish} />

        {isTimerFinished && !isMinting && !mintStatus && (
          <button onClick={handleMintNFT}>Mint NFT</button>
        )}

        {mintStatus && (
          <div className="mint-status">
            <p>{mintStatus}</p>
          </div>
        )}

        {mintStatus && (
          <button onClick={handleReset}>Start New Timer</button>
        )}
      </div>

      {/* Console Section */}
      <div className="console-logs">
        {consoleMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
