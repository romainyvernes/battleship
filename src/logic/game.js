import Gameboard from './gameboard';
import Player from './player';

const Game = (() => {
  // set size of boards
  const boardSide = 10;
  
  // create players and gameboards
  const human = Player();
  const computer = Player({
    boardHeight: boardSide,
    boardWidth: boardSide,
  });
  const humanBoard = Gameboard(boardSide, boardSide);
  const computerBoard = Gameboard(boardSide, boardSide);
  
  // array of ships to place
  const shipsToPlace = [
    {name: 'carrier', length: 5},
    {name: 'battleship', length: 4},
    {name: 'destroyer', length: 3},
    {name: 'submarine', length: 3},
    {name: 'patrol boat', length: 2},
  ];
  
  shipsToPlace.map((ship) => (
    computerBoard.placeShipRandomly(ship.length, ship.name)
  ));

  const isGameOver = () => {
    if (humanBoard.isGameOver() || computerBoard.isGameOver()) {
      return true;
    }
    return false;
  };

  return {
    human,
    computer,
    humanBoard,
    computerBoard,
    isGameOver,
    shipsToPlace,
  };
})();

export default Game;