import React, { useState } from 'react';
import './App.css';

import Timer from './Timer'; // Import the Timer component
import { mintNFT } from './solanaService';  // Import the minting function

function App() {
  const [isMinting, setIsMinting] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false); // Track if the timer is finished
  const [mintStatus, setMintStatus] = useState(''); // Track minting status

  const handleMintNFT = async () => {
    setIsMinting(true);
    setMintStatus('Minting in progress...');
    try {
      // Call the mintNFT function here (this can be handled with Solana integration)
      await mintNFT();
      setMintStatus('NFT Minted Successfully!');
    } catch (error) {
      setMintStatus('Minting Failed. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  const handleTimerFinish = () => {
    // Set timer finished state to true when timer finishes
    setIsTimerFinished(true);
  };

  const handleReset = () => {
    setIsTimerFinished(false); // Reset the timer finish state
    setMintStatus(''); // Reset minting status
  };

  return (
    <div className="App">
      {/* Profile Section */}
      <div className="profile">
        <h3>Profile</h3>
        <p>Wallet Info</p>
        <p>Number of NFTs minted: 5</p>
        {/* Add popup or more information here */}
      </div>

      {/* Timer Section */}
      <div className="timer">
        <Timer onTimerFinish={handleTimerFinish} /> {/* Pass the function to Timer */}

        {/* Only show the Mint NFT button after the timer finishes */}
        {isTimerFinished && !isMinting && !mintStatus && (
          <button onClick={handleMintNFT}>
            Mint NFT
          </button>
        )}

        {/* Show minting status and logs */}
        {mintStatus && (
          <div className="mint-status">
            <p>{mintStatus}</p>
          </div>
        )}

        {/* Reset button to start the timer and minting process again */}
        {mintStatus && (
          <button onClick={handleReset}>
            Start New Timer
          </button>
        )}
      </div>

      {/* Console Log Section */}
      <div className="console-logs">
        <h3></h3>
        <p>Timer started...</p>
        {/* Add more console log outputs here */}
      </div>
    </div>
  );
}

export default App;
