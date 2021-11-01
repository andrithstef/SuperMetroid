function Player(descr){
    this.setup(descr);

}
Player.prototype = new Entity();

Player.prototype.GO_LEFT = 'A'.charCodeAt(0); 
Player.prototype.GO_RIGHT = 'D'.charCodeAt(0); 
Player.prototype.GO_UP = 'W'.charCodeAt(0); 
Player.prototype.GO_DOWN = 'S'.charCodeAt(0); 
Player.prototype.JUMP = " ".charCodeAt(0);
Player.prototype.SHOOT = 13;

Player.prototype.gravity = 0.6;
Player.prototype.accel = 1.5;
Player.prototype.friction = 0.4;
Player.prototype.maxSpeed = 17;
Player.prototype.jumpSpeed = 17;
Player.prototype.cx = 100;
Player.prototype.cy = 600;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.halfWidth = 20;
Player.prototype.halfHeight = 40;

Player.prototype.isGrounded = false;

//looking left or right?
Player.prototype.Xdirection = 1;
//looking down or up?
Player.prototype.Ydirection = 1;

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
    if (g_keys[this.JUMP] && this.isGrounded){
        //Check if on ground
        this.jump();
        this.isGrounded = false;
    }

    //apply gravity
    this.velY += this.gravity*du;

    //Shoot 
    if (eatKey(this.SHOOT)){
        this.shoot();
    }

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

    if (this.velX > 0){
        this.Xdirection = 1;
    }
    else if (this.velX < 0){
        this.Xdirection = -1;
    }

    var nextY = this.cy + this.velY * du;
    var nextX = this.cx + this.velX * du;

    //Check collisions with floor
    var dir = Math.sign(this.velY);
    var hitData = this.hitsMap(nextX, nextY+dir*this.halfHeight)
    if(!hitData.hits){
        this.cy = nextY;
    }
    else{
        this.isGrounded = true;
        if (dir === 1){
            this.cy = hitData.tileY*g_map.tileHeight - this.halfHeight;
        }
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
    return g_map.collidesWith(x,y);
}

Player.prototype.shoot = function(){
    if ((g_keys[this.GO_UP] && g_keys[this.GO_DOWN]) 
    || (!g_keys[this.GO_UP] && !g_keys[this.GO_DOWN] )){
        this.Ydirection = 0;
    }
    else if (g_keys[this.GO_UP]){
        this.Ydirection = -1;
    }
    else if (g_keys[this.GO_DOWN]){
        this.Ydirection = 1;
    }
    this.Ydirection = Math.sign(this.Ydirection);
    entityManager.addBullet(this.cx, this.cy, this.Xdirection, this.Ydirection);
}