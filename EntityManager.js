

"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


function EntityManager(lvl,spawn, energy){
    //this._map = new Map();
    this._bullets = [];
    this._enemies = [];
    this.addEnemies(lvl);
    this._doors = [];
    this.addDoors(lvl);
    this._environment = new Environment(lvl);
    if(lvl.ridley){
        this._enemies.push(new Ridley());
    }
    this._player = new Player(energy, {cx: lvl.player[spawn].x, cy: lvl.player[spawn].y});
    
    if(lvl.foreGround){
        this._foreGround = lvl.foreGround;
    }

}

// "PRIVATE" DATA

EntityManager.prototype._player;
EntityManager.prototype._bullets;
EntityManager.prototype._enemies;
EntityManager.prototype._environment;
EntityManager.prototype._doors;
EntityManager.prototype._foreGround;




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
    if(this._player.nextLevel) return;

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

    //update Doors
    for (var i = 0; i<this._doors.length; i++){
        var status = this._doors[i].update(du);
    }

},

EntityManager.prototype.render = function(ctx) {

    //render environment
    this._environment.render(ctx);

    //render enemies
    for (var i = 0; i<this._enemies.length; i++){
        this._enemies[i].render(ctx);
    }

    //render bullets
    for (var i = 0; i<this._bullets.length; i++){
        this._bullets[i].render(ctx);
    }


    //render player
    this._player.render(ctx);

    for (var i = 0; i<this._doors.length; i++){
        this._doors[i].render(ctx);
    }

    if(this._foreGround){
        this.renderForeGround(ctx);
    }

    //The UI finally gets rendered.
    this.renderUI(ctx);

}

EntityManager.prototype.renderUI = function(ctx){
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("energy: "+ g_energy, g_canvas.width-100, 50);

    if(g_ridley){
        ctx.save();
        ctx.lineWidth = 5;
        ctx.fillStyle = "red";
        ctx.fillRect(g_canvas.width/2-400, g_canvas.height-50, 2*g_Ridley_health, 20);
        ctx.beginPath();
        ctx.rect(g_canvas.width/2-400, g_canvas.height-50, 2*g_Ridley_maxHealth, 20);
        ctx.stroke();
        ctx.restore();
    }
}

EntityManager.prototype.renderForeGround = function(ctx){
    //just draw an image in the same spot
    var s = this._foreGround[1];
    ctx.drawImage(doorSprite,
        s.x,s.y,s.w,s.h,
        this._foreGround[2] - g_camera.cx,this._foreGround[3] - g_camera.cy,
        s.w*1.1,s.h*1.1);
}

EntityManager.prototype.addBullet = function(cx, cy, xdir, ydir, nr){
    //normalize velocity vector and push to _bullets
    var xVel = xdir/Math.sqrt(Math.pow(xdir, 2) + Math.pow(ydir, 2));
    var yVel = ydir/Math.sqrt(Math.pow(xdir, 2) + Math.pow(ydir, 2));
    this._bullets.push(new Bullet(cx, cy, xVel, yVel, nr));
}

EntityManager.prototype.spawnDoor = function(x,y,direction){
    this._doors.push(new Door(x,y,direction));
}

EntityManager.prototype.addDoors = function(lvl){
    if(!lvl.doors) return;
    for (var i = 0; i<lvl.doors.length; i++){
        this.spawnDoor(lvl.doors[i].x,lvl.doors[i].y,lvl.doors[i].direction);
    }
}


EntityManager.prototype.spawnEnemy = function(x,y){
    this._enemies.push(new Enemy(x,y));
}

EntityManager.prototype.addEnemies = function(lvl){
    if(!lvl.enemies) return;
    for (var i = 0; i<lvl.enemies.length; i++){
        this.spawnEnemy(lvl.enemies[i].x, lvl.enemies[i].y);
    }
}