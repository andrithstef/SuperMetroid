function Ground(){
    
}

Ground.prototype.height = 30;

Ground.prototype.render = function(ctx){
    ctx.fillRect(0,g_canvas.height-this.height,g_canvas.width,this.height);
}