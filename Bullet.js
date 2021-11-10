function Bullet(cx, cy, xVel ,yVel){
    this.cx = cx;
    this.cy = cy;
    this.velX = xVel*this.speed;
    this.velY = yVel*this.speed;
}

const bulletSheet = 'resrc/Weapons.png';
//put in bullet sprites based on current bullet

Bullet.prototype.rad = 5;
Bullet.prototype.speed = 30;

Bullet.prototype.shape = "Circ";

Bullet.prototype.lifeSpan = 2000 / 16.666;

Bullet.prototype.render = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.cx, this.cy, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

Bullet.prototype.update = function(du){
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }

    var nextX = this.cx + this.velX*du;
    var nextY = this.cy + this.velY*du;

    var hitData = g_map.collidesWith(nextX, nextY);
    if (hitData.hits){
        return entityManager.KILL_ME_NOW;
    }

    this.cx = nextX;
    this.cy = nextY;

}
