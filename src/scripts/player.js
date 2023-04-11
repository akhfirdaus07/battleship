const Gameboard=require("./gameboard");

const Player = (name) => {
  const gameboard = Gameboard();
  let turn = false;

  // sets player turn and removes enemy's turn
  const isTurn = (enemy) => {
    turn = true;
    enemy.turn.set(false);
  };
  // calls an attack on target
  const attack = (enemy, pos1, pos2) => {
    return enemy.gameboard.receiveAttack(pos1, pos2);
  };
  // calls a random attack on target
  const randomPos = () => {
    const pos1 = Math.floor(Math.random() * 10);
    const pos2 = Math.floor(Math.random() * 10);
    return [pos1, pos2];
  };
  // creates a ship with random pos and orientation
  const randomShip = (length) => {
    const pos1 = Math.floor(Math.random() * 10);
    const pos2 = Math.floor(Math.random() * 10);
    const dir = Math.round(Math.random());

    if (dir === 0) {
      dir = "h";
      if (gameboard.placeShip(pos1, pos2, length, dir) == false) return false;
    }

    if (dir === 1) {
      dir = "v";
      if (gameboard.placeShip(pos1, pos2, length, dir) == false) return false;
    }
  };
  //creates a random fleet of 8 ships
  const randomFleet = () => {
    // create 2 ships of length 1
    for (let i = 0; i < 2; i++) {
      if (randomShip(1) == false) continue;
    }
    // create 2 ships of length 2
    for (let i = 0; i < 2; i++) {
      if (randomShip(2) == false) continue;
    }
    // create 2 ships of length 3
    for (let i = 0; i < 2; i++) {
      if (randomShip(3) == false) continue;
    }
    // create 1 ship of length 4
    for (let i = 0; i < 2; i++) {
      if (randomShip(4) == false) continue;
    }
    gameboard.isStartAllowed.set(true);
  };

  return {
    name,
    gameboard,
    attack,
    randomFleet,
    randomPos,
    turn: {
      get: function () {
        return turn;
      },
      set: function (value) {
        turn = value;
      },
    },
    isTurn,
  };
};

module.exports=Player;