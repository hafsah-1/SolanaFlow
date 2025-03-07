import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Your main App component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Use the root element correctly
root.render(
  <App />  // Remove StrictMode temporarily (no need for inline comment here)
);

reportWebVitals();  // Optional: You can remove this for now if not needed
