//this is not a thing yet

function Environment(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.createGrid();
}

Environment.prototype.tileWidth = 100;

//now this can be anything i think. hope. think/hope.
Environment.prototype.map = new Map();


Environment.prototype.tiles = [];
// use the existing map to create a grid
//could also add a level identifier if we get that far

Environment.prototype.createGrid = function(){
    //the ugliest code
    for (var r = 0; r < this.map.gameMap.length; r++){
        for (var c = 0; c < this.map.gameMap[r].length; c++){
            var newTile = new Tile({id: this.map.gameMap[r][c],
                                  cx: c*64 + 32,
                                  cy: r*64 + 32});
            this.tiles.push(newTile);
        }
    }
    this.registerGrid();
};

Environment.prototype.registerGrid = function(){
    for (tile in this.tiles){
        if (this.tiles[tile].collidable){
            spatialManager.unregister(this.tiles[tile]);
            spatialManager.register(this.tiles[tile]);
        }
    }
};

Environment.prototype.render = function(ctx){
    var count = 1;
    for (var i = 0; i<this.tiles.length; i++){
        ctx.fillStyle = this.tiles[i].colour;
        ctx.fillRect(this.tiles[i].cx - 32 - g_camera.cx, this.tiles[i].cy - 32 - g_camera.cy, this.tiles[i].width, this.tiles[i].height);
        if(count == 1 && this.tiles[i].colour == "blue") {
            //console.log(this.tiles[i].cx - 32 - g_camera.cy);
            count = 2;
        }
        //console.log('got here');

    }

};


