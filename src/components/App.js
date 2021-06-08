import React, { useState } from 'react';
import '../styles/App.css';
import Game from '../logic/game';
import Board from './Board';

const App = () => {
  const [humanGrid, setHumanGrid] = useState(
    Game.humanBoard.grid.map((row) => [...row])
  );
  const [computerGrid, setComputerGrid] = useState(
    Game.computerBoard.grid.map((row) => [...row])
  );
  
  const onClickedPosition = (e) => {
    const coords = e.currentTarget.id.split('-');
    Game.computerBoard.receiveAttack(coords);
    setComputerGrid(Game.computerBoard.grid.map((row) => [...row]));
    
    if (Game.isGameOver()) {
      // send winner's name from Game.winner
    } else {
      setTimeout(() => {
        Game.humanBoard.receiveAttack(Game.computer.getAttackCoords());
        setHumanGrid(Game.humanBoard.grid.map((row) => [...row]));
      }, 2000);
    }
  };

  return (
    <div className='game'>
      <Board grid={humanGrid} playerType={'human'} />
      <Board 
        grid={computerGrid} 
        playerType={'computer'}
        onClickedPosition={onClickedPosition}
      />
    </div>
  );
};

export default App;
