import Gameboard from '../logic/gameboard';

const boardWidth = 20;
const boardHeight = 18;
let testBoard;

beforeEach(() => {
  testBoard = Gameboard(boardWidth, boardHeight);
});

test('width should be a positive integer', () => {
  const invalidWidth = -5;
  expect(() => {
    Gameboard(invalidWidth);
  }).toThrow('Invalid width or height');
});

test('height should be a positive integer', () => {
  const invalidHeight = -25;
  expect(() => {
    Gameboard(invalidHeight);
  }).toThrow('Invalid width or height');
});

test('board width must be equal to width input', () => {
  expect(testBoard.grid[0].length).toBe(boardWidth);
});

test('board height must be equal to height input', () => {
  expect(testBoard.grid.length).toBe(boardHeight);
});

test('board\'s grid must be made up of booleans returning false', () => {
  const expected = [];
  for (let i = 0; i < boardHeight; i++) {
    expected.push([]);
    for (let j = 0; j < boardWidth; j++) {
      expected[i].push(false);
    }
  }

  expect(testBoard.grid).toEqual(expected);
});

test('getShipCoords should return correct coordinates', () => {
  const expected = [[4, 2], [4, 3], [4, 4], [4, 5], [4, 6] ,[4, 7]];
  expect(testBoard.getShipCoords([4, 2], 6, 'y')).toEqual(expected);
});

test('addShip should map ships to grid according to their index in ships array', () => {
  const expected = [];
  for (let i = 0; i < boardHeight; i++) {
    expected.push([]);
    for (let j = 0; j < boardWidth; j++) {
      expected[i].push(false);
    }
  }

  const shipCoords1 = [[4, 2], [4, 3], [4, 4], [4, 5], [4, 6] ,[4, 7]];
  shipCoords1.map(([x, y]) => expected[y][x] = 0);

  const shipCoords2 = [[0, 0], [0, 1], [0, 2], [0, 3]];
  shipCoords2.map(([x, y]) => expected[y][x] = 1);

  testBoard.addShip(shipCoords1);
  testBoard.addShip(shipCoords2);
  
  expect(testBoard.grid).toEqual(expected);
});

test('new ship\'s coordinates should be within grid\'s range', () => {
  const invalidCoords = [[-1, 2], [-1, 7]];
  const validCoords = [[0, 2], [0, 7]];
  expect(testBoard.isInRange(invalidCoords)).toBe(false);
  expect(testBoard.isInRange(validCoords)).toBe(true);
});

test('new ship\'s coordinates should be entered from top to bottom or left to right', () => {
  const reversedCoords = [[4, 7], [4, 6], [4, 5], [4, 4], [4, 3], [4, 2]];
  expect(() => {
    testBoard.addShip(reversedCoords);
  }).toThrow('Please enter coordinates from left to right/top to bottom');
});

test('attack coordinates should be within range of grid', () => {
  expect(() => {
    testBoard.receiveAttack([-5, -3]);
  }).toThrow('Position is out of range');
});

test('isTaken must correctly detect coordinates already occupied', () => {
  const shipCoords1 = [[4, 2], [4, 3], [4, 4], [4, 5], [4, 6] ,[4, 7]];
  testBoard.addShip(shipCoords1);
  const shipCoords2 = [[4, 3], [5, 3], [6, 3]];
  expect(testBoard.isTaken(shipCoords2)).toBe(true);
});

test('ships must not overlap', () => {
  const shipCoords1 = [[4, 2], [4, 3], [4, 4], [4, 5], [4, 6] ,[4, 7]];
  const shipCoords2 = [[4, 3], [5, 3], [6, 3]];
  testBoard.addShip(shipCoords1);
  expect(() => {
    testBoard.addShip(shipCoords2);
  }).toThrow('Another ship is already positioned here');
});

test('receiveAttack should trigger the hit function of the right ship', () => {
  const shipCoords1 = [[15, 9], [16, 9]];
  const shipCoords2 = [[4, 2], [4, 3], [4, 4], [4, 5], [4, 6] ,[4, 7]];
  testBoard.addShip(shipCoords1);
  testBoard.addShip(shipCoords2);
  testBoard.receiveAttack([4, 3]);
  expect(testBoard.grid[3][4]).toBe('hit');
});

test('receiveAttack should record coordinates of attack on grid', () => {
  testBoard.receiveAttack([4, 3]);
  expect(testBoard.grid[3][4]).toBe('miss');
});

test('attack should NOT be at the same coordinates', () => {
  testBoard.receiveAttack([4, 3]);
  expect(() => {
    testBoard.receiveAttack([4, 3]);
  }).toThrow('Position already hit');
});

test('board should report game is over if all its ships are sunk', () => {
  const coords = [[15, 9], [16, 9]];
  testBoard.addShip(coords);
  testBoard.receiveAttack([15, 9]);
  testBoard.receiveAttack([16, 9]);
  expect(testBoard.isGameOver()).toBe(true);
});

test('board should report game is NOT over if any of its ships is still standing', () => {
  const coords = [[15, 9], [16, 9]];
  testBoard.addShip(coords);
  testBoard.receiveAttack([15, 9]);
  expect(testBoard.isGameOver()).toBe(false);
});

test('placeShipRandomly should map ships onto map correctly', () => {
  const shipLengths = [5, 4, 3];
  shipLengths.map((length) => testBoard.placeShipRandomly(length));
  
  expect(testBoard.grid.map((row) => {
    return row.filter((position) => Number.isInteger(position));
  }).flat(Infinity).length).toBe(12);
});