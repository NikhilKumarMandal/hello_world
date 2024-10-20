import React, { useState } from 'react';
import '../App.css';  

const QuantumSquaresGame = () => {
  const [gridSize, setGridSize] = useState(5);  
  const [grid, setGrid] = useState(createGrid(5));  
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerScores, setPlayerScores] = useState({ 1: 0, 2: 0 });
  const winningScore = 10;


  function createGrid(size) {
    return Array(size).fill(null).map(() =>
      Array(size).fill(null).map(() => ({
        particles: 0,
        owner: null
      }))
    );
  }


  const collapseSquare = (r, c) => {
    if (grid[r][c].particles >= 4) {
      const newGrid = [...grid];
      const particlesBeforeCollapse = newGrid[r][c].particles; // 
      newGrid[r][c].particles = 0;
      newGrid[r][c].owner = null;

      const adjacentPositions = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
      ];

      adjacentPositions.forEach(([adjR, adjC]) => {
        if (adjR >= 0 && adjR < gridSize && adjC >= 0 && adjC < gridSize) {
          newGrid[adjR][adjC].particles += 1;

          
          if (newGrid[adjR][adjC].owner === null || newGrid[adjR][adjC].owner !== currentPlayer) {
            newGrid[adjR][adjC].owner = currentPlayer;
          }

          
          if (newGrid[adjR][adjC].particles >= 4) {
            collapseSquare(adjR, adjC);  
          }
        }
      });

      setGrid(newGrid); 


      const newScore = { ...playerScores };
      newScore[currentPlayer] += particlesBeforeCollapse; 
      setPlayerScores(newScore);

      checkWinCondition(newScore);
    }
  };

  const handleMove = (r, c) => {
    if (grid[r][c].owner === null || grid[r][c].owner === currentPlayer) {
      const newGrid = [...grid];
      newGrid[r][c] = {
        particles: newGrid[r][c].particles + 1,
        owner: currentPlayer
      };

      setGrid(newGrid);  
      collapseSquare(r, c);

      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };
  const checkWinCondition = (scores) => {
    if (scores[currentPlayer] >= winningScore) {
      alert(`Player ${currentPlayer} wins!`); 
      resetGame();  
    }
  };


  const handleGridSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    if (newSize > 0) {
      setGridSize(newSize);
      setGrid(createGrid(newSize)); 
      setPlayerScores({ 1: 0, 2: 0 }); 
    }
  };


  const resetGame = () => {
    setGrid(createGrid(gridSize));
    setPlayerScores({ 1: 0, 2: 0 }); 
    setCurrentPlayer(1); 
  };

  return (
    <div>
      <h1 className='bg'>Quantum Squares</h1>
      <h2>Player 1 Score: {playerScores[1]} | Player 2 Score: {playerScores[2]}</h2>
      <h3>Current Player: Player {currentPlayer}</h3>

      <div className='hello-win'>
        <label>Grid Size: </label>
        <input
          className='label'
          type="number"
          value={gridSize}
          onChange={handleGridSizeChange}
          min="3" 
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
      <button onClick={resetGame} style={{ margin: '10px', padding: '10px', backgroundColor: '#ff6347', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
        Reset Game
      </button>
    </div>
  );
};

export default QuantumSquaresGame;
