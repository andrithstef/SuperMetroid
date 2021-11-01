function Player(){

}

Player.prototype.GO_LEFT = 'A'.charCodeAt(0); 
Player.prototype.GO_RIGHT = 'D'.charCodeAt(0); 
Player.prototype.JUMP = " ".charCodeAt(0);

Player.prototype.gravity = 1;
Player.prototype.speed = 10;
Player.prototype.jumpSpeed = 10;
Player.prototype.cx = 100;
Player.prototype.cy = 100;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.halfWidth = 10;
Player.prototype.halfHeight = 16;

Player.prototype.isFalling = false;

Player.prototype.update = function(du){
    this.velX = 0;
    if (g_keys[this.JUMP] && !this.isFalling){
        this.jump();
    }

    if (this.isFalling){
        this.fall(du);
    }

    if (g_keys[this.GO_LEFT]){
        this.velX -= this.speed;
    }

    if (g_keys[this.GO_RIGHT]){
        this.cx += this.speed;
    }


    this.cy += this.velY * du;
    this.cx += this.velX * du;
}

Player.prototype.render = function(ctx){
    ctx.fillRect(this.cx-this.halfWidth, this.cy-this.halfHeight, 2*this.halfWidth, 2*this.halfHeight);
}

Player.prototype.fall = function(du){
    this.isFalling = true;
    this.velY += 0.5*this.gravity * du;
}

Player.prototype.jump = function(){
    this.velY = -this.jumpSpeed;
    this.isFalling = true;
}
