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
                                  cx: c*64,
                                  cy: r*64});
            this.tiles.push(newTile);
        }
    }
    this.registerGrid();
};
Environment.prototype.registerGrid = function(){
    for (tile in this.tiles){
        if (tile.collidable){
            spatialManager.register(tile);
        }
    }
};

Environment.prototype.render = function(ctx){
    for (var i = 0; i<this.tiles.length; i++){
        ctx.fillStyle = this.tiles[i].colour;
        ctx.fillRect(this.tiles[i].cx, this.tiles[i].cy, this.tiles[i].width, this.tiles[i].height);
        //console.log('got here');

    }

};
