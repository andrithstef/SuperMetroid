function Player(descr){
    this.setup(descr);

}
Player.prototype = new Entity();

Player.prototype.GO_LEFT = 'A'.charCodeAt(0); 
Player.prototype.GO_RIGHT = 'D'.charCodeAt(0); 
Player.prototype.JUMP = " ".charCodeAt(0);

Player.prototype.gravity = 0.6;
Player.prototype.accel = 1.5;
Player.prototype.friction = 0.4;
Player.prototype.maxSpeed = 15;
Player.prototype.jumpSpeed = 15;
Player.prototype.cx = 100;
Player.prototype.cy = 600;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.halfWidth = 10;
Player.prototype.halfHeight = 16;

Player.prototype.shape = "Rect";




Player.prototype.update = function(du){
    spatialManager.unregister(this);

    if (!g_keys[this.GO_LEFT] && !g_keys[this.GO_RIGHT] || 
        g_keys[this.GO_LEFT] && g_keys[this.GO_RIGHT]){
            //Slow down over time
            this.velX *= (1-this.friction);
        }
    else if (g_keys[this.GO_LEFT]){
        //Move left
        this.velX -= this.accel * du;
    }
    else if (g_keys[this.GO_RIGHT]){
        //move right
        this.velX += this.accel * du;
    }

    //jump
    if (g_keys[this.JUMP]){
        //Check if on ground
        this.jump();
    }

    //apply gravity
    this.velY += this.gravity*du;


    //correct velocity
    //X
    if (this.velX > this.maxSpeed){
        this.velX = this.maxSpeed;
    }
    else if (this.velX < -this.maxSpeed){
        this.velX = -this.maxSpeed;
    }

    //Y
    if (this.velY > this.maxSpeed){
        this.velY = this.maxSpeed;
    }
    else if (this.velY < -this.maxSpeed){
        this.velY = -this.maxSpeed;
    }

    var nextY = this.cy + this.velY * du;
    var nextX = this.cx + this.velX * du;

    //Check collisions with floor
    var hitData = this.hitsMap(nextX, nextY+this.halfHeight);
    if(!hitData.hits){
        this.cy = nextY;
    }
    else{
        this.cy = hitData.tileY*g_map.tileHeight - this.halfHeight;
    }



    //Check collisions with walls
    var dir = Math.sign(this.velX);
    var hitData = this.hitsMap(nextX + dir*this.halfWidth, nextY);
    if (!hitData.hits){
        this.cx = nextX;
    }
    else{
        if (dir === -1){
            this.cx = (hitData.tileX+1)*g_map.tileWidth + this.halfWidth;
        }
        else{
            this.cx = hitData.tileX*g_map.tileWidth - this.halfWidth;
        }
        
    }

    spatialManager.register(this);

}

Player.prototype.render = function(ctx){
    util.fillBox(ctx, this.cx-this.halfWidth, this.cy-this.halfHeight, 2*this.halfWidth, 2*this.halfHeight,"red");
}

Player.prototype.jump = function(){
    this.velY = -this.jumpSpeed;
}

Player.prototype.hitsMap = function(x,y){
    return g_map.collidesWith(x,y,0,0);
}
