// import Ship from "./ship";
const Ship = require("./ship");

const Gameboard = () => {
  let isStartAllowed = false;
  let hasStarted = false;
  let board = [];

  const init = (() => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i].push(false);
      }
    }
  })();

  const placeShip = (pos1, pos2, length, dir) => {
    if (board[pos1][pos2]) return false; //checks if there's already a ship

    let ship = Ship(length);
    let shipPos = 0;

    if (pos1 + ship.length > 10 || pos2 + ship.length > 10) return false; //checks if it overflows

    if (dir === "h") {
      // if (pos2 + ship.length > 10) return false; // checks if it overflows

      // checks if pos is reserved
      for (let i = 0; i < length; i++) {
        if (board[pos1][pos2 + i] === "res") return false;
      }

      for (let i = pos2; i < pos2 + ship.length; i++) {
        board[pos1].splice(i, 1, { ship, shipPos });
        reserveAround(pos1, pos2 + shipPos);
        shipPos++;
      }
    }
    if (dir === "v") {
      // if (pos1 + ship.length > 10) return false; //checks if it overflows

      // checks if pos is reserved
      for (let i = 0; i < length; i++) {
        if (board[pos1 + i][pos2] === "res") return false;
      }

      for (let i = pos1; i < pos1 + ship.length; i++) {
        board[i].splice(pos2, 1, { ship, shipPos });
        reserveAround(pos1 + shipPos, pos2); //reserve pos
        shipPos++;
      }
    }
  };

  const reserveAround = (pos1, pos2) => {
    function cell(n1, n2) {
      if (pos1 + n1 > 9 || pos1 + n1 < 0) return;
      if (board[pos1 + n1][pos2 + n2] === false)
        board[pos1 + n1][pos2 + n2] = "res";
    }
    function reserveCell(row) {
      cell(row, -1);
      cell(row, 0);
      cell(row, 1);
    }
    reserveCell(-1);
    reserveCell(0);
    reserveCell(1);
  };

  const receiveAttack = (pos1, pos2) => {
    if (board[pos1][pos2] === "miss") return false;
    if (
      typeof board[pos1][pos2] == "object" &&
      board[pos1][pos2].ship.tiles[board[pos1][pos2].shipPos] === "hit"
    )
      return false;

    if (!board[pos1][pos2] || board[pos1][pos2] === "res") {
      board[pos1][pos2] = "miss";
      return board[pos1][pos2];
    } else {
      board[pos1][pos2].ship.hit(board[pos1][pos2].shipPos);
      return board[pos1][pos2].ship.tiles[board[pos1][pos2].shipPos];
    }
  };

  // const isSunk = (pos1, pos2) => {
  //   return board[pos1][pos2].ship.isSunk() === true ? true : false;
  // };

  const areAllSunk = (board) => {
    let notSunk = false;
    for (let i = 0; i < 10; i++)
      board[i].forEach((e) => {
        if (!e || e === "miss" || e === "res") return;
        if (e.ship.isSunk() === false) notSunk = true;
      });
    return notSunk === true ? false : true;
  };

  // return {
  //   board,
  //   placeShip,
  //   receiveAttack,
  //   isSunk,
  //   areAllSunk,
  //   isStartAllowed: {
  //     get: function () {
  //       return isStartAllowed;
  //     },
  //     set: function (value) {
  //       isStartAllowed = value;
  //     },
  //   },
  //   hasStarted: {
  //     get: function () {
  //       return hasStarted;
  //     },
  //     set: function (value) {
  //       hasStarted = value;
  //     },
  //   },
  // };

  return {
    board,
    placeShip,
    receiveAttack,
    areAllSunk,
    isStartAllowed: {
      get: function () {
        return isStartAllowed;
      },
      set: function (value) {
        isStartAllowed = value;
      },
    },
    hasStarted: {
      get: function () {
        return hasStarted;
      },
      set: function (value) {
        hasStarted = value;
      },
    },
  };
};

module.exports = Gameboard;
