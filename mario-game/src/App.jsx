import React, { useState, useEffect } from "react";
import "./App.css"; // Add custom CSS styles

const App = () => {
  const [holes, setHoles] = useState(Array(9).fill(false)); // 9 holes (3x3 grid)
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Game lasts 30 seconds
  const [gameActive, setGameActive] = useState(false);

  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);

    // Randomly pop up moles every second
    const gameInterval = setInterval(() => {
      setHoles((prevHoles) =>
        prevHoles.map(() => Math.random() < 0.3) // Randomly set moles to true
      );
    }, 1000);

    // End the game after 30 seconds
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      setGameActive(false);
      setHoles(Array(9).fill(false)); // Clear all moles
    }, 30000);
  };

  // Whack the mole (increment score)
  const whackMole = (index) => {
    if (holes[index]) {
      setScore((prevScore) => prevScore + 1);
      setHoles((prevHoles) =>
        prevHoles.map((hole, i) => (i === index ? false : hole))
      );
    }
  };

  return (
    <div className="game-container">
      <h1>Whac-a-Mole!</h1>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>
      {!gameActive && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}
      <div className="holes-container">
        {holes.map((isMole, index) => (
          <div
            key={index}
            className={`hole ${isMole ? "mole" : ""}`}
            onClick={() => whackMole(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default App;
