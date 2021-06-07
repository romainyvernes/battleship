import Player from '../logic/player';

const name1 = 'Test player 1';
const name2 = 'Test player 2';
const boardWidth = 3;
const boardHeight = 3;
let testPlayer1;
let testPlayer2;

beforeEach(() => {
  testPlayer1 = Player({name: name1, boardWidth, boardHeight});
  testPlayer2 = Player({name: name2, boardWidth, boardHeight});
});

test('players\' name should be stored', () => {
  expect(testPlayer1.name).toBe(name1);
});

test('only one player should be able to play at once', () => {
  testPlayer1.toggleTurn();
  expect(testPlayer1.getTurnStatus()).toBe(true);
  expect(testPlayer2.getTurnStatus()).toBe(false);
});

test('computer player should be able to send attacks', () => {
  expect(Array.isArray(testPlayer2.getAttackCoords())).toBe(true);
  expect(testPlayer2.getAttackCoords().length).toBe(2);
});

test('computer should NOT attack twice in the same place', () => {
  const boardPositionsCount = boardHeight * boardWidth;
  const positionsAttacked = [];
  for (let i = 0; i < boardPositionsCount; i++) {
    positionsAttacked.push(testPlayer2.getAttackCoords());
  }
  expect(positionsAttacked.filter(([x1, y1]) => {
    const duplicates = (
    positionsAttacked.filter(([x2, y2]) => x1 === x2 && y1 === y2)
    );
    if (duplicates.length === 2) return true;
    return false;
  })).toEqual([]);
});
