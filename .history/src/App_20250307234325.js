import React, { useState } from 'react';
import './App.css';

import Timer from './Timer'; // Import the Timer component
import { mintNFT } from './solanaService';  // Import the minting function

function App() {
  const [isMinting, setIsMinting] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false); // Track if the timer is finished

  const handleMintNFT = async () => {
    setIsMinting(true);
    // Call the mintNFT function here (this can be handled with Solana integration)
    await mintNFT();
    setIsMinting(false);
  };

  const handleTimerFinish = () => {
    // Set timer finished state to true when timer finishes
    setIsTimerFinished(true);
  };

  return (
    <div className="App">
      <h1>Focus Timer</h1>

      <Timer onTimerFinish={handleTimerFinish} /> {/* Pass the function to Timer */}

      {/* Only show the Mint NFT button after the timer finishes */}
      {isTimerFinished && (
        <button onClick={handleMintNFT} disabled={isMinting}>
          {isMinting ? 'Minting NFT...' : 'Mint NFT'}
        </button>
      )}
    </div>
  );
}

export default App;
