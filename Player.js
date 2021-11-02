function Player(descr){
    this.setup(descr);

}

const spriteSheet = new Image();
spriteSheet.src = "https://notendur.hi.is/ats21/samus_sprite_sheet.gif"

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
Player.prototype.maxSpeed = 8;
Player.prototype.jumpSpeed = 17;
Player.prototype.cx = 100;
Player.prototype.cy = 600;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.halfWidth = 23;
Player.prototype.halfHeight = 50;

Player.prototype.isGrounded = false;

//looking left or right?
Player.prototype.Xdirection = 1;
//looking down or up?
Player.prototype.Ydirection = 1;

Player.prototype.shape = "Rect";

Player.prototype.stance = "Standing";
Player.prototype.animationFrame = 0;
Player.prototype.framenr = 0;
Player.prototype.framestoAnimationFrame = 6;

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

    if (this.velX > 0){
        this.Xdirection = 1;
    }
    else if (this.velX < 0){
        this.Xdirection = -1;
    }

    var nextY = this.cy + this.velY * du;
    var nextX = this.cx + this.velX * du;


    if (this.velX < 0.01 && this.velX > -0.01){
        this.velX = 0;
    }

    if (this.velX === 0){
        this.stance = 1;
    }
    else if (this.velX > 0){
        this.stance = 2;
    }
    else if (this.velX < 0){
        this.stance = 3;
    }

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

    this.updateAnimationFrame();

    spatialManager.register(this);

}

Player.prototype.render = function(ctx){
    var s = this.getSprite();
    ctx.drawImage(spriteSheet,s.x,s.y,s.w,s.h,this.cx-this.halfWidth,this.cy-this.halfHeight,2*s.w,2*s.h);
    //util.fillBox(ctx, this.cx-this.halfWidth, this.cy-this.halfHeight, 2*this.halfWidth, 2*this.halfHeight,"red");
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

Player.prototype.getSprite = function(){
    if (this.stance === 1){
        this.halfHeight = 50;
        this.halfWidth = 23;
        return{
            x : 732,
            y : 193,
            w : 23,
            h : 50
        }
    }
    else if (this.stance === 2){
        this.halfHeight = 41;
        this.halfWidth = 17;
        return{
            x : this.dists[0][this.animationFrame],
            y : 267,
            w : this.widths[0][this.animationFrame],
            h : 41
        } 
    }
    else if (this.stance === 3){
        this.halfHeight = 41;
        this.halfWidth = 17;
        return{
            x : this.dists[1][this.animationFrame],
            y : 325,
            w : this.widths[1][this.animationFrame],
            h : 41
        } 
    }
}

Player.prototype.updateAnimationFrame = function(){
    this.framenr += 1;;
    if (this.framenr === this.framestoAnimationFrame){
        this.animationFrame += 1;
        this.framenr = 0;
        this.animationFrame %= 10;
    }
}


//Sprite sheet sizes 
Player.prototype.widths = [
    [17, 22, 28, 34, 31, 18, 24, 28, 34, 31], //running right
    [17, 22, 28, 34, 31, 18, 24, 28, 34, 31]  //running left
];
Player.prototype.dists = [
    [9,36,67,105,149,191,222,252,290,337],  //running right
    [8,36,68,107,150,187,214,246,284,328]   //running left
];
