

"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


function EntityManager(){
    this._player = new Player();
    this._ground = new Ground();
}

// "PRIVATE" DATA

EntityManager.prototype._player;
EntityManager.prototype._ground;



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
    //Update player
    

    this._player.update(du);
},

EntityManager.prototype.render = function(ctx) {
    //render player 
    this._ground.render(ctx);
    this._player.render(ctx);
}

EntityManager.prototype.checkCollision = function(o1, o2) {
    if (o1.cx + o2.halfWidth + o2.halfWidth > o2.cx && 
        o2.cx + o2.halfWidth + o1.halfWidth > o1.cx && 
        o1.cy + o2.halfHeight + o2.halfHeight > o2.cy && 
        o2.cy + o2.halfHeight + o1.halfHeight > o1.cy){
            return true;
        }
        return false;
}


