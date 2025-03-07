import React from "react";
import "./App.css";
import Timer from "./Timer";  // Import the Timer component

function App() {
  return (
    <div className="App">
      <h1>Focus Timer</h1>
      {/* Include the Timer component */}
      <Timer />
    </div>
  );
}

export default App;
