import React, { useState } from 'react';
import '../App.css';  // Import the updated CSS

const QuantumSquaresGame = () => {
  // Initial grid size and state
  const [gridSize, setGridSize] = useState(5);  // Default 5x5 grid
  const [grid, setGrid] = useState(createGrid(5));  // Initialize 5x5 grid
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 for Player 1, 2 for Player 2
  const [playerScores, setPlayerScores] = useState({ 1: 0, 2: 0 });
  const winningScore = 10; // Winning score threshold

  // Function to create a new grid based on the size
  function createGrid(size) {
    return Array(size).fill(null).map(() =>
      Array(size).fill(null).map(() => ({
        particles: 0,
        owner: null
      }))
    );
  }

  // Collapse logic function
  const collapseSquare = (r, c) => {
    if (grid[r][c].particles >= 4) {
      const newGrid = [...grid];
      const particlesBeforeCollapse = newGrid[r][c].particles; // Capture the number of particles before collapsing

      // Reset particles and owner when collapsing
      newGrid[r][c].particles = 0;
      newGrid[r][c].owner = null;

      const adjacentPositions = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
      ];

      // Distribute particles to adjacent squares
      adjacentPositions.forEach(([adjR, adjC]) => {
        if (adjR >= 0 && adjR < gridSize && adjC >= 0 && adjC < gridSize) {
          newGrid[adjR][adjC].particles += 1;

          // Update owner if it's a neutral square, or if the current player takes over
          if (newGrid[adjR][adjC].owner === null || newGrid[adjR][adjC].owner !== currentPlayer) {
            newGrid[adjR][adjC].owner = currentPlayer;
          }

          // Check for adjacent collapses after updating particles
          if (newGrid[adjR][adjC].particles >= 4) {
            collapseSquare(adjR, adjC);  // Chain reaction for adjacent square collapse
          }
        }
      });

      setGrid(newGrid); // Update the grid state

      // Update score for the current player
      const newScore = { ...playerScores };
      newScore[currentPlayer] += particlesBeforeCollapse; // Add particles that collapsed to the score
      setPlayerScores(newScore);

      // Check for win condition
      checkWinCondition(newScore);
    }
  };

  // Function to handle player's move
  const handleMove = (r, c) => {
    if (grid[r][c].owner === null || grid[r][c].owner === currentPlayer) {
      const newGrid = [...grid];
      newGrid[r][c] = {
        particles: newGrid[r][c].particles + 1,
        owner: currentPlayer
      };

      setGrid(newGrid);  // Update grid state

      // Check for collapse after placing a particle
      collapseSquare(r, c);

      // Switch turn to the other player
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  // Check for win condition
  const checkWinCondition = (scores) => {
    if (scores[currentPlayer] >= winningScore) {
      alert(`Player ${currentPlayer} wins!`); // Alert the winner
      // Reset game logic if necessary
      setGrid(createGrid(gridSize)); // Reset grid
      setPlayerScores({ 1: 0, 2: 0 }); // Reset scores
      setCurrentPlayer(1); // Reset current player to Player 1
    }
  };

  // Handle grid size change
  const handleGridSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    if (newSize > 0) {
      setGridSize(newSize);
      setGrid(createGrid(newSize)); // Update the grid size dynamically
      setPlayerScores({ 1: 0, 2: 0 }); // Reset scores
    }
  };

  return (
    <div>
      <h1>Quantum Squares</h1>
      <h2>Player 1 Score: {playerScores[1]} | Player 2 Score: {playerScores[2]}</h2>
      <h3>Current Player: Player {currentPlayer}</h3>

      <div>
        <label>Grid Size: </label>
        <input
          type="number"
          value={gridSize}
          onChange={handleGridSizeChange}
          min="3"  // Set a minimum grid size (e.g., 3x3)
        />
      </div>

      <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {grid.map((row, r) =>
          row.map((square, c) => (
            <div
              key={`${r}-${c}`}
              className="square"
              onClick={() => handleMove(r, c)}
              style={{
                backgroundColor: square.particles === 0 ? 'white' : (square.owner === 1 ? 'red' : square.owner === 2 ? 'blue' : 'white'),
                color: square.particles !== 0 ? 'white' : 'black'
              }}
            >
              {square.particles}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuantumSquaresGame;