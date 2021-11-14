//this is not a thing yet

function Environment(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    this.createGrid();
}

Environment.prototype.tileSheet = new Image();
Environment.prototype.tileSheet.src = "resrc/enviro.png";
Environment.prototype.objectSheet = new Image();
Environment.prototype.objectSheet.src = "resrc/objects&Items.png"


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
                                   cx: (c+1)*64 - 32,
                                   cy: (r+1)*64 - 32});


            if (newTile.isCollidable()){
                //console.log(newTile);
                this.tilesColl.push(newTile);
                //console.log("and got here");
            //
            }
            else if (!newTile.isCollidable()){
                this.tilesBack.push(newTile);
            }
        }
    }
    this.registerGrid();
    //console.log(this.tilesColl);
    //console.log(this.tilesBack);
};
Environment.prototype.registerGrid = function(){
    for (tile in this.tilesColl){
        spatialManager.unregister(this.tilesColl[tile]);
        spatialManager.register(this.tilesColl[tile]);
    }
};

Environment.prototype.render = function(ctx){

    //creates an infinite load so not this but essentially this
    for (var l = 0; l<this.tilesBack.length; l++){
        //console.log(l);
        ctx.drawImage(this.tileSheet, this.tilesBack[l].sx, this.tilesBack[l].sy,
                       this.tilesBack[l].width, this.tilesBack[l].height,
                       this.tilesBack[l].cx - g_camera.cx - this.tilesBack[l].halfWidth,
                       this.tilesBack[l].cy - g_camera.cy - this.tilesBack[l].halfHeight,
                       this.tilesBack[l].width, this.tilesBack[l].height)
        
        // g_camera.cy,2*s.w,2*s.h
    }
    for (var i = 0; i<this.tilesColl.length; i++){
        ctx.drawImage(this.tileSheet, this.tilesColl[i].sx, this.tilesColl[i].sy,
                       this.tilesColl[i].width, this.tilesColl[i].height,
                       this.tilesColl[i].cx - g_camera.cx - this.tilesColl[i].halfWidth,
                       this.tilesColl[i].cy - g_camera.cy - this.tilesColl[i].halfHeight,
                       this.tilesColl[i].width, this.tilesColl[i].height)
        
    }

};
