function Door(x,y,direction){
  this.x = x;
  this.y = y;
  this.direction = direction;
}

const enviro = new Image();
enviro.src = "resrc/enviroEdit.png";

Door.prototype.width = 96;
Door.prototype.height = 256;
Door.prototype.halfWidth = 48;
Door.prototype.halfHeight = 128;

Door.prototype.seesPlayer = false;
Door.prototype.stance = 1;

Door.prototype.spriteData;
Door.prototype.animationFrame = 0;
Door.prototype.framenr = 0;
Door.prototype.framesToAnimationFrame = 6;



Door.prototype.update = function (du) {
  //this.getStance();
  this.updateAnimationFrame();
  this.spriteData = this.getSprite();
}

Door.prototype.render = function(ctx){
  var s = this.spriteData;
  //console.log(this.direction);
  if(this.x >= g_camera.cx - this.width && this.x <= g_camera.cx + g_camera.width + this.width &&
      this.y >= g_camera.cy - this.height && this.y <= g_camera.cy + g_camera.height + this.height) {
        if(this.direction == 'right') {
          //ctx.drawImage(enviro,640,512,64,256,this.x - g_camera.cx, this.y - g_camera.cy, 64, 256);
          ctx.drawImage(enviro,s.x,s.y,s.w,256,this.x - s.w - g_camera.cx,this.y - g_camera.cy, s.w, 256);
        }
  
  }
  
}

Door.prototype.isPlayerClose = function() {
  return util.distSq(this.x, this.y + this.halfHeight, entityManager._player.cx, entityManager._player.cy) < 65536;
}

Door.prototype.updateAnimationFrame = function(){
  this.framenr += 1;
  var player = this.isPlayerClose();
  //console.log(this.animationFrame);
  if (this.framenr > this.framesToAnimationFrame){
    if(player){
      this.animationFrame += 1;
      this.framenr = 0;
    } else {
      this.animationFrame -= 1;
      this.framenr = 0;
    }
      
  }
  if (this.animationFrame > 5){
    this.animationFrame = 5;
  } else if(this.animationFrame < 0) {
    this.animationFrame = 0
  }
}

Door.prototype.getSprite = function(){
          return{
              x : this.dists[0][this.animationFrame],
              y : 512,
              w : this.widths[0][this.animationFrame]
          }
  
}

Door.prototype.getStance = function(){
  var oldStance = this.stance;
  if (this.isPlayerClose()){
      this.stance = 0; //player close
  }
  else{
      this.stance = 1; //player not close
  }
  /*if (oldStance != this.stance){
      this.framenr = 0;
      this.animationFrame = 0;
  }*/
}

Door.prototype.dists = [
  [64, 128, 196, 256, 320, 0], //opening 
  [8, 47, 85] //Expanding
];

Door.prototype.widths = [
  [32,24,16,16,16, 0], //opening 
  [8, 47, 85] //Expanding
];