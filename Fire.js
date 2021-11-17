function Fire(cx, cy, xVel ,yVel, descr){

    this.cx = cx + g_camera.cx;
    this.cy = cy + g_camera.cy;
    this.velX = xVel*this.speed;
    this.velY = yVel*this.speed;

    this.setup(descr);
    this.isDamaging = true;
    this.isCollidable = true;
    this.isFireproof = true;
}

Fire.prototype = new Entity();


Fire.prototype.rad = 7;
Fire.prototype.speed = 10;
Fire.prototype.spriteX = 68;
Fire.prototype.spriteY = [151, 170, 188, 207];
Fire.prototype.spriteW = 15;
Fire.prototype.spriteH = 15;
Fire.prototype.scale = 1;
Fire.prototype.stanceFire
Fire.prototype.typeFire
Fire.prototype.collidable = false;
Fire.prototype.lifeSpan = 4000 / 16;

Fire.prototype.scale = 2;

Fire.prototype.halfHeight = 15*2;
Fire.prototype.halfWidth = 15 * 2;

Fire.prototype.framenr = 0;
Fire.prototype.framesToAnimationFrame = 5;
Fire.prototype.animationFrame = 0;

Fire.prototype.render = function(ctx){
    ctx.drawImage(ridleySheet,
        6*this.spriteX,6*this.spriteY[this.animationFrame],6*this.spriteW,6*this.spriteH, 
        this.cx-this.halfWidth - g_camera.cx, this.cy -this.halfHeight - g_camera.cy, 
        2*this.spriteW*this.scale, 2*this.spriteH*this.scale);
}

Fire.prototype.update = function(du, owner){
    spatialManager.unregister(this);

    if(this.lifeSpan < 0 || this.isDead) return entityManager.KILL_ME_NOW;

    if(owner){
        //the fire is inside Ridleys mouth, so it follows her
        this.cx = owner.head.cx - 50;
        this.cy = owner.head.cy;
        this.updateAnimationFrame();
        spatialManager.register(this);
        return;
    }

    //Calculate next position
    this.nextX = this.cx + this.velX*du;
    this.nextY = this.cy + this.velY*du;


    //Find collisions and take care of them
    var hitData = this.findCollision();
    if(hitData){
        if(!hitData.isFireproof){
            if (hitData.isKillable){
                hitData.getShot(this);
            }
            return entityManager.KILL_ME_NOW;
        }
    }

    //Decrease lifespan
    this.lifeSpan -= du;

    this.cx = this.nextX;
    this.cy = this.nextY;

    this.updateAnimationFrame();

    spatialManager.register(this);

}

Fire.prototype.updateAnimationFrame = function(){
    this.framenr += 1;
    if(this.framenr > this.framesToAnimationFrame){
        this.framenr = 0;
        this.animationFrame += 1;
    }
    if (this.animationFrame > 3){
        this.animationFrame = 0;
    }
}