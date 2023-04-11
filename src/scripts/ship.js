const Ship = (length) => {
  const tiles = [...Array(length).keys()];

  const hit = (pos) => {
    if (tiles[pos] == "hit") return false;
    tiles.splice(pos, 1, "hit");
  };

  const isSunk = () => {
    let stillAlive = false;
    tiles.forEach((e) => {
      if (e !== "hit") stillAlive = true;
    });
    return stillAlive === true ? false : true;
  };

  return { tiles, length, hit, isSunk};
};

// export default Ship;

module.exports=Ship;