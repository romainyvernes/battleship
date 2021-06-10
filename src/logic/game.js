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
    {name: 'Carrier', length: 5},
    {name: 'Battleship', length: 4},
    {name: 'Destroyer', length: 3},
    {name: 'Submarine', length: 3},
    {name: 'Patrol Boat', length: 2},
  ];
  
  shipsToPlace.map((ship) => computerBoard.placeShipRandomly(ship.length));
  
  // variable that will eventually report the name of the winner
  let winner;

  const isGameOver = () => {
    if (humanBoard.isGameOver() || computerBoard.isGameOver()) {
      humanBoard.isGameOver()
        ? winner = 'You\'ve lost the war'
        : winner = 'You have defeated the enemy !';
      return true;
    }
    return false;
  };

  return {
    human,
    computer,
    humanBoard,
    computerBoard,
    winner,
    isGameOver,
    shipsToPlace,
  };
})();

export default Game;