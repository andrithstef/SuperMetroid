function Map(){
    
}

Map.prototype.x_tiles = 16;
Map.prototype.y_tiles = 10;
Map.prototype.tileHeight = 100;
Map.prototype.tileWidth = 100;

Map.prototype.gameMap = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

Map.prototype.render = function(ctx){
    var ri = 0;
    var ci = 0;
    for (var i = 0; i < this.gameMap.length; i++){
        for (var j = 0; j < this.gameMap[i].length; j++){
            if (this.gameMap[i][j] === 1){
                ctx.fillRect(ci*(this.tileWidth),
                ri*this.tileHeight, this.tileWidth, this.tileHeight)
            }
            ci += 1;
        }
        ri += 1;
        ci = 0;
    }
}

Map.prototype.collidesWithY = function(cx, cy, halfWidth, halfHeight){
    return false;
}

Map.prototype.collidesWithX = function(cx, cy, halfWidth, halfHeight){
    return false;
}