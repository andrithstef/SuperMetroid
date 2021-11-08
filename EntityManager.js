

"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


function EntityManager(){
    this._map = new Map();
    this._player = new Player();
    this._bullets = [];
}

// "PRIVATE" DATA

EntityManager.prototype._player;
EntityManager.prototype._bullets;




// "PRIVATE" METHODS

EntityManager.prototype._forEachOf = function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, udsed by other objects,
// to request the blessed release of death!
//
EntityManager.prototype.KILL_ME_NOW = -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
EntityManager.prototype.deferredSetup = function () {
    this._categories = [];
},

EntityManager.prototype.init = function() {

},

EntityManager.prototype.update = function(du) {
    
    //update bullets
    for (var i = 0; i<this._bullets.length; i++){
        var status = this._bullets[i].update(du);

        if (status === this.KILL_ME_NOW){
            this._bullets.splice(i,1);
            i -= 1;
        }
    }

    //Update player
    this._player.update(du);

    //this.resolveCollisions(du);
    
    this._player.cx = this._player.nextX;
    this._player.cy = this._player.nextY;
    
},

EntityManager.prototype.render = function(ctx) {

    //render Map
    this._map.render(ctx);

    //render bullets
    for (var i = 0; i<this._bullets.length; i++){
        this._bullets[i].render(ctx);
    }

    //render player 
    this._player.render(ctx);
}

EntityManager.prototype.addBullet = function(cx, cy, xdir, ydir){
    var xVel = xdir/Math.sqrt(Math.pow(xdir, 2) + Math.pow(ydir, 2));
    var yVel = ydir/Math.sqrt(Math.pow(xdir, 2) + Math.pow(ydir, 2));
    this._bullets.push(new Bullet(cx, cy, xVel, yVel));
}

Entity.prototype.getSpatialID = function(){
    return this.spatialID ++;
}

EntityManager.prototype.rectVsRect = function(x1, y1, w1, h1, x2, y2, w2, h2){
    //Check if rectangles collide
    return ((x1 < x2 + w2) && (x1 + w1 > x2)
    && (y1 < y2 + h2) && (y1 + h1 > y2));
}

EntityManager.prototype.rayVsRect = function(ray_x, ray_y, ray_dir_x, ray_dir_y, rx, ry, rw, rh){
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
}

EntityManager.prototype.DynamicRectVsRect = function(r1x, r1y, r1w, r1h, r1velX, r1velY, r2x, r2y, r2w, r2h){
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

EntityManager.prototype.hitsMap = function(x,y){
    return this._map.collision(x,y);
}
