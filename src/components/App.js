import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (shipToPlaceIndex < Game.shipsToPlace.length) {
      setMessage(`Admiral, where shall we place our ${
        Game.shipsToPlace[shipToPlaceIndex].name
      } ?`);
    } else {
      setMessage('Admiral, what are your next orders ?');
    }
  }, [shipToPlaceIndex]);
  
  const handleAttackMessages = (attackObj, player) => {
    let newMessage = '';

    if (player === 'human') {
      newMessage += 'Our fleet is firing at the enemy';
    } else {
      newMessage += 'The enemy is firing';
    }

    const { message, ship } = attackObj;

    if (message === 'miss') {
      newMessage += '...but missed';
    }

    if (message === 'already hit') {
      newMessage += '...but already hit this position';
    }

    if (message === 'hit') {
      if (ship.isSunk()) {
        newMessage += `...and sank a ${ship.name}`;
      } else {
        newMessage += '...and struck a ship';
      }
    }

    setMessage(newMessage);
  };
  
  const onAttack = (e) => {
    const { id } = e.currentTarget;
    const { computerBoard, humanBoard, isGameOver, computer } = Game;
    
    // trigger attack on computer and pass in result to handleAttackMessages
    handleAttackMessages(
      computerBoard.receiveAttack(id.split('-')), 
      'human'
    );
    
    // update computerGrid to trigger new render in Main
    setComputerGrid(computerBoard.grid.map((row) => [...row]));
    
    if (isGameOver()) {
      // disable game so player can no longer attack computer
      setPlayStatus(false);

      // display winning message for player or computer
      if (humanBoard.isGameOver()) {
        setMessage('We\'ve lost this battle, Admiral');
      } else {
        setMessage('We have defeated the enemy !');
      }
    } else {
      setPlayStatus(false); // disable attack function for player
      setTimeout(() => {
        handleAttackMessages(
          humanBoard.receiveAttack(computer.getAttackCoords()),
          'computer'
        );
        setHumanGrid(humanBoard.grid.map((row) => [...row]));
        setPlayStatus(true); // reenable attack function once computer has played
      }, 5000);
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
      addShip(coords, shipsToPlace[shipToPlaceIndex].name);
      setShipToPlaceIndex(shipToPlaceIndex + 1);
      setHumanGrid(grid.map((row) => [...row]));
    }
  };

  const resetGame = () => {
    window.location.reload();
  };
  
  return (
    <div className='app'>
      <h1>BATTLESHIP</h1>
      <DialogBox message={message} />
      <button 
        type='submit' 
        onClick={resetGame} 
        id='restart-btn' 
        className={
          !Game.isGameOver() ||
          shipToPlaceIndex < Game.shipsToPlace.length
          ? 'hide-restart' 
          : ''
        }
      >
        Ready for another battle ?
      </button>
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
