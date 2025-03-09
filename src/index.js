import React from 'react';
import ReactDOM from 'react-dom/client';  // ✅ Correct import for React 18
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // ✅ Use createRoot()
root.render(
  <BrowserRouter basename="/Focus-timer-web3">  {/* ✅ Add basename */}
    <App />
  </BrowserRouter>
);
