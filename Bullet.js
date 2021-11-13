function Bullet(cx, cy, xVel ,yVel, descr){
    this.cx = cx + g_camera.cx;
    this.cy = cy + g_camera.cy;
    this.velX = xVel*this.speed;
    this.velY = yVel*this.speed;

    this.setup(descr);

    this.stance = this.getStance();
    var s = this.getBulletSprite();
    this.spriteX = s.x;
    this.spriteY = s.y;

    this.halfWidth = this.scale * this.spriteW;
    this.halfHeight = this.scale * this.spriteH;
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
Bullet.prototype.scale = 1;
Bullet.prototype.stance = 0;

Bullet.prototype.lifeSpan = 2000 / 16.666;

Bullet.prototype.render = function(ctx){
    /*
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.cx - g_camera.cx, this.cy - g_camera.cy, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    */
   console.log(this.stance);
    ctx.drawImage(bulletSheet,
        this.spriteX,this.spriteY,this.spriteW,this.spriteH, 
        this.cx-this.halfWidth - g_camera.cx, this.cy -this.halfHeight - g_camera.cy, 
        2*this.spriteW*this.scale, 2*this.spriteH*this.scale);

}

Bullet.prototype.update = function(du){
    spatialManager.unregister(this);
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }

    this.nextX = this.cx + this.velX*du;
    this.nextY = this.cy + this.velY*du;


    var hitData = this.findCollision();
    if(hitData){

        return entityManager.KILL_ME_NOW;
    }

    this.cx = this.nextX;
    this.cy = this.nextY;

    spatialManager.register(this);

}

Bullet.prototype.getStance = function(){
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
