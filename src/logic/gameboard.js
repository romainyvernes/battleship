import Ship from './ship';

const Gameboard = (width, height) => {
  const grid = [];
  
  // create 2D array filled with false booleans
  if (width > 0 && height > 0) {
    for (let i = 0; i < height; i++) {
      grid.push([]);
      for (let j = 0; j < width; j++) {
        grid[i].push(false);
      }
    }
  } else {
    return 'invalid width or height';
  }
  
  const ships = [];

  const getShipCoords = (start, end) => {
    const coords = [];
    if (start[0] === end[0]) { // ship is positioned vertically
      for (let i = start[1]; i <= end[1]; i++) {
        coords.push([start[0], i]);
      }
      return coords;
    }
    // if ship is positioned horizontally
    for (let i = start[0]; i <= end[0]; i++) {
      coords.push([i, start[1]]);
    }
    return coords;
  };

  const isInRange = (start, end) => {
    if (
      start[0] > 0 && start[0] < grid[0].length - 1 &&
      start[1] > 0 && start[1] < grid.length - 1 &&
      end[0] > 0 && end[0] < grid[0].length - 1 &&
      end[1] > 0 && end[1] < grid.length - 1
    ) {
      return true;
    }
    return false;
  };
  
  const addShip = ({start, end}) => {
    if (!isInRange(start, end)) return 'position out of range';

    if (
      (start[0] === end[0] && start[1] > end[1]) || // ship is positioned vertically
      (start[1] === end[1] && start[0] > end[0]) // ship is positioned horizontally
    ) {
      return 'Please enter coordinates from left to right/top to bottom';
    } 

    // get coordinates of each position ship occupies
    const coords = getShipCoords(start, end);
    
    // add new instance of ship to ships array
    ships.push({
      coords: {start, end},
      ship: Ship(coords.length)
    });
    
    // map ship onto grid
    coords.map(([x, y]) => grid[y][x] = ships.length - 1);
  };

  const hitShip = (index, [x, y]) => {
    const { ship, coords } = ships[index];
    let shipPartIndex;

    if (coords.start[0] === coords.end[0]) { // ship is positioned vertically
      shipPartIndex = y - coords.start[1];
    } else { // ship is positioned horizontally
      shipPartIndex = x - coords.start[0];
    }

    ship.hit(shipPartIndex);
  };

  const receiveAttack = ([x, y]) => {
    if (x < 0 || x > grid[0].length - 1 || y < 0 || y > grid.length - 1) {
      return 'position is out of range';
    }
    
    switch (grid[y][x]) {
      case false: // position was never hit
        grid[y][x] = true;
        break;
      case true: // position was already hit once
        return 'position already hit';
      default: // position is an integer associated with a ship
        hitShip(grid[y][x], [x, y]);
        grid[y][x] = true;
        break;
    }
  };

  const isGameOver = () => {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].ship.isSunk()) return false;
    }
    return true;
  };

  return {
    grid,
    ships,
    addShip,
    receiveAttack,
    isGameOver,
  };
};

export default Gameboard;
