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

Player.prototype.isKneeling = false;

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
    if (eatKey(this.JUMP) && this.isGrounded){
        //Check if on ground
        this.jump();
        this.isGrounded = false;
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

    if (this.velX > 0){
        this.Xdirection = 1;
    }
    else if (this.velX < 0){
        this.Xdirection = -1;
    }

    var nextY = this.cy + this.velY * du;
    var nextX = this.cx + this.velX * du;


    this.getStance();

    //Shoot 
    if (eatKey(this.SHOOT)){
        this.shoot();
    }

    if (eatKey(this.GO_DOWN)){
        this.isKneeling = !this.isKneeling;
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
}

Player.prototype.jump = function(){
    this.velY = -this.jumpSpeed;
}

Player.prototype.hitsMap = function(x,y){
    return g_map.collidesWith(x,y);
}

Player.prototype.shoot = function(){
    var bulletXvel = 0;
    var bulletYvel = 0;
    switch(this.stance){
        case 0: 
            bulletXvel = -1;
            bulletYvel = 0;
            break;
        case 1: 
            bulletXvel = 1;
            bulletYvel = 0;
            break;
        case 2: 
            bulletXvel = 1;
            bulletYvel = -1;
            break;
        case 3:
            bulletXvel = -1;
            bulletYvel = -1;
            break;
        case 4: 
            bulletXvel = 1;
            bulletYvel = -1;
            break;
        case 5:
            bulletXvel = 1;
            bulletYvel = 1;
            break;
        case 6: 
            bulletXvel = -1;
            bulletYvel = -1;
            break;
        case 7: 
            bulletXvel = -1;
            bulletYvel = 1;
            break;
        case 8: 
            bulletXvel = 0;
            bulletYvel = -1;
            break;
        case 9: 
            bulletXvel = 0;
            bulletYvel = -1;
            break;
    }
    entityManager.addBullet(this.bulletX, this.bulletY, bulletXvel, bulletYvel);
}

Player.prototype.getStance = function(){
    if (this.velX < 0.01 && this.velX > 0){
        //Standing still, looking right
        if (this.isKneeling){
            this.stance = 10;
        }
        else if (g_keys[this.AIM_UP]){
            this.stance = 4;
        }
        else if (g_keys[this.AIM_DOWN]){
            this.stance = 5;
        }
        else if (g_keys[this.GO_UP]){
            this.stance = 8;
        }
        else{
            this.stance = 1;
        }
    }

    else if (this.velX < 0 && this.velX > -0.01){
        //Standing still, looking left
        if (this.isKneeling){
            this.stance = 11;
        }
        else if (g_keys[this.AIM_UP]){
            this.stance = 6;
        }
        else if (g_keys[this.AIM_DOWN]){
            this.stance = 7;
        }
        else if (g_keys[this.GO_UP]){
            this.stance = 9;
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
    switch(this.stance){
        case 1:
            //Looking right
            this.halfHeight = 42;
            this.halfWidth = 25;

            this.bulletX  = this.cx + 10;
            this.bulletY = this.cy - 9;
            return{
                x : this.dists[1][this.animationFrame],
                y : 18,
                w : this.widths[1][this.animationFrame],
                h : 42
            } 
    
        case 0:
            //looking left
            this.halfHeight = 42;
            this.halfWidth = 25;

            this.bulletX  = this.cx - 10;
            this.bulletY = this.cy - 9;
            return{
                x : this.dists[0][this.animationFrame],
                y : 77,
                w : this.widths[0][this.animationFrame],
                h : 42
            }
        
        case 2:
            //running right
            this.halfHeight = 41;
            this.halfWidth = 34;

            this.bulletX  = this.cx + 10;
            this.bulletY = this.cy - 9;
            return{
                x : this.dists[2][this.animationFrame],
                y : 267,
                w : this.widths[2][this.animationFrame],
                h : 41
            } 

        case 3:
            //running left
            this.halfHeight = 41;
            this.halfWidth = 34;

            this.bulletX  = this.cx - 10;
            this.bulletY = this.cy - 9;
            return{
                x : this.dists[3][this.animationFrame],
                y : 325,
                w : this.widths[3][this.animationFrame],
                h : 41
            } 
        case 4:
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
        
        case 5:
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
        case 6:
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
        case 7:
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
        case 8:
            //Aiming straight up, looking right
            this.halfHeight = 53;
            this.halfWidth = 27;

            this.bulletX  = this.cx;
            this.bulletY = this.cy-45;
            return{
                x : 9,
                y : 7,
                w : 27,
                h : 53
            } 
        case 9:
            //Aiming straight up, looking left
            this.halfHeight = 53;
            this.halfWidth = 19;

            this.bulletX  = this.cx - 6;
            this.bulletY = this.cy - 45;
            return{
                x : 9,
                y : 66,
                w : 19,
                h : 53
            }
        case 10:
            //Kneeling , looking right
            this.halfHeight = 31;
            this.halfWidth = 19;

            this.bulletX  = this.cx - 6;
            this.bulletY = this.cy - 45;
            return{
                x : this.dists[4][this.animationFrame],
                y : 29,
                w : this.widths[4][this.animationFrame],
                h : 31
            }
        case 11:
            //Kneeling , looking left
            this.halfHeight = 31;
            this.halfWidth = 19;

            this.bulletX  = this.cx - 6;
            this.bulletY = this.cy - 45;
            return{
                x : this.dists[5][this.animationFrame],
                y : 88,
                w : this.widths[5][this.animationFrame],
                h : 31
            }
    }
}

Player.prototype.updateAnimationFrame = function(){
    this.framenr += 1;;
    if (this.framenr >= this.framestoAnimationFrame){
        this.animationFrame += 1;
        this.framenr = 0;
        this.animationFrame %= 10;
    }
}


//Sprite sheet sizes 
Player.prototype.widths = [
    [24, 24, 24, 24, 24, 24, 24, 24, 24, 24], //looking left
    [25, 25, 25, 25, 25, 25, 25, 25, 25, 25], //looking right
    [17, 22, 28, 34, 31, 18, 24, 28, 34, 31], //running right
    [17, 22, 28, 34, 31, 18, 24, 28, 34, 31],  //running left
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20], //kneeling right
    [21, 21, 21, 21, 21, 21, 21, 21, 21, 21]  //kneeling left
];
Player.prototype.dists = [
    [242, 242, 242, 274, 274, 274, 306, 306, 306, 306], //looking left
    [243, 243, 243, 276, 276, 276, 308, 308, 308, 308], //looking right
    [9,36,67,105,149,191,222,252,290,337],  //running right
    [8,36,68,107,150,187,214,246,284,328],   //running left
    [397, 397, 397, 427, 427, 427, 458, 458, 458, 458], //kneeling right
    [391, 391, 391, 426, 426, 426, 460, 460, 460, 460]  //kneeling left
];
