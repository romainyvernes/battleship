import Ship from '../logic/ship';

const shipLength = 3;
let testShip;

beforeEach(() => {
  testShip = Ship(shipLength);
});

test('ship\'s parts property\'s length must be equal to length input', () => {
  expect(testShip.parts.length).toBe(shipLength);
});

test('ship\'s parts property must be made up of zeros', () => {
  expect(testShip.parts).toEqual([0, 0, 0]);
});

test('ship must save hit in the right place if hit', () => {
  testShip.hit(1);
  expect(testShip.parts[1]).toBe(1);
  expect(testShip.parts[0]).toBe(0);
  expect(testShip.parts[2]).toBe(0);
});

test('hit should return error message if a shot hits the same position twice', () => {
  testShip.hit(1);
  expect(() => {
    testShip.hit(1);
  }).toThrow('Position already hit');
});

test('ship must sink if hit as many times as its length', () => {
  for (let i = 0; i < 3; i++) {
    testShip.hit(i);
  }
  expect(testShip.isSunk()).toBe(true);
});

test('ship\'s parts property must be made up of ones if ship is sunk', () => {
  for (let i = 0; i < 3; i++) {
    testShip.hit(i);
  }
  expect(testShip.parts).toEqual([1, 1, 1]);
});