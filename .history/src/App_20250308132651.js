import React, { useState } from 'react';
import './App.css';
import Timer from './Timer'; // Import Timer component
import { mintNFT } from './solanaService';  // Import minting function

function App() {
  const [isMinting, setIsMinting] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [mintStatus, setMintStatus] = useState('');

  const handleMintNFT = async () => {
    setIsMinting(true);
    setMintStatus('Minting in progress...');
    try {
      await mintNFT();
      setMintStatus('NFT Minted Successfully!');
    } catch (error) {
      setMintStatus('Minting Failed. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  const handleTimerFinish = () => {
    setIsTimerFinished(true);
  };

  const handleReset = () => {
    setIsTimerFinished(false);
    setMintStatus('');
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
        <p>Console log here...</p>
        {/* Add more logs as needed */}
      </div>
    </div>
  );
}

export default App;
