function Player(){

}

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


Player.prototype.update = function(du){

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


    this.cy += this.velY * du;
    this.cx += this.velX * du;
}

Player.prototype.render = function(ctx){
    ctx.fillRect(this.cx-this.halfWidth, this.cy-this.halfHeight, 2*this.halfWidth, 2*this.halfHeight);
}

Player.prototype.jump = function(){
    this.velY = -this.jumpSpeed;
}