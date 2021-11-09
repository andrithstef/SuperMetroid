function Map(){

}

//Variables that can be used to set up other prototype variables
//This was for some reason an issue
var x_tiles = 16;
var y_tiles = 10;
var tileHeight = 100;
var tileWidth = 100;
var cameraWidth = g_canvas.width;
var moveHorizontalCameraBuffer = 200;

Map.prototype.x_tiles = x_tiles;
Map.prototype.y_tiles = y_tiles;
Map.prototype.tileHeight = tileHeight;
Map.prototype.tileWidth = tileWidth;
Map.prototype.height = y_tiles*tileHeight;
Map.prototype.width = x_tiles*tileWidth;

Map.prototype.cameraWidth = cameraWidth;
Map.prototype.cameraX = 0;
Map.prototype.moveHorizontalCameraBuffer = moveHorizontalCameraBuffer;
Map.prototype.leftCameraEdge = moveHorizontalCameraBuffer;
Map.prototype.rightCameraEdge = cameraWidth - moveHorizontalCameraBuffer;

//Map.prototype.horizontalSpawnDistance = 

/*console.log(this.cameraWidth);
console.log(this.cameraX);
console.log(this.moveHorizontalCameraBuffer);
console.log(this.leftCameraEdge);
console.log(this.rightCameraEdge);*/


Map.prototype.gameMap = [
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]


Map.prototype.render = function(ctx){
    var ri = 0;
    var ci = 0;
    for (var i = 0; i < this.gameMap.length; i++){
        for (var j = 0; j < this.gameMap[i].length; j++){
            if (this.gameMap[i][j] === 1){

                util.fillBox(ctx, j*(tileWidth) - this.cameraX,
                i*tileHeight, tileWidth, tileHeight,"blue");

            }
            ci += 1;
        }
        ri += 1;
        ci = 0;
    }

}

Map.prototype.collidesWith = function(cx, cy){
    var hits = false;
    var tileX = Math.floor(x_tiles * (cx+this.cameraX)/this.width);
    var tileY = Math.floor(y_tiles * cy/this.height);
    /*console.log(cx);
    console.log(tileX);
    console.log(x_tiles);
    console.log(this.cameraX);
    console.log(this.width);*/
    if (tileX < 0 || tileX > x_tiles || tileY < 0 || tileY > y_tiles){
        return false;
    }
    if (this.gameMap[tileY][tileX] === 1){
        hits = true;
    }
    return {
        hits: hits,
        tileX: tileX,
        tileY: tileY,
        offset: this.cameraX
    };
}

Map.prototype.shouldWeMoveCamera = function(cx, cy, halfWidth,halfHeight){
    var moveHorizontally = false;
    var moveVertically = false;
    var moveX = 0;
    if (cx + halfWidth > this.rightCameraEdge || cx - halfWidth < this.leftCameraEdge){
        if(cx + halfWidth > this.rightCameraEdge && this.cameraX < this.width - this.cameraWidth) {
            console.log("right");
            //console.log(this.cameraX);
            //console.log(this.width - this.cameraWidth);
            var moveX = true;
            moveHorizontally = true;
        } else if(cx - halfWidth < this.leftCameraEdge && this.cameraX != 0) {
            console.log("left");
            var moveX = false;
            moveHorizontally = true;
        }
        
        if(this.cameraX > this.width - this.cameraWidth) this.cameraX = this.width - this.cameraWidth;
        if(this.cameraX < 0) this.cameraX = 0;
        
    }
    /*
    if (cy + halfHeight > rightCameraEdge || cx - halfWidth < leftCameraEdge){
        if(cx + halfWidth > rightCameraEdge) {
            var moveX = cx + halfWidth - rightCameraEdge;
        } else {
            var moveX = leftCameraEdge - cx - halfWidth;
        }
    }*/
    return {
        moveHorizontally: moveHorizontally,
        moveVertically: moveVertically,
        moveX: moveX
    };
}

Map.prototype.moveCamera = function(x,y){
    this.cameraX += x;
    //this.cameraY += y;
}



/* OLD VERSION
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

Map.prototype.collidesWith = function(cx, cy){
    var hits = false;
    var tileX = Math.floor(this.x_tiles * cx/g_canvas.width);
    var tileY = Math.floor(this.y_tiles * cy/g_canvas.height);
    if (tileX < 0 || tileX > this.x_tiles || tileY < 0 || tileY > this.y_tiles){
        return false;
    }
    if (this.gameMap[tileY][tileX] === 1){
        hits = true;
    }
    return {
        hits: hits,
        tileX: tileX,
        tileY: tileY
    };
}*/
