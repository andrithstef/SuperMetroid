function Bullet(cx, cy, xVel ,yVel, nr, descr){

    if (nr === 1) this.speed = 35;
    else if (nr === 2) this.speed = 10;

    this.cx = cx + g_camera.cx;
    this.cy = cy + g_camera.cy;
    this.velX = xVel*this.speed;
    this.velY = yVel*this.speed;

    this.type = nr;

    this.setup(descr);

    this.stance = this.getStance();
    var s = this.getBulletSprite();
    this.spriteX = s.x;
    this.spriteY = s.y;

    this.halfWidth = this.scale * this.spriteW;
    this.halfHeight = this.scale * this.spriteH;

    this.isDamaging = true;

    
}

const bulletSheet = new Image();
bulletSheet.src = "resrc/Weapons.png"
//put in bullet sprites based on current bullet

Bullet.prototype = new Entity();


Bullet.prototype.rad = 7;
Bullet.prototype.speed = 35;
Bullet.prototype.spriteX;
Bullet.prototype.spriteY;
Bullet.prototype.spriteW = 7;
Bullet.prototype.spriteH = 7;
Bullet.prototype.scale = 1.5;
Bullet.prototype.stance = 0;

Bullet.prototype.type = 1;

Bullet.prototype.collidable = false;

Bullet.prototype.lifeSpan = 2000 / 16.666;

Bullet.prototype.render = function(ctx){
    //Render the bullet if it is on the screen
    if(this.cx >= g_camera.cx - this.halfWidth && this.cx <= g_camera.cx + g_camera.width + this.halfWidth &&
        this.cy >= g_camera.cy - this.halfHeight && this.cy <= g_camera.cy + g_camera.height + this.halfHeight) {
        ctx.drawImage(bulletSheet,
            this.spriteX,this.spriteY,this.spriteW,this.spriteH, 
            this.cx-this.halfWidth - g_camera.cx, this.cy -this.halfHeight - g_camera.cy, 
            2*this.spriteW*this.scale, 2*this.spriteH*this.scale);
    }

}

Bullet.prototype.update = function(du){
    spatialManager.unregister(this);

    //lifespan, so that bullets don't fill up the screen
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }

    this.nextX = this.cx + this.velX*du;
    this.nextY = this.cy + this.velY*du;

    //resolve collisions with other entities
    var hitData = this.findCollision();
    if(hitData){
        if(hitData.owner){
            hitData.owner.getShot(this, hitData);
        }
        else if (hitData.isKillable && hitData == entityManager._player && this.type == 2){
            hitData.getShot(this);
            return entityManager.KILL_ME_NOW;
        }
        else if (hitData.isKillable && hitData != entityManager._player && this.type == 1) {
            hitData.getShot(this);
            return entityManager.KILL_ME_NOW;
        }
        
        return entityManager.KILL_ME_NOW;
    }

    this.cx = this.nextX;
    this.cy = this.nextY;

    spatialManager.register(this);

}

Bullet.prototype.getStance = function(){
    //Get which direction the bullet is going for sprites
    if (this.velY > 0){ 
        if (this.velX < 0) return 5; 
        if (this.velX === 0) return 6;
        if (this.velX > 0) return 7; 
    }
    else if (this.velY === 0){ 
        if (this.velX < 0) return 4; 
        if (this.velX > 0) return 0; 
    }
    if (this.velY < 0){ 
        if (this.velX < 0) return 3; 
        if (this.velX === 0) return 2; 
        if (this.velX > 0) return 1;  
    }
}

Bullet.prototype.getBulletSprite = function(){
    //Sprite stuff
    switch(this.stance){
        case 0:
            return{
                x : 276,
                y : 34
            }
        case 1:
            return{
                x : 276,
                y : 4
            }
        case 2:
            return{
                x : 246,
                y : 4
            }
        case 3:
            return{
                x : 216,
                y : 4
            }
        case 4:
            return{
                x : 216,
                y : 34
            }
        case 5:
            return{
                x : 216,
                y : 64
            }
        case 6:
            return{
                x : 246,
                y : 64
            }
        case 7:
            return{
                x : 276,
                y : 64
            }
        
    }
}
