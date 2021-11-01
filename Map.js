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

Map.prototype.collidesWith = function(cx, cy, halfWidth, halfHeight){
    var hits = false;
    var tileX = Math.floor(this.x_tiles * cx/g_canvas.width);
    var tileY = Math.floor(this.y_tiles * cy/g_canvas.height);
    if (tileX < 0 || tileX > this.x_tiles || tileY < 0 || tileY > this.y_tiles){
        return false;
    }
    console.log(tileX);
    console.log(tileY);
    if (this.gameMap[tileY][tileX] === 1){
        hits = true;
    }
    return {
        hits: hits,
        tileX: tileX,
        tileY: tileY
    };
}
