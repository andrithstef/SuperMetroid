function Bullet(cx, cy, xVel ,yVel, descr){
    this.cx = cx + g_camera.cx;
    this.cy = cy + g_camera.cy;
    this.velX = xVel*this.speed;
    this.velY = yVel*this.speed;

    this.halfWidth = this.rad;
    this.halfHeight = this.rad;

    this.setup(descr);
}

const bulletSheet = 'resrc/Weapons.png';
//put in bullet sprites based on current bullet

Bullet.prototype = new Entity();

Bullet.prototype.rad = 5;
Bullet.prototype.speed = 30;

Bullet.prototype.lifeSpan = 2000 / 16.666;

Bullet.prototype.render = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.cx - g_camera.cx, this.cy - g_camera.cy, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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



