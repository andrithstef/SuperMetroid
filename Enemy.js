function Enemy(x,y,descr){
    this.cx = x;
    this.cy = y;
    this.setup(descr);

    this.halfHeight = 50;
    this.halfWidth = 20;

    this.isKillable = true;
    this.isDamaging = true;
}

const enemySheet = new Image();
enemySheet.src = "resrc/enemies_upscaled.png"

Enemy.prototype = new Entity();

Enemy.prototype.cx = 800;
Enemy.prototype.cy = 500;
Enemy.prototype.velX = 0;
Enemy.prototype.velY = 0;
Enemy.prototype.maxSpeed = 14;
Enemy.prototype.walkSpeed = 1;

Enemy.prototype.resolveTries = 0;

Enemy.prototype.seesPlayer = true;
Enemy.prototype.threshold = 300;

Enemy.prototype.spriteData;
Enemy.prototype.animationFrame = 0;
Enemy.prototype.framenr = 0;
Enemy.prototype.framsesToAnimationFrame = 6;
Enemy.prototype.isDead = false;

Enemy.prototype.stance = 0;

Enemy.prototype.shootTimer = 100;
Enemy.prototype.isShooting = false;
Enemy.prototype.shootFrame = 0;

Enemy.prototype.collidable = true;

Enemy.prototype.scale = 1.5;

Enemy.prototype.update = function(du, player){

    spatialManager.unregister(this);

    this.shootTimer -= du;

    if (this.shootTimer < 0 && this.seesPlayer){
        this.isShooting = true;
    }
    
    this.velY += this.gravity*du;

    if (this.velY > this.maxSpeed) this.velY = this.maxSpeed;

    this.findPlayer(player);

    if (this.seesPlayer){
        this.followPlayer(player);
    }
    
    this.nextX = this.cx + this.velX * du;
    this.nextY = this.cy + this.velY * du;

    this.resolveCollisions(du);

    this.cx = this.nextX;
    this.cy = this.nextY;

    this.getStance();
    var dead = this.updateAnimationFrame();

    if(dead){
        return entityManager.KILL_ME_NOW;
    }

    this.spriteData = this.getSprite();
    this.halfHeight *= this.scale;
    this.halfWidth *= this.scale;

    spatialManager.register(this);
}

Enemy.prototype.followPlayer = function(player){
    //Simply tries to go to where the player is
    if (player.cx < this.cx){
        this.velX  = -this.walkSpeed;
    }
    else{
        this.velX = this.walkSpeed;
    }
}

Enemy.prototype.findPlayer = function(player){
    var oldSees = this.seesPlayer;
    //Logic to check if the enemy can see the player
    var sight = 1;
    if (this.seesPlayer) sight *= 2;
    if (player.cy < this.cy + sight*this.threshold && player.cy > this.cy - sight*this.threshold){
        this.seesPlayer = true;
    }
    else{
        this.seesPlayer = false;
        this.velX = 0;
    }
    //Resets shoot timer if enemy sees the player
    if (oldSees != this.seesPlayer) this.shootTimer = 100;
}

Enemy.prototype.shoot = function(){
    entityManager.addBullet(this.cx - g_camera.cx, this.cy - this.halfHeight - g_camera.cy, 0, -1, 2);
    entityManager.addBullet(this.cx + this.halfWidth - g_camera.cx, this.cy - this.halfHeight - g_camera.cy, 1, -1, 2);
    entityManager.addBullet(this.cx - this.halfWidth - g_camera.cx, this.cy - this.halfHeight - g_camera.cy, -1, -1, 2);
    entityManager.addBullet(this.cx + this.halfWidth - g_camera.cx, this.cy - g_camera.cy, 1, 0, 2);
    entityManager.addBullet(this.cx - this.halfWidth - g_camera.cx, this.cy - g_camera.cy, -1, 0, 2);
    this.shootTimer = 100;
    this.isShooting = false;
    gunshot.play();
}

Enemy.prototype.render = function(ctx){
    var s = this.spriteData;
    if(this.cx >= g_camera.cx - this.halfWidth && this.cx <= g_camera.cx + g_camera.width + this.halfWidth &&
        this.cy >= g_camera.cy - this.halfHeight && this.cy <= g_camera.cy + g_camera.height + this.halfHeight) {
        ctx.drawImage(enemySheet,6*s.x,6*s.y,6*s.w,6*s.h,this.cx-this.halfWidth - g_camera.cx,this.cy-this.halfHeight - g_camera.cy,2*s.w*this.scale,2*s.h*this.scale);
    }
    
}

Enemy.prototype.updateAnimationFrame = function(){
    if(this.stance === 3){
        return this.updateShootingAnimationFrame();
    }
    this.framenr += 1;
    if (this.framenr > this.framsesToAnimationFrame){
        this.animationFrame += 1;
        this.framenr = 0;
    }
    if (this.animationFrame > 7 ){
        this.animationFrame -= 7;
    }
}

Enemy.prototype.updateShootingAnimationFrame = function(){
    this.framenr += 1;
    if (this.framenr > this.framsesToAnimationFrame){
        this.animationFrame += 1;
        this.framenr = 0;
    }
    if (this.animationFrame > 2){
        this.animationFrame = 0;
        this.framenr = 0;
        if (this.isDead){
            return this.die();
        }
        else{
            this.shoot();
        }
    }
}

Enemy.prototype.die = function(){
    this.shoot();
    enemyDie.play();
    return entityManager.KILL_ME_NOW;
}

Enemy.prototype.getShot = function(entity){
    if (entity.type != 2){
        this.isDead = true;
    }
}

Enemy.prototype.getSprite = function(){
    switch(this.stance){
        case 0:
            //Idle
            this.halfHeight = 28;
            this.halfWidth = 23;
            return{
                x : 8,
                y : 599,
                w : 31,
                h : 28
            }
        case 1:
            //Walking
            this.halfHeight = 28;
            this.halfWidth = this.widths[0][this.animationFrame];
            return{
                x : this.dists[0][this.animationFrame],
                y : 563,
                w : this.widths[0][this.animationFrame],
                h : 28
            }
        case 2:
            //Walking
            this.halfHeight = 28;
            this.halfWidth = this.widths[0][this.animationFrame];
            return{
                x : this.dists[0][this.animationFrame],
                y : 563,
                w : this.widths[0][this.animationFrame],
                h : 28
            }
        case 3:
            //Expanding
            this.halfHeight = this.widths[1][this.animationFrame];
            this.halfWidth = 23;
            return{
                x : this.dists[1][this.animationFrame],
                y : 626-this.widths[1][this.animationFrame],
                w : 23,
                h : this.widths[1][this.animationFrame]
            }
    }
    
}

Enemy.prototype.getStance = function(){
    var oldStance = this.stance;
    if (this.seesPlayer){
        if (this.isShooting || this.isDead){
            this.stance = 3;
        }
        else if (this.velX < 0){
            this.stance = 1; //walking left
        }
        else if (this.velX > 0){
            this.stance = 2; //walking right
        }
    }
    else{
        this.stance = 0; //idle
    }
    if (oldStance != this.stance){
        this.framenr = 0;
        this.animationFrame = 0;
    }
}

Enemy.prototype.dists = [
    [8, 38, 66, 95, 124, 154, 185, 214], //walking 
    [8, 47, 85] //Expanding
];

Enemy.prototype.widths = [
    [21, 19, 19, 19, 21, 23, 21, 21], //walking 
    [26, 29, 33] //expanding
];