function Map(){

}


// tile data 0 fyrir background, 1 fyrir fixture,
//seta mismunandi data fyrir mismunandi teg af tile, filler tile

/*
Map.prototype.gameMap = [
    [0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]
*/
Map.prototype.gameMap = [
    "             11111111    ",
    "                         ",
    "                      11 ",
    "                         ",
    "              111        ",
    "                     1   ",
    "     1111          111   ",
    "    11111                ",
    "    11111                ",
    "111111111    1           ",
    "1111111111   111         ",
    "        1    1           ",
    "        1  111    11     ",
    "             1           ",
    "             111111111111",
    "1111111111111111111111111",
]


Map.prototype.render = function(ctx){
    var ri = 0;
    var ci = 0;
    for (var i = 0; i < this.gameMap.length; i++){
        for (var j = 0; j < this.gameMap[i].length; j++){
            if (this.gameMap[i][j] === 1){

                util.fillBox(ctx, ci*(this.tileWidth),
                ri*this.tileHeight, this.tileWidth, this.tileHeight,"blue");
            }
            ci += 1;
        }
        ri += 1;
        ci = 0;
    }
}


Map.prototype.x_tiles = 20;
Map.prototype.y_tiles = 16;
Map.prototype.tileHeight = 50;
Map.prototype.tileWidth = 50;

Map.prototype.tiles = [];

Map.prototype.gameMap = [
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "   11                 ",
    "    1                 ",
    "    111               ",
    "      111             ",
    "        11            ",
    "                      ",
    "              1       ",
    "             11       ",
    "            111       ",
    "11111111111111111111  ",
];

Map.prototype.render = function(ctx){
    var ri = 0;
    var ci = 0;
    for (var i = 0; i < this.gameMap.length; i++){
        for (var j = 0; j < this.gameMap[i].length; j++){
            if (this.gameMap[i].charAt(j) != " "){

                util.fillBox(ctx, ci*(this.tileWidth),
                ri*this.tileHeight, this.tileWidth, this.tileHeight,"blue");
            }
            ci += 1;
        }
        ri += 1;
        ci = 0;
    }
}

Map.prototype.getTiles = function(){
    var ri = 0;
    var ci = 0;
    for (var i = 0; i < this.gameMap.length; i++){
        for (var j = 0; j < this.gameMap[i].length; j++){
            if (this.gameMap[i].charAt(j) != " "){

                this._tiles.push({
                    x : ci * this.tileWidth,
                    y : ri * this.tileHeight
                })
            }
            ci += 1;
        }
        ri += 1;
        ci = 0;
    }
}


Map.prototype.collidesWith = function(cx, cy){
    var hits = false;
    var tileX = Math.floor(this.x_tiles * cx/g_canvas.width);
    var tileY = Math.floor(this.y_tiles * cy/g_canvas.height);
    if (tileX < 0 || tileX > this.x_tiles || tileY < 0 || tileY > this.y_tiles){
        return false;
    }
    if (this.gameMap[tileY][tileX] != " "){
        hits = true;
    }
    return {
        hits: hits,
        tileX: tileX,
        tileY: tileY
    };
}