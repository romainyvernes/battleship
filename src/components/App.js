import React, { useState } from 'react';
import '../styles/App.css';
import Game from '../logic/game';
import Setup from './Setup';
import Main from './Main';
import DialogBox from './DialogBox';

const App = () => {
  const [humanGrid, setHumanGrid] = useState(
    Game.humanBoard.grid.map((row) => [...row])
  );
  const [computerGrid, setComputerGrid] = useState(
    Game.computerBoard.grid.map((row) => [...row])
  );
  // state variable that indicates whether game is ongoing
  const [playStatus, setPlayStatus] = useState(true);
  // state variable that stores the index of the ship to place at start
  const [shipToPlaceIndex, setShipToPlaceIndex] = useState(0);
  // state variable that stores message to display in dialog box
  const [message, setMessage] = useState('');
  
  const onAttack = (e) => {
    const { id } = e.currentTarget;
    const { computerBoard, humanBoard, isGameOver, computer } = Game;

    computerBoard.receiveAttack(id.split('-'));
    setComputerGrid(computerBoard.grid.map((row) => [...row]));
    
    if (isGameOver()) {
      setPlayStatus(false);
      setMessage(Game.winner);
    } else {
      setMessage('The enemy is attacking !')
      setTimeout(() => {
        humanBoard.receiveAttack(computer.getAttackCoords());
        setHumanGrid(humanBoard.grid.map((row) => [...row]));
      }, 2000);
    }
  };

  const onPositionHover = (e) => {
    const { id, dataset } = e.currentTarget;
    const { getShipCoords, isTaken, isInRange, grid } = Game.humanBoard;
    const { shipsToPlace } = Game;
    const coords = getShipCoords(
      id.split('-'), 
      shipsToPlace[shipToPlaceIndex].length, 
      dataset.axis
    );
    
    if (isInRange(coords) && !isTaken(coords)) {
      coords.map(([x, y]) => grid[y][x] = true);
      setHumanGrid(grid.map((row) => [...row]));
    }
  };

  const onPositionOut = () => {
    const { grid } = Game.humanBoard;
    
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === true) {
          grid[i][j] = false;
        }
      }
    }

    setHumanGrid(grid.map((row) => [...row]));
  };

  const onPlaceShip = (e) => {
    const { id, dataset } = e.currentTarget;
    const { grid, addShip, getShipCoords, isTaken, isInRange } = Game.humanBoard;
    const { shipsToPlace } = Game; 
    const coords = getShipCoords(
      id.split('-'), 
      shipsToPlace[shipToPlaceIndex].length, 
      dataset.axis
    );
    
    if (isInRange(coords) && !isTaken(coords)) {
      addShip(coords);
      setShipToPlaceIndex(shipToPlaceIndex + 1);
      setHumanGrid(grid.map((row) => [...row]));
    }
  };

  return (
    <div className='app'>
      <DialogBox message={message} />
      {shipToPlaceIndex < Game.shipsToPlace.length
        ? <Setup 
            grid={humanGrid} 
            onPositionHover={onPositionHover} 
            onPositionOut={onPositionOut}
            onPlaceShip={onPlaceShip}
          />
        : <Main 
            humanGrid={humanGrid}
            computerGrid={computerGrid}
            onAttack={onAttack}
            playStatus={playStatus}
          />
      }
    </div>
  );
};

export default App;
