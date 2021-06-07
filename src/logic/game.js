import Gameboard from './gameboard';
import Player from './player';

const Game = (() => {
  const human = Player('You');
  const computer = Player('Computer');
  const humanBoard = Gameboard(20, 20);
  const computerBoard = Gameboard(20, 20);
  
  const shipsCoords = [
    {start: [1, 1], end: [4, 1]},
    {start: [1, 19], end: [6, 19]},
    {start: [10, 10], end: [12, 10]}
  ];
  shipsCoords.map((coords) => {
    humanBoard.addShip(coords);
    computerBoard.addShip(coords);
  });
  
  let running = false; // change to true when player clicks start
  let winner;

  while (running) {
    if (human.getTurnStatus()) {
      // attack computer board
      human.toggleTurn();
    } else {
      humanBoard.receiveAttack(computer.getAttackCoords());
      computer.toggleTurn();
    }

    if (computerBoard.isGameOver() || humanBoard.isGameOver()) {
      running = false;
      computerBoard.isGameOver() 
        ? winner = human.name 
        : winner = computer.name;
    }
  }

  return {
    human,
    computer,
    humanBoard,
    computerBoard,
    running,
    winner,
  };
})();

export default Game;