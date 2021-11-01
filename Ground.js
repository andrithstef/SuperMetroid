function Ground(){
    
}

Ground.prototype.halfHeight = 30;
Ground.prototype.halfWidth = 200;

Ground.prototype.cx = 400;
Ground.prototype.cy = 600;

Ground.prototype.render = function(ctx){
    ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight, 
        2*this.halfWidth, 2*this.halfHeight);
}