function Camera(cx, cy){
  this.cx = cx;
  this.cy = cy;
}
var cameraWidth = g_canvas.width;
var cameraHeight = g_canvas.height;
//Finetuning needed
var moveHorizontalCameraBuffer = cameraWidth/3;
var moveVerticalCameraBuffer = cameraHeight/3;

Camera.prototype.cameraWidth = cameraWidth;
Camera.prototype.cameraX = this.cx;
Camera.prototype.moveHorizontalCameraBuffer = moveHorizontalCameraBuffer;
Camera.prototype.leftCameraEdge = moveHorizontalCameraBuffer;
Camera.prototype.rightCameraEdge = cameraWidth - moveHorizontalCameraBuffer;

Camera.prototype.cameraHeight = cameraHeight;
Camera.prototype.cameraY = this.cy;
Camera.prototype.moveVerticalCameraBuffer = moveVerticalCameraBuffer;
Camera.prototype.topCameraEdge = moveVerticalCameraBuffer;
Camera.prototype.bottomCameraEdge = cameraHeight - moveVerticalCameraBuffer;

Camera.prototype.shouldWeMoveCamera = function(cx, cy, halfWidth,halfHeight){
  var moveHorizontally = false;
  var moveVertically = false;
  var moveX = true;
  var moveY = false
  if (cx + halfWidth > this.rightCameraEdge || cx - halfWidth < this.leftCameraEdge){
      if(cx + halfWidth > this.rightCameraEdge && this.cameraX < this.width - this.cameraWidth) {
          //console.log("right");
          //console.log(this.cameraX);
          //console.log(this.width - this.cameraWidth);
          var moveX = true;
          moveHorizontally = true;
      } else if(cx - halfWidth < this.leftCameraEdge && this.cameraX != 0) {
          //console.log("left");
          var moveX = false;
          moveHorizontally = true;
      }  
  }
  
  if (cy + halfHeight > this.bottomCameraEdge || cy - halfHeight < this.topCameraEdge){
      if(cy + halfHeight > this.bottomCameraEdge && this.cameraY < this.height - this.cameraHeight) {
          //console.log("bot");
          //console.log(this.cameraX);
          //console.log(this.width - this.cameraWidth);
          var moveY = true;
          moveVertically = true;
      } else if(cy - halfHeight < this.topCameraEdge && this.cameraY != 0) {
          //console.log("top");
          var moveY = false;
          moveVertically = true;
      }   
  }
  return {
      moveHorizontally: moveHorizontally,
      moveVertically: moveVertically,
      moveX: moveX,
      moveY: moveY
  };
}

Camera.prototype.moveCamera = function(x,y){
  this.cameraX += x;
  this.cameraY += y;
  if(this.cameraX > this.width - this.cameraWidth) this.cameraX = this.width - this.cameraWidth;
  if(this.cameraX < 0) this.cameraX = 0;
  if(this.cameraY > this.height - this.cameraHeight) this.cameraY = this.height - this.cameraHeight;
  if(this.cameraY < 0) this.cameraY = 0;
}