function TailPart(nr, parent, descr){
    this.setup(descr);
    this.initialize(nr, parent);
}

TailPart.prototype = new Entity();

TailPart.prototype.scale = 2;
TailPart.prototype.length = 10;
TailPart.prototype.partType = 0;
TailPart.prototype.parent;
TailPart.prototype.halfHeight = 15*2;
TailPart.prototype.halfWidth = 15*2;
TailPart.prototype.spriteData = {
    x: 4,
    y: 346,
    w: 15,
    h: 15
}

TailPart.prototype.isFixed = false;


TailPart.prototype.initialize = function(nr, parent){
    this.parent = parent;
    this.isFireproof = true;
    if(nr === 0) this.isFixed = true;
    if(nr < 2){ 
        this.partType = 0; 
    }
    else if(nr < 5){
        this.partType = 1;
        this.spriteData = {
            x: 25,
            y: 348,
            w: 11,
            h: 11
        }
        this.halfHeight = 11*this.scale;
        this.halfWidth = 11*this.scale;
    }
    else{
        this.partType = 2;
        this.spriteData = {
            x: 42,
            y: 349,
            w: 11,
            h: 11
        }
        this.halfHeight = 11*this.scale;
        this.halfWidth = 11*this.scale;
    }
    
    this.cx = this.parent.cx + this.parent.halfWidth;
    this.cy = this.parent.cy;

    this.partLength = this.halfWidth + 6;
}

TailPart.prototype.update = function(root, owner){
    spatialManager.unregister(this);

    if(owner.isDead){
        return entityManager.KILL_ME_NOW;
    }

    if(this.isFixed){
        var nextx = this.parent.cx + this.parent.halfWidth + 6;
        var nexty = this.parent.cy
        nextx += 5;
        nexty += this.parent.halfHeight - 30;

        this.dx = nextx - this.cx;
        this.dy = nexty - this.cy;

        this.cx = nextx;
        this.cy = nexty;
    }
    else{
        this.cx += root.dx;
        this.cy += root.dy;
    }
    spatialManager.register(this);
}

TailPart.prototype.render = function(ctx){
    s = this.spriteData;
    ctx.drawImage(ridleySheet,6*s.x,6*s.y,6*s.w,6*s.h,
        this.cx-this.halfWidth - g_camera.cx,
        this.cy-this.halfHeight - g_camera.cy,
        2*s.w*this.scale,2*s.h*this.scale);
}
