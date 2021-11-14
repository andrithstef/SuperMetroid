function Enemy(descr){
    this.setup(descr);

    this.halfHeight = 50;
    this.halfWidth = 20;
}

const enemySheet = new Image();
enemySheet.src = "resrc/enemies.png"

Enemy.prototype = new Entity();

Enemy.prototype.cx = 700;
Enemy.prototype.cy = 200;

Enemy.prototype.animationFrame = 0;
Enemy.prototype.framenr = 0;
Enemy.prototype.framsesToAnimationFrame = 4;

Enemy.prototype.scale = 3;

Enemy.prototype.update = function(du){
    spatialManager.unregister(this);

    console.log(this);

    this.updateAnimationFrame();

    spatialManager.register(this);
    return null;
}

Enemy.prototype.render = function(ctx){
    var s = this.getSprite();
    this.halfHeight *= this.scale;
    this.halfWidth *= this.scale;
    ctx.drawImage(enemySheet,s.x,s.y,s.w,s.h,this.cx-this.halfWidth,this.cy-this.halfHeight - g_camera.cy,2*s.w*this.scale,2*s.h*this.scale);
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
    this.halfHeight = 27;
    this.halfWidth = this.widths[0][this.animationFrame];
    return{
        x : this.dists[0][this.animationFrame],
        y : 565,
        w : this.widths[0][this.animationFrame],
        h : 27
    }
}

Enemy.prototype.dists = [
    [8, 38, 66, 95, 124, 154, 185, 214] //Dunno
]

Enemy.prototype.widths = [
    [21, 19, 19, 19, 21, 23, 21, 21] //Dunno
]