import Ship from "../ship";

let shipA;

test("has length property", ()=>{
    shipA=Ship(4);
    expect(shipA.length).toBe(4);
});
test("creates ship tiles", ()=>{
    shipA=Ship(4);
    expect(shipA.tiles).toEqual([0,1,2,3]);
});
test("hits the ship",()=>{
    shipA=Ship(4);
    shipA.hit(0);
    expect(shipA.tiles[0]).toEqual("hit");
});
test("sinks the ship", ()=>{
    shipA=Ship(3);
    shipA.hit(0);
    shipA.hit(1);
    shipA.hit(2);
    expect(shipA.isSunk).toBeTruthy();
});