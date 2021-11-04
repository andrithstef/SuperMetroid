function Player(descr){
    this.setup(descr);

}

const spriteSheet = new Image();
spriteSheet.src = "resrc/samus_sprite_sheet.gif"

Player.prototype = new Entity();


Player.prototype.GO_LEFT = 'A'.charCodeAt(0); 
Player.prototype.GO_RIGHT = 'D'.charCodeAt(0); 
Player.prototype.GO_UP = 'W'.charCodeAt(0); 
Player.prototype.GO_DOWN = 'S'.charCodeAt(0); 
Player.prototype.AIM_UP = 'E'.charCodeAt(0); 
Player.prototype.AIM_DOWN = 'Q'.charCodeAt(0); 
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

Player.prototype.movingJump = false;
Player.prototype.rotation = 1;
Player.prototype.rotationSpeed = 0.25;

Player.prototype.hasShot = false;

Player.prototype.halfWidth = 23;
Player.prototype.halfHeight = 50;

Player.prototype.isGrounded = false;
Player.prototype.jumpFrame = 0;

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

Player.prototype.bulletXvel;
Player.prototype.bulletYvel;

Player.prototype.spriteData;


Player.prototype.update = function(du){
    spatialManager.unregister(this);

    if (this.movingJump){
        if (this.Xdirection > 0){
            this.rotation += this.rotationSpeed*du;
        }
        else{
            this.rotation -= this.rotationSpeed*du;
        }
    }

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
        //TODO : Check if on ground
        this.jump();
        this.isGrounded = false;
        this.framenr = 0;
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

    if (this.velX < 0.1 && this.velX > -0.01){
        this.velX = 0;
        this.movingJump = 0;
    }

    var oldX = this.cx, oldY = this.cy;
    var nextY = this.cy + this.velY * du;
    var nextX = this.cx + this.velX * du;

    //make sure we dont fall off the level for testing
    if (nextX > g_canvas.width || nextX< 0){
        nextX = oldX;
    }
    if (nextY < 0){
        nextY=oldY;
    }

    //Shoot
    if (eatKey(this.SHOOT)){
        this.shoot();
    }

    this.getStance();

    //Check collisions with floor
    var dir = Math.sign(this.velY)
    var hitData = this.hitsMap(nextX, nextY+dir*this.halfHeight)
    if(!hitData.hits){
        this.cy = nextY;
    }
    else{
        this.isGrounded = true;
        this.movingJump = false;
        if (dir > 0){
            this.cy = hitData.tileY*g_map.tileHeight - this.halfHeight;
        }
    }


    //Check collisions with walls
    var hitData = this.hitsMap(nextX + this.Xdirection*this.halfWidth, nextY);
    if (!hitData.hits){
        this.cx = nextX;
    }
    else{
        if (this.Xdirection < 0){
            this.cx = (hitData.tileX+1)*g_map.tileWidth + this.halfWidth;
        }
        else{
            this.cx = hitData.tileX*g_map.tileWidth - this.halfWidth;
        }
    }

    this.updateAnimationFrame();
    this.spriteData = this.getSprite();
    spatialManager.register(this);

}

Player.prototype.render = function(ctx){
    ctx.save();
    ctx.translate(this.cx, this.cy);
    ctx.rotate(this.rotation);
    ctx.translate(-this.cx, -this.cy);
    ctx.drawImage(spriteSheet,this.spriteData.x,
        this.spriteData.y, this.spriteData.w,
        this.spriteData.h,this.cx-this.halfWidth,
        this.cy-this.halfHeight,2*this.spriteData.w,2*this.spriteData.h);
    ctx.restore();
}

Player.prototype.jump = function(){
    if (this.velX > 0.01 || this.velX < -0.01){
        this.movingJump = true;
    }
    this.isGrounded = false;
    this.velY = -this.jumpSpeed;
    this.hasShot = false;
    this.framenr = 0;
    this.animationFrame = 0;
}

Player.prototype.hitsMap = function(x,y){
    return g_map.collidesWith(x,y);
}

Player.prototype.shoot = function(){
    this.hasShot = true;
    entityManager.addBullet(this.bulletX, this.bulletY, this.bulletXvel, this.bulletYvel);
}

Player.prototype.getStance = function(){
    //Player is standing still looking right
    //Finished
    if (this.velX === 0){
        if (this.Xdirection > 0){
            if (!this.isGrounded){
                if (g_keys[this.GO_UP]){
                    this.stance = 26;
                }
                else if (g_keys[this.AIM_UP]){
                    this.stance = 24;
                }
                else if (g_keys[this.AIM_DOWN]){
                    this.stance = 28;
                }
                else if (g_keys[this.GO_DOWN]){
                    this.stance = 30;
                }
                else if (this.hasShot){
                    this.stance = 22;
                }
                else{
                    this.stance = 18;
                }
            }
            else if (g_keys[this.GO_DOWN]){
                if (g_keys[this.AIM_UP]){
                    this.stance = 12;
                }
                else if (g_keys[this.AIM_DOWN]){
                    this.stance = 14;
                }
                else if (g_keys[this.GO_UP]){
                    this.stance = 16;
                }
                else{
                    this.stance = 10;
                }
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
        else if (this.Xdirection < 0){
            //Standing still, looking left
            //Finished
            if (!this.isGrounded){
                if (g_keys[this.GO_UP]){
                    this.stance = 27;
                }
                else if (g_keys[this.AIM_UP]){
                    this.stance = 25;
                }
                else if (g_keys[this.AIM_DOWN]){
                    this.stance = 29;
                }
                else if (g_keys[this.GO_DOWN]){
                    this.stance = 31;
                }
                else if (this.hasShot){
                    this.stance = 23;
                }
                else{
                    this.stance = 19;
                }
            }
            else if (g_keys[this.GO_DOWN]){
                if (g_keys[this.AIM_UP]){
                    this.stance = 13;
                }
                else if (g_keys[this.AIM_DOWN]){
                    this.stance = 15;
                }
                else if (g_keys[this.GO_UP]){
                    this.stance = 17;
                }
                else{
                    this.stance = 11;
                }
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
    }

    //Player is running right, unfinished
    else if (this.velX > 0){
        if (!this.isGrounded){
            if (g_keys[this.GO_UP]){
                this.stance = 26;
            }
            else if (g_keys[this.AIM_UP]){
                this.stance = 24;
            }
            else if (g_keys[this.AIM_DOWN]){
                this.stance = 28;
            }
            else if (g_keys[this.GO_DOWN]){
                this.stance = 30;
            }
            else if (this.hasShot){
                this.stance = 22;
            }
            else{
                this.stance = 36;
            }
        }
        else if (g_keys[this.GO_UP]){
            this.stance = 32;
        }
        else if (g_keys[this.GO_DOWN]){
            this.stance = 34;
        }
        else if (this.hasShot){
            this.stance = 20;
        }
        else{
            this.stance = 2;
        }
    }
    //Player is running left, unfinished
    else if (this.velX < 0){
        if (!this.isGrounded){
            if (g_keys[this.GO_UP]){
                this.stance = 27;
            }
            else if (g_keys[this.AIM_UP]){
                this.stance = 25;
            }
            else if (g_keys[this.AIM_DOWN]){
                this.stance = 29;
            }
            else if (g_keys[this.GO_DOWN]){
                this.stance = 31;
            }
            else if (this.hasShot){
                this.stance = 23;
            }
            else{
                this.stance = 37;
            }
        }
        else if (g_keys[this.GO_UP]){
            this.stance = 33;
        }
        else if (g_keys[this.GO_DOWN]){
            this.stance = 35;
        }
        else if (this.hasShot){
            this.stance = 21;
        }
        else{
            this.stance = 3;
        }
    }
    if (!(this.stance === 3 || this.stance === 2 || this.stance >= 20)){
        this.hasShot = false;
    }
    if (!(this.stance === 36 || this.stance === 37)){
        this.rotation = 0;
    }
    console.log(this.stance);
}

Player.prototype.getSprite = function(){
    console.log(this.stance);
    switch(this.stance){
        case 1:
            //Looking right
            this.halfHeight = 43;
            this.halfWidth = this.widths[1][this.animationFrame];

            this.bulletXvel = 1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx + 10;
            this.bulletY = this.cy - 9;
            return{
                x : this.dists[1][this.animationFrame],
                y : 18,
                w : this.widths[1][this.animationFrame],
                h : 43
            }

        case 0:
            //looking left
            this.halfHeight = 43;
            this.halfWidth = this.widths[0][this.animationFrame];

            this.bulletXvel = -1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx - 10;
            this.bulletY = this.cy - 9;
            return{
                x : this.dists[0][this.animationFrame],
                y : 77,
                w : this.widths[0][this.animationFrame],
                h : 43
            }

        case 2:
            //running right
            this.halfHeight = 41;
            this.halfWidth = this.widths[2][this.animationFrame];

            this.bulletXvel = 1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx + 30;
            this.bulletY = this.cy - 16;
            return{
                x : this.dists[2][this.animationFrame],
                y : 267,
                w : this.widths[2][this.animationFrame],
                h : 41
            }

        case 3:
            //running left
            this.halfHeight = 41;
            this.halfWidth = this.widths[3][this.animationFrame];

            this.bulletXvel = -1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx - 30;
            this.bulletY = this.cy - 16;
            return{
                x : this.dists[3][this.animationFrame],
                y : 324,
                w : this.widths[3][this.animationFrame],
                h : 41
            }
        case 4:
            //Aiming right, up
            this.halfHeight = 48;
            this.halfWidth = 32;

            this.bulletXvel = 1;
            this.bulletYvel = -1;

            this.bulletX  = this.cx - 8;
            this.bulletY = this.cy - 7;
            return{
                x : 110,
                y : 13,
                w : 32,
                h : 48
            }

        case 5:
            //Aiming right, down
            this.halfHeight = 42;
            this.halfWidth = 31;

            this.bulletXvel = 1;
            this.bulletYvel = 1;

            this.bulletX  = this.cx + 18;
            this.bulletY = this.cy - 6;
            return{
                x : 504,
                y : 19,
                w : 31,
                h : 42
            }
        case 6:
            //Aiming left, up
            this.halfHeight = 49;
            this.halfWidth = 31;

            this.bulletXvel = -1;
            this.bulletYvel = -1;

            this.bulletX  = this.cx - 23;
            this.bulletY = this.cy - 40;
            return{
                x : 102,
                y : 71,
                w : 31,
                h : 49
            }
        case 7:
            //Aiming left, down
            this.halfHeight = 42;
            this.halfWidth = 30;

            this.bulletXvel = -1;
            this.bulletYvel = 1;

            this.bulletX  = this.cx - 22;
            this.bulletY = this.cy;
            return{
                x : 504,
                y : 78,
                w : 30,
                h : 42
            }
        case 8:
            //Aiming straight up, looking right
            this.halfHeight = 53;
            this.halfWidth = 27;

            this.bulletXvel = 0;
            this.bulletYvel = -1;

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

            this.bulletXvel = 0;
            this.bulletYvel = -1;

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
            this.halfWidth = this.widths[4][this.animationFrame];

            this.bulletXvel = 1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx;
            this.bulletY = this.cy + 3;
            return{
                x : this.dists[4][this.animationFrame],
                y : 29,
                w : this.widths[4][this.animationFrame]+1,
                h : 31
            }
        case 11:
            //Kneeling , looking left
            this.halfHeight = 31;
            this.halfWidth = this.widths[5][this.animationFrame];

            this.bulletXvel = -1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx;
            this.bulletY = this.cy+3;
            return{
                x : this.dists[5][this.animationFrame],
                y : 88,
                w : this.widths[5][this.animationFrame],
                h : 31
            }
        case 12:
            //Kneeling, right, up
            this.halfHeight = 36;
            this.halfWidth = 28;

            this.bulletXvel = 1;
            this.bulletYvel = -1;

            this.bulletX  = this.cx + 18;
            this.bulletY = this.cy - 26;
            return{
                x : 194,
                y : 24,
                w : 28,
                h : 36
            }
        case 13:
            //Kneeling, left, up
            this.halfHeight = 37;
            this.halfWidth = 28;

            this.bulletXvel = -1;
            this.bulletYvel = -1;

            this.bulletX  = this.cx - 20;
            this.bulletY = this.cy - 31;
            return{
                x : 190,
                y : 82,
                w : 28,
                h : 37
            }
        case 14:
            //Kneeling, right, down
            this.halfHeight = 31;
            this.halfWidth = 27;

            this.bulletXvel = 1;
            this.bulletYvel = 1;

            this.bulletX  = this.cx +18;
            this.bulletY = this.cy +10;
            return{
                x : 579,
                y : 30,
                w : 27,
                h : 31
            }
        case 15:
            //Kneeling, left, down
            this.halfHeight = 31;
            this.halfWidth = 27;

            this.bulletXvel = -1;
            this.bulletYvel = 1;

            this.bulletX  = this.cx - 15;
            this.bulletY = this.cy +10;
            return{
                x : 584,
                y : 89,
                w : 27,
                h : 31
            }
        case 16:
            //Kneeling, right, straight up
            this.halfHeight = 43;
            this.halfWidth = 18;

            this.bulletXvel = 0;
            this.bulletYvel = -1;

            this.bulletX  = this.cx;
            this.bulletY = this.cy - 45;
            return{
                x : 71,
                y : 18,
                w : 18,
                h : 43
            }
        case 17:
            //Kneeling, left, straight up
            this.halfHeight = 43;
            this.halfWidth = 18;

            this.bulletXvel = 0;
            this.bulletYvel = -1;

            this.bulletX  = this.cx;
            this.bulletY = this.cy - 45;
            return{
                x : 73,
                y : 77,
                w : 18,
                h : 43
            }
        case 18:
            //jumping right
            this.halfHeight = 44;
            this.halfWidth = this.widths[6][this.animationFrame];

            this.bulletXvel = 1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx + 5;
            this.bulletY = this.cy;
            return{
                x : this.dists[6][this.animationFrame],
                y : 137,
                w : this.widths[6][this.animationFrame],
                h : 44
            }
        case 19:
            //jumping left
            this.halfHeight = 44;
            this.halfWidth = this.widths[7][this.animationFrame];

            this.bulletXvel = -1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx - 5;
            this.bulletY = this.cy;
            return{
                x : this.dists[7][this.animationFrame],
                y : 192,
                w : this.widths[7][this.animationFrame],
                h : 44
            }
        case 20: 
            //Running right, shooting
            this.halfHeight = 43;
            this.halfWidth = this.widths[8][this.animationFrame];

            this.bulletXvel = 1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx + 30;
            this.bulletY = this.cy - 16;
            return{
                x : this.dists[8][this.animationFrame],
                y : 378,
                w : this.widths[8][this.animationFrame],
                h : 43
            }
        case 21: 
            //running left, shooting
            this.halfHeight = 43;
            this.halfWidth = this.widths[9][this.animationFrame];

            this.bulletXvel = -1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx - 30;
            this.bulletY = this.cy - 16;
            return{
                x : this.dists[9][this.animationFrame],
                y : 433,
                w : this.widths[9][this.animationFrame],
                h : 43
            }
        case 22: 
            //Jupming right, shooting
            this.halfHeight = 35;
            this.halfWidth = 21;

            this.bulletXvel = 1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx + 10;
            this.bulletY = this.cy;
            return{
                x : 380,
                y : 148,
                w : 21,
                h : 35
            }
        case 23: 
            //jumping left, shooting
            this.halfHeight = 35;
            this.halfWidth = 21;

            this.bulletXvel = -1;
            this.bulletYvel = 0;

            this.bulletX  = this.cx - 10;
            this.bulletY = this.cy;
            return{
                x : 381,
                y : 203,
                w : 21,
                h : 35
            }
        case 24: 
            //Jupming right, shooting vertically up
            this.halfHeight = 37;
            this.halfWidth = 26;

            this.bulletXvel = 1;
            this.bulletYvel = -1;

            this.bulletX  = this.cx + 17;
            this.bulletY = this.cy - 25;
            return{
                x : 342,
                y : 143,
                w : 26,
                h : 37
            }
        case 25: 
            //jumping left, shooting vertically up
            this.halfHeight = 37;
            this.halfWidth = 26;

            this.bulletXvel = -1;
            this.bulletYvel = -1;

            this.bulletX  = this.cx - 17;
            this.bulletY = this.cy -25;
            return{
                x : 344,
                y : 198,
                w : 26,
                h : 37
            }
        case 26: 
            //Jupming right, shooting straight up
            this.halfHeight = 43;
            this.halfWidth = 21;

            this.bulletXvel = 0;
            this.bulletYvel = -1;

            this.bulletX  = this.cx;
            this.bulletY = this.cy - 25;
            return{
                x : 311,
                y : 137,
                w : 21,
                h : 43
            }
        case 27: 
            //jumping left, shooting straight up
            this.halfHeight = 43;
            this.halfWidth = 21;

            this.bulletXvel = 0;
            this.bulletYvel = -1;

            this.bulletX  = this.cx + 3;
            this.bulletY = this.cy -25;
            return{
                x : 309,
                y : 192,
                w : 21,
                h : 43
            }
        case 28: 
            //Jupming right, shooting vertically down
            this.halfHeight = 35;
            this.halfWidth = 25;

            this.bulletXvel = 1;
            this.bulletYvel = 1;

            this.bulletX = this.cx + 8;
            this.bulletY = this.cy;
            return{
                x : 412,
                y : 148,
                w : 25,
                h : 35
            }
        case 29: 
            //jumping left, shooting vertically down
            this.halfHeight = 35;
            this.halfWidth = 25;

            this.bulletXvel = -1;
            this.bulletYvel = 1;

            this.bulletX = this.cx - 8;
            this.bulletY = this.cy;
            return{
                x : 412,
                y : 203,
                w : 25,
                h : 35
            }
        case 30: 
            //Jupming right, shooting vertically down
            this.halfHeight = 34;
            this.halfWidth = 21;

            this.bulletXvel = 0;
            this.bulletYvel = 1;

            this.bulletX = this.cx + 10;
            this.bulletY = this.cy + 18;
            return{
                x : 446,
                y : 150,
                w : 21,
                h : 34
            }
        case 31: 
            //jumping left, shooting vertically down
            this.halfHeight = 34;
            this.halfWidth = 21;

            this.bulletXvel = 0;
            this.bulletYvel = 1;

            this.bulletX = this.cx - 10;
            this.bulletY = this.cy + 18;
            return{
                x : 449,
                y : 205,
                w : 21,
                h : 34
            }
        case 32: 
            //Running right, shooting vertically up
            this.halfHeight = 47;
            this.halfWidth = this.widths[10][this.animationFrame];

            this.bulletXvel = 1;
            this.bulletYvel = -1;

            this.bulletX = this.cx + 35;
            this.bulletY = this.cy - 40;
            return{
                x : this.dists[10][this.animationFrame],
                y : 262,
                w : this.widths[10][this.animationFrame],
                h : 47
            }
        case 33: 
            //Running left, shooting vertically up
            this.halfHeight = 47;
            this.halfWidth = this.widths[11][this.animationFrame];

            this.bulletXvel = -1;
            this.bulletYvel = -1;

            this.bulletX = this.cx - 35;
            this.bulletY = this.cy - 40;
            return{
                x : this.dists[11][this.animationFrame],
                y : 319,
                w : this.widths[11][this.animationFrame],
                h : 47
            }
        case 34: 
            //Running right, shooting vertically down
            this.halfHeight = 42;
            this.halfWidth = this.widths[12][this.animationFrame]+1;

            this.bulletXvel = 1;
            this.bulletYvel = 1;

            this.bulletX = this.cx + 35;
            this.bulletY = this.cy;
            return{
                x : this.dists[12][this.animationFrame],
                y : 379,
                w : this.widths[12][this.animationFrame]+1,
                h : 42
            }
        case 35: 
            //Running left, shooting vertically down
            this.halfHeight = 42;
            this.halfWidth = this.widths[13][this.animationFrame]+1;

            this.bulletXvel = -1;
            this.bulletYvel = 1;

            this.bulletX = this.cx - 35;
            this.bulletY = this.cy;
            return{
                x : this.dists[13][this.animationFrame],
                y : 434,
                w : this.widths[13][this.animationFrame]+1,
                h : 42
            }
        case 36: 
            //Running right, jump;
            this.halfHeight = 44;
            this.halfWidth = this.widths[14][this.animationFrame]+1;

            this.bulletXvel = 1;
            this.bulletYvel = 0;

            this.bulletX = this.cx + 35;
            this.bulletY = this.cy;
            return{
                x : this.dists[14][this.animationFrame],
                y : 137,
                w : this.widths[14][this.animationFrame]+1,
                h : 44
            }
        case 37: 
            //Running left, shooting vertically down
            this.halfHeight = 44;
            this.halfWidth = this.widths[15][this.animationFrame]+1;

            this.bulletXvel = -1;
            this.bulletYvel = 0;

            this.bulletX = this.cx - 35;
            this.bulletY = this.cy;
            return{
                x : this.dists[15][this.animationFrame],
                y : 192,
                w : this.widths[15][this.animationFrame]+1,
                h : 44
            }
    }
}

Player.prototype.updateAnimationFrame = function(){
    if (!this.isGrounded){
        if (this.velY < 0){
            if (this.movingJump) return this.getMovingUpAnimationFrame();
            this.getUpAnimationFrame();
            return;
        }
        this.getDownAnimationFrame();
        return;
    }
    this.framenr += 1;
    if (this.framenr >= this.framestoAnimationFrame){
        this.animationFrame += 1;
        this.framenr = 0;
        this.animationFrame %= 10;
    }
}

Player.prototype.getUpAnimationFrame = function(){
    this.framenr += 1;
    if (this.framenr >= this.framestoAnimationFrame){
        if (this.animationFrame < 2) this.animationFrame += 1;
        this.framenr = 0;
    }
}

Player.prototype.getDownAnimationFrame = function(){
    this.framenr += 1;
    if (this.framenr >= this.framestoAnimationFrame){
        if (this.animationFrame < 6) this.animationFrame += 1;
        this.framenr = 0;
    }
}

Player.prototype.getMovingUpAnimationFrame = function(){
    this.framenr += 1;
    if (this.framenr >= this.framestoAnimationFrame){
        if (this.animationFrame < 3) this.animationFrame += 1;
        this.framenr = 0;
    }
}


//Sprite sheet sizes
Player.prototype.widths = [
    [26, 26, 26, 26, 26, 26, 26, 26, 26, 26], //looking left
    [26, 26, 26, 26, 26, 26, 26, 26, 26, 26], //looking right
    [17, 22, 28, 34, 31, 18, 24, 28, 34, 31], //running right
    [17, 22, 28, 34, 31, 18, 24, 28, 34, 31],  //running left
    [21, 21, 21, 21, 21, 21, 21, 21, 21, 21], //kneeling right
    [21, 21, 21, 21, 21, 21, 21, 21, 21, 21],  //kneeling left
    [18, 17, 22, 18, 18, 17, 21, 18, 19], //jumping right
    [18, 17, 22, 19, 19, 19, 21, 18, 19], //jumping left
    [28, 32, 35, 37, 36, 29, 31, 35, 39, 37], //Running right, shooting
    [28, 32, 35, 37, 36, 29, 31, 35, 39, 37],  //Running left, shooting
    [26, 30, 33, 35, 34, 27, 29, 33, 36, 35], //Running right, shooting up
    [26, 30, 33, 35, 34, 27, 29, 33, 36, 35], //Running left, shooting up
    [26, 29, 32, 34, 33, 26, 28, 32, 35, 34], //Running right, shooting down
    [26, 29, 32, 34, 33, 26, 28, 32, 35, 34],  //Running left, shooting down
    [18, 17, 22, 18, 18, 17, 21, 20, 20], //running right jumping
    [18, 17, 22, 18, 18, 17, 21, 20, 20]  //running left jumping
];

Player.prototype.dists = [
    [242, 242, 242, 274, 274, 274, 306, 306, 306, 306], //looking left
    [243, 243, 243, 276, 276, 276, 308, 308, 308, 308], //looking right
    [9,36,67,105,149,191,222,252,290,337],  //running right
    [8,36,68,107,150,187,214,246,284,328],   //running left
    [397, 397, 397, 427, 427, 427, 458, 458, 458, 458], //kneeling right
    [391, 391, 391, 426, 426, 426, 460, 460, 460, 460],  //kneeling left
    [9, 37, 66, 98, 125, 155, 184, 219, 250], //jumping right
    [9, 40, 70, 160, 131, 102, 188, 217, 245], //Jumping left
    [8, 46, 89, 135, 180, 225, 263, 300, 344, 395], //Running right, shooting
    [8, 44, 84, 128, 175, 220, 258, 298, 343, 391],  //Running left, shooting
    [394, 428, 468, 511, 558, 605, 642, 682, 724, 776], //Running right, shooting up
    [375, 410, 451, 498, 546, 588, 625, 665, 712, 765],  //Running left, shooting up
    [457, 493, 529, 571, 616, 659, 696, 733, 773, 820], //Running right, shooting down
    [582, 545, 462, 504, 618, 659, 692, 730, 772, 815],  //Running left, shooting down
    [9, 37, 66, 98, 125, 155, 184, 219, 250], //running right jumping
    [9, 40, 70, 102, 131, 160, 188, 217, 245]  //running left jumping
];
