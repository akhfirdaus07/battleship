import Gameboard from "../gameboard";

let gameboard = Gameboard();

test("creates gameboard of 10x10", () => {
  expect(gameboard.board.length && gameboard.board[0].length).toBe(10);
});
test("returns false if there's already a ship", () => {
  gameboard.placeShip(0, 0, 2, "h");
  expect(gameboard.placeShip(0, 1, 2, "h")).toBe(false);
});
test("place horizontal ship of length 1 at pos 0", () => {
  gameboard.placeShip(0, 1, "h");
  expect(gameboard.board[0]).toBeTruthy();
});
test("accepts horizontal ship of 4 at pos 4", () => {
  gameboard.placeShip(4, 4, "h");
  expect(
    gameboard.board[4] &&
      gameboard.board[5] &&
      gameboard.board[6] &&
      gameboard.board[7]
  ).toBeTruthy();
});
test("reject horizontal boat that goes over the right edge", () => {
  expect(gameboard.placeShip(1, 6, 5, "h")).toBe(false);
});
test("extend vertical ship down", () => {
  gameboard.placeShip(0, 0, 2, "v");
  expect(gameboard.board[0][0] && gameboard.board[1][0]).toBeTruthy();
});
test("reject vertical ship that goes over bottom edge", () => {
  expect(gameboard.placeShip(7, 5, 4, "v")).toBe(false);
});
test("hit ship return pos with 'hit'", () => {
  gameboard.placeShip(0, 5, 5, "h");
  expect(gameboard.receiveAttack(0, 5)).toBe("hit");
});
test("2x hit ship return pos with 'hit'", () => {
  gameboard.placeShip(0, 0, 5, "v");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  expect(
    gameboard.board[0][0].ship.tiles[gameboard.board[0][0].shipPos] &&
      gameboard.board[1][0].ship.tiles[gameboard.board[1][0].shipPos]
  ).toBe("hit");
});
test("sunk ship returns sunk", () => {
  gameboard.placeShip(0, 0, 2, "v");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);

  expect(gameboard.isSunk(0, 0)).toBeTruthy();
});
test("are all ships on the board sunk?", () => {
  gameboard.placeShip(0, 0, 2, "v");
  gameboard.placeShip(0, 4, 2, "h");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(0, 4);
  gameboard.receiveAttack(0, 5);

  expect(gameboard.areAllSunk(gameboard.board)).toBeTruthy();
});
