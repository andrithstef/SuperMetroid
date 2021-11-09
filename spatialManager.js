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

    // TODO: YOUR STUFF HERE!
    return this._nextSpatialID++;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    // TODO: YOUR STUFF HERE!
    if(entity.shape = "Rect") {
        this._entities[spatialID] = {
            posX: pos.posX - entity.halfWidth,
            posY: pos.posY - entity.halfHeight,
    
            width: 2*entity.halfWidth,
            height: 2*entity.halfHeight,
    
            realEntity: entity,
            shape: entity.shape
        }
    } else {
        this._entities[spatialID] = {
            posX: pos.posX,
            posY: pos.posY,
    
            radius: entity.getRadius(),
    
            realEntity: entity,
            shape: entity.shape
        }
    }
    
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: Hacky solution, can be changed
    this._entities[spatialID] = {
        posX: 0 - 2*entity.getRadius(),
        posY: 0 - 2*entity.getRadius(),

        radius: 0,

        realEntity: entity,

        shape: entity.shape
    }


},

findEntityInRange: function(posX, posY, radius) {

    // TODO: Fixing collision between rectangles and squares
    for (var ID in this._entities) {
        var e = this._entities[ID];
        var distanceSq = util.distSq(posX, posY, e.posX, e.posY);
        var limitSq = util.square(radius + e.radius);
        if(distanceSq < limitSq) {
            return e.realEntity;
        }
    }
    return null;
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "green";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        if(e.shape == "Rect") {
            util.strokeBox(ctx, e.posX, e.posY, e.width, e.height, "green");
        } else {
            util.strokeCircle(ctx, e.posX, e.posY, e.radius);
        }
        
    }
    ctx.strokeStyle = oldStyle;
},

findCollision: function(entity){
    for (var e in this._entities) {
        var ent = this._entities[e].realEntity;
        if (ent.getSpatialID() != entity.getSpatialID()){  
            if (this.rectVsRect(entity, ent)){
                return ent;
            }
        }
    }
},

rectVsRect: function(e1, e2){
    return (e1.nextX - e1.halfWidth < e2.cx + e2.halfWidth
        && e1.nextX + e1.halfWidth > e2.cx - e2.halfWidth
        && e1.nextY - e1.halfHeight < e2.cy + e2.halfHeight
        && e1.nextY + e1.halfHeight > e2.cy - e2.halfHeight);
}
}
