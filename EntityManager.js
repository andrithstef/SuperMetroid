

"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


function EntityManager(){
    //this._map = new Map();
    this._player = new Player();
    this._bullets = [];
    this._enemies = [];
    this._enemies.push(new Enemy());
    this._environment = new Environment();
}

// "PRIVATE" DATA

EntityManager.prototype._player;
EntityManager.prototype._bullets;
EntityManager.prototype._enemies;
EntityManager.prototype._environment;





// "PRIVATE" METHODS

EntityManager.prototype._forEachOf = function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
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

    //update enemies
    for (var i = 0; i<this._enemies.length; i++){
        var status = this._enemies[i].update(du, this._player);

        if (status === this.KILL_ME_NOW){
            this._enemies.splice(i,1);
            i -= 1;
        }
    }
    
    //update level
    this._environment.registerGrid();
},

EntityManager.prototype.render = function(ctx) {


    this._environment.render(ctx);


    //render bullets
    for (var i = 0; i<this._bullets.length; i++){
        this._bullets[i].render(ctx);
    }

    //render enemies
    for (var i = 0; i<this._enemies.length; i++){
        this._enemies[i].render(ctx);
    }

    //render player
    this._player.render(ctx);

}

EntityManager.prototype.addBullet = function(cx, cy, xdir, ydir, nr){
    var xVel = xdir/Math.sqrt(Math.pow(xdir, 2) + Math.pow(ydir, 2));
    var yVel = ydir/Math.sqrt(Math.pow(xdir, 2) + Math.pow(ydir, 2));
    this._bullets.push(new Bullet(cx, cy, xVel, yVel, nr));
}


// Entity.prototype.getSpatialID = function(){
//     return this.spatialID ++;
// }
