// src/App.js
import React, { useState } from 'react';
import './App.css';

import { mintNFT } from './solanaService';  // Import the service

function App() {
  const [isMinting, setIsMinting] = useState(false);

  const handleMintNFT = async () => {
    setIsMinting(true);
    await mintNFT();
    setIsMinting(false);
  };

  return (
    <div className="App">
      <h1>Focus Timer</h1>
      <button onClick={handleMintNFT} disabled={isMinting}>
        {isMinting ? 'Minting NFT...' : 'Mint NFT'}
      </button>
    </div>
  );
}

export default App;


