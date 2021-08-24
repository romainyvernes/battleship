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
    throw new Error('Invalid width or height');
  }

  const getShipCoords = ([x, y], length, axis) => {
    const coords = [];
    const [intX, intY] = [x, y].map((coord) => parseInt(coord, 10));
    if (axis === 'y') { // ship is positioned vertically
      for (let i = intY; i < intY + length; i++) {
        coords.push([intX, i]);
      }
      return coords;
    }
    // if ship is positioned horizontally
    for (let i = intX; i < intX + length; i++) {
      coords.push([i, intY]);
    }
    return coords;
  };

  const isInRange = (coords) => {
    const [x1, y1, x2, y2] = coords[0].concat(coords[coords.length - 1]);
    if (
      x1 >= 0 && x1 < grid[0].length &&
      y1 >= 0 && y1 < grid.length &&
      x2 >= 0 && x2 < grid[0].length &&
      y2 >= 0 && y2 < grid.length
    ) {
      return true;
    }
    return false;
  };

  const isTaken = (coords) => {
    for (let i = 0; i < coords.length; i++) {
      if (Number.isInteger(grid[coords[i][1]][coords[i][0]])) {
        return true;
      }
    }
    return false;
  };

  const ships = [];
  
  const addShip = (coords, name) => {
    const [x1, y1, x2, y2] = coords[0].concat(coords[coords.length - 1]);
    
    if (!isInRange(coords)) {
      throw new Error('Position out of range');
    };
    
    if (
      (x1 === x2 && y1 > y2) || // ship is positioned vertically
      (y1 === y2 && x1 > x2) // ship is positioned horizontally
    ) {
      throw new Error(
        'Please enter coordinates from left to right/top to bottom'
      );
    }

    // check if any of those coordinates overlap with another ship
    if (isTaken(coords)) {
      throw new Error('Another ship is already positioned here');
    }
    
    // add new instance of ship to ships array
    ships.push({
      coords: {start: [x1, y1], end: [x2, y2]},
      ship: Ship(coords.length, name),
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

    return ship;
  };

  const receiveAttack = ([x, y]) => {
    if (x < 0 || x > grid[0].length - 1 || y < 0 || y > grid.length - 1) {
      throw new Error('Position is out of range');
    }
    
    switch (grid[y][x]) {
      case false: // position was never hit
        grid[y][x] = 'miss';
        return {
          message: 'miss',
        };
      case 'miss': // position was already hit once
        return {
          message: 'already hit'
        };
      default: // position is an integer associated with a ship
        const ship = hitShip(grid[y][x], [x, y]);
        grid[y][x] = 'hit';
        return { 
          message: 'hit',
          ship,
        };
    }
  };

  const isGameOver = () => {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].ship.isSunk()) return false;
    }
    return true;
  };

  const placeShipRandomly = (shipLength, name) => {
    const axes = ['x', 'y'];
    
    let loop = true;

    while (loop) {
      try {
        const randomX = Math.floor(Math.random() * width);
        const randomY = Math.floor(Math.random() * height);
        const randomAxis = axes[Math.floor(Math.random() * 2)];
        const randomCoords = getShipCoords(
          [randomX, randomY],
          shipLength,
          randomAxis
        );
        addShip(randomCoords, name);
        loop = false;
      } catch (err) {
        continue;
      }
    }
  };

  return {
    grid,
    getShipCoords,
    isTaken,
    isInRange,
    addShip,
    receiveAttack,
    isGameOver,
    placeShipRandomly,
  };
};

export default Gameboard;
