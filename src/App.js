import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Timer from './Timer';
import { mintNFT } from './solanaService';
import './App.css';
import logo from './logo.svg';

function HomePage() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="homepage neon-border">
      <img src={logo} alt="SolanaFlow Logo" className="logo" />
      <h1 className="solanaflow-title">SolanaFlow</h1>
      <div className="button-container">
        <Link to="timer" className="neon-button">Start Focus Session</Link>
        <Link to="friends" className="neon-button">Friends</Link>
        <Link to="leaderboard" className="neon-button">Leaderboard</Link>
        <button className="neon-button" onClick={() => setShowProfile(true)}>User Profile</button>
      </div>

      {/* User Profile Popup */}
      {showProfile && (
        <div className="profile-popup">
          <div className="profile-content">
            <h2>User Profile</h2>
            <p><strong>Wallet Address:</strong> (Your Solana Address Here)</p>
            <p><strong>Balance:</strong> 0.00 SOL</p>
            <p><strong>Sessions Completed:</strong> 10</p>
            <button className="neon-button" onClick={() => setShowProfile(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FriendsPage() {
  return (
    <div className="friends-page">
      <h2>Friends</h2>
      <p>Feature coming soon!</p>
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
}

function LeaderboardPage() {
  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>
      <p>Feature coming soon!</p>
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
}

function TimerPage() {
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
    <div className="timer-page">
      <Link to="/" className="back-button">Back to Home</Link>
      <h2>Focus Timer</h2>
      <Timer onTimerFinish={handleTimerFinish} />

      {isTimerFinished && !isMinting && !mintStatus && (
        <button className="neon-button" onClick={handleMintNFT}>Mint NFT</button>
      )}

      {mintStatus && (
        <div className="mint-status">
          <p>{mintStatus}</p>
        </div>
      )}

      {mintStatus && (
        <button className="neon-button" onClick={handleReset}>Start New Timer</button>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="timer" element={<TimerPage />} />
      <Route path="friends" element={<FriendsPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
    </Routes>
  );
}

export default App;
