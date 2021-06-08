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
  
  // create and assign default ships coordinates
  const shipsCoords = [
    {start: [1, 1], end: [4, 1]},
    {start: [1, 9], end: [6, 9]},
    {start: [7, 8], end: [9, 8]}
  ];
  // eslint-disable-next-line array-callback-return
  shipsCoords.map((coords) => {
    humanBoard.addShip(coords);
    computerBoard.addShip(coords);
  });
  
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
  };
})();

export default Game;