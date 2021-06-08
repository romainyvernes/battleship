import Gameboard from '../logic/gameboard';

const boardWidth = 20;
const boardHeight = 18;
let testBoard;

beforeEach(() => {
  testBoard = Gameboard(boardWidth, boardHeight);
});

test('width should be a positive integer', () => {
  const invalidWidth = -5;
  expect(Gameboard(invalidWidth)).toBe('Invalid width or height');
});

test('height should be a positive integer', () => {
  const invalidHeight = -25;
  expect(Gameboard(invalidHeight)).toBe('Invalid width or height');
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

test('addShip should map ships to grid according to thier index in ships array', () => {
  testBoard.addShip({start: [4, 2], end: [4, 7]});
  testBoard.addShip({start: [0, 0], end: [0, 3]});
  
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
  
  expect(testBoard.grid).toEqual(expected);
});

test('new ship\'s coordinates should be within grid\'s range', () => {
  expect(testBoard.addShip({start: [-1, 2], end: [-1, 7]}))
    .toBe('Position out of range');
});

test('new ship\'s coordinates should be entered from top to bottom or left to right', () => {
  expect(testBoard.addShip({start: [4, 7], end: [4, 2]}))
    .toBe('Please enter coordinates from left to right/top to bottom');
});

test('attack coordinates should be within range of grid', () => {
  expect(testBoard.receiveAttack([-5, -3])).toBe('Position is out of range');
});

test('ships must not overlap', () => {
  testBoard.addShip({start: [4, 2], end: [4, 7]});
  expect(testBoard.addShip({start: [4, 3], end: [6, 3]}))
    .toBe('Another ship is already positioned here');
});

test('receiveAttack should trigger the hit function of the right ship', () => {
  testBoard.addShip({start: [15, 9], end: [16, 9]});
  testBoard.addShip({start: [4, 2], end: [4, 7]});
  testBoard.receiveAttack([4, 3]);
  expect(testBoard.grid[3][4]).toBe('hit');
});

test('receiveAttack should record coordinates of attack on grid', () => {
  testBoard.receiveAttack([4, 3]);
  expect(testBoard.grid[3][4]).toBe('miss');
});

test('attack should NOT be at the same coordinates', () => {
  testBoard.receiveAttack([4, 3]);
  expect(testBoard.receiveAttack([4, 3])).toBe('Position already hit');
});

test('board should report game is over if all its ships are sunk', () => {
  testBoard.addShip({start: [15, 9], end: [16, 9]});
  testBoard.receiveAttack([15, 9]);
  testBoard.receiveAttack([16, 9]);
  expect(testBoard.isGameOver()).toBe(true);
});

test('board should report game is NOT over if any of its ships is still standing', () => {
  testBoard.addShip({start: [15, 9], end: [16, 9]});
  testBoard.receiveAttack([15, 9]);
  expect(testBoard.isGameOver()).toBe(false);
});