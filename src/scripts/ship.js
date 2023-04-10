const Ship=(length)=>{
    const tiles=[...Array(length).keys()];
    const domTargets=[];

    const hit=(pos)=>{
        if (tiles[pos]=="hit") return false;
        tiles.splice(pos,1,"hit");
    };

    const isSunk=()=>{
        let stillAlive=false;
        tiles.forEach((e)=>{
            if(e!=="hit") stillAlive=true;
        });
        return stillAlive===true ? false : true;
    };

    return {length, tiles, hit, isSunk, domTargets}
};

export default Ship;