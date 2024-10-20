# Team Hello World

# Quantum Squares Game

Welcome to **Quantum Squares Game**, a dynamic and strategic two-player game where players take turns adding particles to squares on a grid. When a square reaches critical mass, it "collapses," spreading its particles to neighboring squares. Players aim to dominate the board by owning more squares and achieving the winning score. 

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Game Rules](#game-rules)
- [How to Play](#how-to-play)
- [Customization](#customization)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

**[Play Quantum Squares Online](#)** <!-- Add your deployment link here -->

![Game Screenshot](path-to-your-screenshot) <!-- Add a screenshot of your game -->

---

## Features

- 🎮 Two-player gameplay with alternating turns.
- ⚛️ Quantum mechanics-like particle spreading upon collapse.
- 🏆 Win by reaching the designated score threshold.
- 📏 Adjustable grid size for customized play.
- 🎶 Sound effects for winning moments.
- 💥 Particle collapse system for exciting chain reactions.

---

## Installation

Follow the steps below to install and run the project locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/quantum-squares-game.git
    ```
2. **Navigate into the project directory:**
    ```bash
    cd quantum-squares-game
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Run the application:**
    ```bash
    npm start
    ```
5. **Open the game in your browser:**
    ```
    http://localhost:3000
    ```

---

## Game Rules

- Players take turns adding particles to squares on the grid.
- Each square has a limit of 4 particles. When a square reaches the limit, it "collapses," spreading particles to adjacent squares.
- A square can only be occupied by one player. If it collapses, the owner of the adjacent squares can change.
- The player to reach the winning score first wins the game.

---

## How to Play

1. Start the game by clicking on any square. The current player’s particles will be added to the square.
2. Continue adding particles, but once a square reaches 4 particles, it will collapse, distributing particles to adjacent squares.
3. Win the game by achieving the required score (default: 10 points).

---

## Customization

You can easily customize the game settings:

- **Grid Size:** You can change the grid size by adjusting the input box labeled "Grid Size".
- **Winning Score:** Modify the `winningScore` constant in the game logic.

---

## Technologies Used

- **React.js**: Frontend library used for building the interactive UI.
- **HTML5 & CSS3**: Structure and styling of the game.
- **JavaScript (ES6+)**: Game logic and functionality.
- **Audio Integration**: Added sound effects when a player wins.

---




