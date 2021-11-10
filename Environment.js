//this is not a thing yet

function Environment(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.createGrid();
}

Environment.prototype.tileSheet = new Image();
Environment.prototype.tileSheet.src = "resrc/enviro.png";


//now this can be anything i think. hope. think/hope.


Environment.prototype.tilesColl = [];
Environment.prototype.tilesBack = [];
// use the existing map to create a grid
//could also add a level identifier if we get that far

Environment.prototype.createGrid = function(){
    //the ugliest code
    for (var r = 0; r < Map.gameMap.length; r++){
        for (var c = 0; c < Map.gameMap[r].length; c++){

            var newTile = new Tile({id: Map.gameMap[r][c],
                                   cx: c*64,
                                   cy: r*64});


            if (newTile.isCollidable){
                console.log("we're in")
                //this.tilesColl.push(newTile);
                console.log("and got here")
            //
            }
            else if (!newTile.isCollidable){
                this.tilesBack.push(newTile);
            }
        }
    }
    this.registerGrid();
};

Environment.prototype.registerGrid = function(){
    for (tile in this.tilesColl){
        spatialManager.unregister(this.tilesColl[tile]);
        spatialManager.register(this.tilesColl[tile]);
    }
};

Environment.prototype.render = function(ctx){
    for (var l = 0; l<this.tilesBack.length; l++){
        // ctx.drawImage(this.tileSheet, this.tilesBack[l].sx, this.tilesBack[l].sy,
        //               this.tilesBack[l].width, this.tilesBack[l].height,
        //               this.tilesBack[l].cx, this.tilesBack[l].cy,
        //               this.tilesBack[l].width, this.tilesBack[l].height)
        //
        // g_camera.cy,2*s.w,2*s.h
    }
    for (var i = 0; i<this.tilesColl.length; i++){
        // ctx.drawImage(this.tileSheet, this.tilesColl[i].sx, this.tilesColl[i].sy,
        //               this.tilesColl[i].width, this.tilesColl[i].height,
        //               this.tilesColl[i].cx, this.tilesColl[i].cy,
        //               this.tilesColl[i].width, this.tilesColl[i].height)
        //
    }

};
