/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    var ID = this._nextSpatialID;
    this._nextSpatialID += 1;
    return ID;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    // TODO: YOUR STUFF HERE!
    this._entities[spatialID] = entity;

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    this._entities.splice(spatialID,1);

},

findEntityInRange: function(posX, posY, radius) {
    for (var i=0; i<this._entities.length; i++){
        if (this._entities[i]){
            var entitityPos = this._entities[i].getPos();
            var dist = util.distSq(posX, posY, entitityPos.posX, entitityPos.posY);
            // if dist === 0, then it's the same object, don't want to check for collision 
            if (dist < Math.pow(radius+this._entities[i].getRadius(),2) && dist > 0){
                return this._entities[i];
            }
        }
    }
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.getPos().posX, e.getPos().posY, e.getRadius());
    }
    ctx.strokeStyle = oldStyle;
}

}
