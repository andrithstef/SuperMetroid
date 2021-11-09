function Bullet(cx, cy, xVel ,yVel){
    this.cx = cx;
    this.cy = cy;
    this.velX = xVel*this.speed;
    this.velY = yVel*this.speed;
}

const bulletSheet = 'resrc/Weapons.png';
//put in bullet sprites based on current bullet

Bullet.prototype = new Entity();

Bullet.prototype.rad = 5;
Bullet.prototype.speed = 20;

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

    
    var hitData = this.hitsMap(nextX, nextY);
    if(hitData.hits){
        return entityManager.KILL_ME_NOW;
    }
    
    this.cx = nextX;
    this.cy = nextY;

}

Bullet.prototype.hitsMap = function(x,y){
    if(this.isColliding()) return this.isColliding().collidable == true;
    return false;
}