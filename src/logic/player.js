const Player = ({name, boardWidth, boardHeight}) => {
  let turn = false;
  let boardPositions = [];

  for (let i = 0; i < boardHeight; i++) {
    for (let j = 0; j < boardWidth; j++) {
      boardPositions.push([j, i]);
    }
  }

  const toggleTurn = () => {
    if (turn) turn = false;
    turn = true;
  };

  const getTurnStatus = () => {
    return turn;
  };

  const getAttackCoords = () => {
    if (boardPositions.length === 0) return 'All positions targeted'; 
    const randomIndex = Math.floor(Math.random() * boardPositions.length);
    const randomCoords = boardPositions[randomIndex];
    boardPositions.splice(randomIndex, 1);
    return randomCoords;
  };

  return {
    name,
    toggleTurn,
    getAttackCoords,
    getTurnStatus,
  }
};

export default Player;