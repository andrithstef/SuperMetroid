function Camera(cx, cy){
  this.cx = cx;
  this.cy = cy;
}
var g_canvas = document.getElementById("myCanvas");
var cameraWidth = g_canvas.width;
var cameraHeight = g_canvas.height;
//Finetuning needed
var moveHorizontalCameraBuffer = cameraWidth/3;
var moveVerticalCameraBuffer = cameraHeight/3;



Camera.prototype.width = Map.gameMap[0].length*64;
Camera.prototype.height = Map.gameMap.length*64;
console.log(Map.gameMap[0].length*64);
console.log(Map.gameMap.length*64);

Camera.prototype.cameraWidth = cameraWidth;
Camera.prototype.moveHorizontalCameraBuffer = moveHorizontalCameraBuffer;
Camera.prototype.leftCameraEdge = moveHorizontalCameraBuffer;
Camera.prototype.rightCameraEdge = cameraWidth - moveHorizontalCameraBuffer;

Camera.prototype.cameraHeight = cameraHeight;
Camera.prototype.moveVerticalCameraBuffer = moveVerticalCameraBuffer;
Camera.prototype.topCameraEdge = moveVerticalCameraBuffer;
Camera.prototype.bottomCameraEdge = cameraHeight - moveVerticalCameraBuffer;

Camera.prototype.shouldWeMoveCamera = function(cx, cy, halfWidth,halfHeight){
  var moveHorizontally = false;
  var moveVertically = false;
  var moveX = false;
  var moveY = false;
  cx = cx - this.cx;
  cy = cy - this.cy;
  if (cx + halfWidth > this.rightCameraEdge || cx - halfWidth < this.leftCameraEdge){
    //console.log(this.cx);
    //console.log(this.width - this.cameraWidth);
      if(cx + halfWidth > this.rightCameraEdge && this.cx < this.width - this.cameraWidth) {
          //console.log("right");
          //console.log(this.cx);
          //console.log(this.width - this.cameraWidth);
          var moveX = true;
          moveHorizontally = true;
      } else if(cx - halfWidth < this.leftCameraEdge && this.cx != 0) {
          //console.log("left");
          var moveX = false;
          moveHorizontally = true;
      }
  }

  if (cy + halfHeight > this.bottomCameraEdge || cy - halfHeight < this.topCameraEdge){
      if(cy + halfHeight > this.bottomCameraEdge && this.cy < this.height - this.cameraHeight) {
          //console.log("bot");
          //console.log(this.cx);
          //console.log(this.width - this.cameraWidth);
          var moveY = true;
          moveVertically = true;
      } else if(cy - halfHeight < this.topCameraEdge && this.cy != 0) {
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
  this.cx += x;
  this.cy += y;
  if(this.cx > this.width - this.cameraWidth) this.cx = this.width - this.cameraWidth;
  if(this.cx < 0) this.cx = 0;
  if(this.cy > this.height - this.cameraHeight) this.cy = this.height - this.cameraHeight;
  if(this.cy < 0) this.cy = 0;
}
