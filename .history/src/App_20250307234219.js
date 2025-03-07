import React, { useState } from 'react';
import './App.css';

import Timer from './Timer'; // Import the Timer component
import { mintNFT } from './solanaService';  // Import the minting function

function App() {
  const [isMinting, setIsMinting] = useState(false);

  const handleMintNFT = async () => {
    setIsMinting(true);
    // Call the mintNFT function here (this can be handled with Solana integration)
    await mintNFT();
    setIsMinting(false);
  };

  const handleTimerFinish = () => {
    // This function will be called when the timer finishes
    console.log("Timer finished! You can now mint your NFT.");
  };

  return (
    <div className="App">
      <h1>Focus Timer</h1>

      <Timer onTimerFinish={handleTimerFinish} /> {/* Pass the function to Timer */}

      <div>
        {/* Display the Mint NFT button when timer finishes */}
        <button onClick={handleMintNFT} disabled={isMinting}>
          {isMinting ? 'Minting NFT...' : 'Mint NFT'}
        </button>
      </div>
    </div>
  );
}

export default App;
