// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/

};

Entity.prototype.setup = function (descr) {

    Entity.prototype.halfWidth;
    Entity.prototype.halfHeight;

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }

    // Get my (unique) spatial ID
    this._spatialID = spatialManager.getNewSpatialID();

    // I am not dead yet!
    this._isDeadNow = false;
};

Entity.prototype.nextX;
Entity.prototype.nextY;

Entity.prototype.gravity = 0.5;
Entity.prototype.maxSpeed = 10;
Entity.prototype.friction = 0.4;

Entity.prototype.collidable = false;
Entity.prototype.isKillable = false;
Entity.prototype.isFireproof = false;

Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Entity.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

Entity.prototype.getSpatialID = function () {
    return this._spatialID;
};

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.findCollision = function (){
    return spatialManager.findCollision(this);
};

Entity.prototype.resolve = function(hitEntity){
    //If an entity is colliding, it tries to resolve the collision
    if (this.resolveTries > 10){
        this.isGrounded = true;
        this.nextY = hitEntity.cy - hitEntity.halfHeight - this.halfHeight;
        return;
    }
    //It gets pushed in the direction that is closest to not colliding with anything
    var d1;
    var d2;
    var d3;
    var d4;

    d1 = Math.abs((this.cx + this.halfWidth) - (hitEntity.cx - hitEntity.halfWidth));
    d2 = Math.abs((this.cx - this.halfWidth) - (hitEntity.cx + hitEntity.halfWidth));
    d3 = Math.abs((this.cy + this.halfHeight) - (hitEntity.cy - hitEntity.halfHeight));
    d4 = Math.abs((this.cy - this.halfHeight) - (hitEntity.cy + hitEntity.halfHeight));

    var minimum = Math.min(Math.min(d1,d2),Math.min(d3,d4));
    if (d1 === minimum) {
        this.nextX = hitEntity.cx - hitEntity.halfWidth - this.halfWidth;
    }
    else if (d2 === minimum) {
        this.nextX = hitEntity.cx + hitEntity.halfWidth + this.halfWidth;
    }
    else if (d3 === minimum) {
        this.isGrounded = true;
        this.hasJumped = false;
        this.nextY = hitEntity.cy - hitEntity.halfHeight - this.halfHeight;
    }
    else{
        this.velY = 0;
        this.nextY = hitEntity.cy + hitEntity.halfHeight + this.halfHeight;
    }
    this.resolveTries += 1;
}

Entity.prototype.isColliding = function(entity){
    //Just a rectangle vs rectangle collision check
    return (this.nextX - this.halfWidth < entity.cx + entity.halfWidth
        && this.nextX + this.halfWidth > entity.cx - entity.halfWidth
        && this.nextY - this.halfHeight < entity.cy + entity.halfHeight
        && this.nextY + this.halfHeight > entity.cy - entity.halfHeight);
}

Entity.prototype.resolveCollisions = function(du){
    //Function which tries to resolve collisions for entities
    this.isGrounded = false;
    this.resolveTries = 0;
    var hitData = this.findCollision(); //Find an entity that's colliding with the object
    while(hitData){
        if(!hitData.collidable){
            break;
        }
        if(hitData.isDoor && this instanceof Player && !g_ridley){
            g_newLevel = true;
            if(hitData.dir == 'right'){
                g_level = util.getNextLevel(g_level);
                spawn = 0;
            } else{
                g_level = util.getPrevLevel(g_level);
                spawn = 1;
            } 
        }
        this.resolve(hitData);
        hitData = this.findCollision()
    }
}
