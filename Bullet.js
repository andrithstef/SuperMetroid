function Bullet(cx, cy, xVel ,yVel){
    this.cx = cx;
    this.cy = cy;
    this.velX = xVel*this.speed;
    this.velY = yVel*this.speed;
}

Bullet.prototype.rad = 5;
Bullet.prototype.speed = 10;

Bullet.prototype.lifeSpan = 2000 / 16.666;

Bullet.prototype.render = function(ctx){
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.rad, 0, Math.PI * 2);
    ctx.fill();
}

Bullet.prototype.update = function(du){
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }

    var nextX = this.cx + this.velX*du;
    var nextY = this.cy + this.velY*du;

    var hitData = this.hitsMap(nextX, nextY);
    if(hitData.hits){
        return entityManager.KILL_ME_NOW;
    }

    this.cx = nextX;
    this.cy = nextY;
}

Bullet.prototype.hitsMap = function(x,y){
    return g_map.collidesWith(x,y);
}