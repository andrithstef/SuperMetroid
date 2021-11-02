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
Player.prototype.AIM_UP = 16; //SHIFT
Player.prototype.AIM_DOWN = 17; //CTRL
Player.prototype.JUMP = " ".charCodeAt(0);
Player.prototype.SHOOT = 13; //ENTER

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

Player.prototype.stance = 1;
Player.prototype.animationFrame = 0;
Player.prototype.framenr = 0;
Player.prototype.framestoAnimationFrame = 5;

Player.prototype.bulletX = this.cx;
Player.prototype.bulletY = this.cy;
Player.prototype.bulletVelX = 1;
Player.prototype.bulletVelY = 0;

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


    this.getStance();

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
    if ((g_keys[this.AIM_UP] && g_keys[this.AIM_DOWN]) 
    || (!g_keys[this.AIM_UP] && !g_keys[this.AIM_DOWN] )){
        this.Ydirection = 0;
    }
    else if (g_keys[this.AIM_UP]){
        this.Ydirection = -1;
    }
    else if (g_keys[this.AIM_DOWN]){
        this.Ydirection = 1;
    }
    this.Ydirection = Math.sign(this.Ydirection);
    entityManager.addBullet(this.bulletX, this.bulletY, this.Xdirection, this.Ydirection);
}

Player.prototype.getStance = function(){
    if (this.velX < 0.01 && this.velX > 0){
        //Standing still, looking right
        if (g_keys[this.AIM_UP]){
            this.stance = 4;
        }
        else if (g_keys[this.AIM_DOWN]){
            this.stance = 5;
        }
        else{
            this.stance = 1;
        }
    }

    else if (this.velX < 0 && this.velX > -0.01){
        //Standing still, looking left
        if (g_keys[this.AIM_UP]){
            this.stance = 6;
        }
        else if (g_keys[this.AIM_DOWN]){
            this.stance = 7;
        }
        else{
            this.stance = 0;
        }
    }
    else if (this.velX > 0){
        this.stance = 2;
    }
    else if (this.velX < 0){
        this.stance = 3;
    }
}

Player.prototype.getSprite = function(){
    if (this.stance === 1){
        //Looking right
        this.halfHeight = 42;
        this.halfWidth = 24;

        this.bulletX  = this.cx + 10;
        this.bulletY = this.cy - 9;
        return{
            x : 243,
            y : 18,
            w : 24,
            h : 42
        } 
    }
    else if (this.stance === 0){
        //looking left
        this.halfHeight = 42;
        this.halfWidth = 25;

        this.bulletX  = this.cx - 10;
        this.bulletY = this.cy - 9;
        return{
            x : 242,
            y : 77,
            w : 25,
            h : 42
        }
    }
    else if (this.stance === 2){
        //running right
        this.halfHeight = 41;
        this.halfWidth = 34;

        this.bulletX  = this.cx + 10;
        this.bulletY = this.cy - 9;
        return{
            x : this.dists[0][this.animationFrame],
            y : 267,
            w : this.widths[0][this.animationFrame],
            h : 41
        } 
    }
    else if (this.stance === 3){
        //running left
        this.halfHeight = 41;
        this.halfWidth = 34;

        this.bulletX  = this.cx - 10;
        this.bulletY = this.cy - 9;
        return{
            x : this.dists[1][this.animationFrame],
            y : 325,
            w : this.widths[1][this.animationFrame],
            h : 41
        } 
    }
    else if (this.stance === 4){
        //Aiming right, up
        this.halfHeight = 47;
        this.halfWidth = 31;

        this.bulletX  = this.cx - 8;
        this.bulletY = this.cy - 7;
        return{
            x : 110,
            y : 13,
            w : 31,
            h : 47
        } 
    }
    else if (this.stance === 5){
        //Aiming right, down
        this.halfHeight = 41;
        this.halfWidth = 30;

        this.bulletX  = this.cx + 18;
        this.bulletY = this.cy - 6;
        return{
            x : 504,
            y : 19,
            w : 30,
            h : 41
        } 
    }
    else if (this.stance === 6){
        //Aiming left, up
        this.halfHeight = 48;
        this.halfWidth = 31;

        this.bulletX  = this.cx - 23;
        this.bulletY = this.cy - 40;
        return{
            x : 102,
            y : 71,
            w : 31,
            h : 48
        } 
    }
    else if (this.stance === 7){
        //Aiming left, down
        this.halfHeight = 41;
        this.halfWidth = 30;

        this.bulletX  = this.cx - 22;
        this.bulletY = this.cy;
        return{
            x : 504,
            y : 78,
            w : 30,
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
