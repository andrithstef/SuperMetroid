function Enemy(descr){
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
Enemy.prototype.walkSpeed = 2;

Enemy.prototype.nextX;
Enemy.prototype.nextY;

Enemy.prototype.resolveTries = 0;

Enemy.prototype.shape = "Rect";

Enemy.prototype.seesPlayer = true;
Enemy.prototype.threshold = 300;

Enemy.prototype.animationFrame = 0;
Enemy.prototype.framenr = 0;
Enemy.prototype.framsesToAnimationFrame = 4;
Enemy.prototype.isDead = false;

Enemy.prototype.stance = 0;

Enemy.prototype.shootTimer = 100;

Enemy.prototype.scale = 1.5;

Enemy.prototype.update = function(du, player){
    spatialManager.unregister(this);

    this.shootTimer -= du;

    if (this.shootTimer < 0 && this.seesPlayer){
        this.shoot();
    }

    if (this.isDead){
        return entityManager.KILL_ME_NOW;
    }

    this.velY += this.gravity*du;

    if (this.velY > this.maxSpeed) this.velY = this.maxSpeed;

    this.findPlayer(player);

    if (this.seesPlayer){
        this.followPlayer(player);
    }
    
    this.nextX = this.cx + this.velX * du;
    this.nextY = this.cy + this.velY * du;

    this.resolveTries = 0;
    var hitData = this.findCollision();
    while(hitData){
        this.resolve(hitData);
        hitData = this.findCollision()
    }

    this.cx = this.nextX;
    this.cy = this.nextY;

    this.stance = this.getStance();
    this.updateAnimationFrame();

    spatialManager.register(this);
}


Enemy.prototype.followPlayer = function(player){
    if (player.cx < this.cx){
        this.velX  = -this.walkSpeed;
    }
    else{
        this.velX = this.walkSpeed;
    }
}

Enemy.prototype.findPlayer = function(player){
    var oldSees = this.seesPlayer;
    var a = 1;
    if (this.seesPlayer) a *= 2;
    if (player.cy < this.cy + a*this.threshold && player.cy > this.cy - a*this.threshold){
        this.seesPlayer = true;
    }
    else{
        this.seesPlayer = false;
        this.velX = 0;
    }
    if (oldSees != this.seesPlayer) this.shootTimer = 100;
}

Enemy.prototype.shoot = function(){
    console.log("Shooting");
    entityManager.addBullet(this.cx - g_camera.cx, this.cy - this.halfHeight - g_camera.cy, 0, -1, 2);
    entityManager.addBullet(this.cx + this.halfWidth - g_camera.cx, this.cy - this.halfHeight - g_camera.cy, 1, -1, 2);
    entityManager.addBullet(this.cx - this.halfWidth - g_camera.cx, this.cy - this.halfHeight - g_camera.cy, -1, -1, 2);
    entityManager.addBullet(this.cx + this.halfWidth - g_camera.cx, this.cy - g_camera.cy, 1, 0, 2);
    entityManager.addBullet(this.cx - this.halfWidth - g_camera.cx, this.cy - g_camera.cy, -1, 0, 2);
    this.shootTimer = 100;
}

Enemy.prototype.render = function(ctx){
    var s = this.getSprite();
    this.halfHeight *= this.scale;
    this.halfWidth *= this.scale;
    ctx.drawImage(enemySheet,6*s.x,6*s.y,6*s.w,6*s.h,this.cx-10-this.halfWidth,this.cy-this.halfHeight - g_camera.cy,2*s.w*this.scale,2*s.h*this.scale);
}

Enemy.prototype.updateAnimationFrame = function(){
    this.framenr += 1;
    if (this.framenr > this.framsesToAnimationFrame){
        this.animationFrame += 1;
        this.framenr = 0;
    }
    if (this.animationFrame > 7 ){
        this.animationFrame -= 7;
    }
}


Enemy.prototype.getSprite = function(){
    switch(this.stance){
        case 0:
            this.halfHeight = 28;
            this.halfWidth = 23;
            return{
                x : 8,
                y : 599,
                w : 31,
                h : 28
            }
        case 1:
            this.halfHeight = 28;
            this.halfWidth = this.widths[0][this.animationFrame];
            return{
                x : this.dists[0][this.animationFrame],
                y : 563,
                w : this.widths[0][this.animationFrame],
                h : 28
            }
        case 2:
            this.halfHeight = 28;
            this.halfWidth = this.widths[0][this.animationFrame];
            return{
                x : this.dists[0][this.animationFrame],
                y : 563,
                w : this.widths[0][this.animationFrame],
                h : 28
            }
    }
    
}

Enemy.prototype.getStance = function(){
    if (this.seesPlayer){
        if (this.velX < 0){
            return 1; //walking left
        }
        if (this.velX > 0){
            return 2; //walking right
        }
    }
    return 0; //idle
}

Enemy.prototype.dists = [
    [8, 38, 66, 95, 124, 154, 185, 214] //walking right
];

Enemy.prototype.widths = [
    [21, 19, 19, 19, 21, 23, 21, 21] //walking right
];