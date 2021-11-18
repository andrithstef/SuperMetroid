function Door(x,y,direction){
  this.x = x;
  this.y = y;
  this.direction = direction;
}

const enviroSprite = new Image();
enviroSprite.src = "resrc/enviro2.png";
const doorSprite = new Image();
doorSprite.src = "resrc/specialSprite.png";

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
  if(this.x >= g_camera.cx - this.width && this.x <= g_camera.cx + g_camera.width + this.width &&
      this.y >= g_camera.cy - this.height && this.y <= g_camera.cy + g_camera.height + this.height) {
        if(this.direction == 'right') {
          ctx.drawImage(enviroSprite,640,512,64,256,this.x - g_camera.cx, this.y - g_camera.cy, 64, 256);
          ctx.drawImage(doorSprite,s.x,s.y,s.w,256,this.x - s.w - g_camera.cx,this.y - g_camera.cy, s.w, 256);
        } else {
          ctx.drawImage(enviroSprite,576,512,64,256,this.x - g_camera.cx, this.y - g_camera.cy, 64, 256);
          ctx.drawImage(doorSprite,s.x,s.y,s.w,256,this.x + 64 - g_camera.cx,this.y - g_camera.cy, s.w, 256);
        }
  
  }
  
}

Door.prototype.isPlayerClose = function() {
  return util.distSq(this.x, this.y + this.halfHeight, entityManager._player.cx, entityManager._player.cy) < 65536;
}

Door.prototype.updateAnimationFrame = function(){
  if(g_ridley){
    //Your stuck in the room until Ridley is gone
    this.animationFrame = 0;
    return;
  }
  this.framenr += 1;
  var player = this.isPlayerClose();
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
  if(this.direction == "right"){
    return{
      x : this.distsRight[0][this.animationFrame],
      y : 0,
      w : this.widthsRight[0][this.animationFrame]
    }
  } else {
    return{
      x : this.distsLeft[0][this.animationFrame],
      y : 0,
      w : this.widthsLeft[0][this.animationFrame]
    }
  }
}

Door.prototype.distsRight = [
  [128, 164, 200, 236, 280, 0], //opening 
  [8, 47, 85] //Expanding
];

Door.prototype.widthsRight = [
  [32, 24, 16, 16, 16, 0], //opening 
  [8, 47, 85] //Expanding
];

Door.prototype.distsLeft = [
  [472, 444, 416, 380, 336, 0], //opening 
  [8, 47, 85] //Expanding
];

Door.prototype.widthsLeft = [
  [32,24,16,16,16, 0], //opening 
  [8, 47, 85] //Expanding
];