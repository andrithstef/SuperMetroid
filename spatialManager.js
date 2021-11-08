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
    this._entities[spatialID] = null;

},

findEntities: function(posX, posY, width, height) {

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

rectVsRect : function(x1, y1, w1, h1, x2, y2, w2, h2){
    //Check if rectangles collide
    return ((x1 < x2 + w2) && (x1 + w1 > x2)
    && (y1 < y2 + h2) && (y1 + h1 > y2));
},

rayVsRect : function(ray_x, ray_y, ray_dir_x, ray_dir_y, rx, ry, rw, rh){
    t_near_x = (rx - ray_x)/ray_dir_x;
    t_near_y = (ry - ray_y)/ray_dir_y;
    t_far_x = (rx + rw - ray_x)/ray_dir_x;
    t_far_y = (ry + rh - ray_y)/ray_dir_y;

    //Swap if far is closer than near
    if (t_near_x > t_far_x){
        var temp = t_far_x;
        t_far_x = t_near_x;
        t_near_x = temp;
    }
    if (t_near_y > t_far_y){
        var temp = t_far_y;
        t_far_y = t_near_y;
        t_near_y = temp;
    }

    if (t_near_x > t_far_y || t_near_y > t_far_x){
        return {
            hit: false
        }
    }

    //how far to travel to hit
    var t_hit_near = Math.max(t_near_x, t_near_y);
    var t_hit_far = Math.min(t_far_x, t_far_y);
    if (t_hit_far < 0){
        return{
            hit: false
        }
    }

    //Where does the ray hit
    var contact_point_x = ray_x + t_hit_near * ray_dir_x;
    var contact_point_y = ray_y + t_hit_near * ray_dir_y;

    //Find which way to push object back
    var contact_normal;

    if (t_near_x > t_near_y){
        if (ray_dir_x < 0){
            contact_normal = [1,0];
        }
        else{
            contact_normal = [-1,0];
        }
    }
    else{
        if (ray_dir_y < 0){
            contact_normal = [0,1];
        }
        else{
            contact_normal = [0,-1];
        }
    }
    return{
        hit : true, 
        t_hit_near : t_hit_near,
        contact_point_x : contact_point_x,
        contact_point_y : contact_point_y,
        contact_normal : contact_normal
    }
},

DynamicRectVsRect : function(r1x, r1y, r1w, r1h, r1velX, r1velY, r2x, r2y, r2w, r2h){
    if (r1velX === 0 && r1velY === 0) return false;
    var expanded_rectangle_x = r2x - r1w/2;
    var expanded_rectangle_y = r2y - r1h/2;
    var expanded_rectangle_w = r2w + r1w;
    var expanded_rectangle_h = r2h + r1y;

    var hitData = this.rayVsRect(r1x + r1w/2, r1y + r1y/2, r1velX, r1velY,expanded_rectangle_x, 
        expanded_rectangle_y, expanded_rectangle_w, expanded_rectangle_h);
    
    if (hitData.hit){
        if (hitData.t_hit_near <= 1){
            return hitData;
        }
    }
    return {
        hit : false
    };
}
}