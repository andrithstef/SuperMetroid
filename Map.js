var Map = {

// tile data 0 fyrir background, 1 fyrir fixture,
//seta mismunandi data fyrir mismunandi teg af tile, filler tile
    gameMap: [
['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['^T','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['BD1','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['BD2','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['BD3','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['BD4','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['^B','#','#','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['*L','#','#','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
['*L','#','#','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','^T'],
['BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR']],

    enemies: [],//[{x:600, y:900}, {x:400, y: 600}]

    ridley: true
}
