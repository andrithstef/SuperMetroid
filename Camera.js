function Camera(cx, cy, lvl){
  this.cx = cx;
  this.cy = cy;
  this.width = lvl.map[0].length*64;
  this.height = lvl.map.length*64;
}
var g_canvas = document.getElementById("myCanvas");
var cameraWidth = g_canvas.width;
var cameraHeight = g_canvas.height;
//Finetuning needed
var moveHorizontalCameraBuffer = cameraWidth/3;
var moveVerticalCameraBuffer = cameraHeight/3;

Camera.prototype.xThreshold = cameraWidth/9;
Camera.prototype.yThreshold = cameraHeight/9;

Camera.prototype.width;
Camera.prototype.height;


Camera.prototype.cameraWidth = cameraWidth;
Camera.prototype.moveHorizontalCameraBuffer = moveHorizontalCameraBuffer;
Camera.prototype.leftCameraEdge = moveHorizontalCameraBuffer;
Camera.prototype.rightCameraEdge = cameraWidth - moveHorizontalCameraBuffer;

Camera.prototype.cameraHeight = cameraHeight;
Camera.prototype.moveVerticalCameraBuffer = moveVerticalCameraBuffer;
Camera.prototype.topCameraEdge = moveVerticalCameraBuffer;
Camera.prototype.bottomCameraEdge = cameraHeight - moveVerticalCameraBuffer;

/*Camera.prototype.size = function() {
  this.width = map[0].length*64;
  this.height = map.length*64;
  return 0;
}
var g = this.size();*/

/*
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
*/

Camera.prototype.updateCamera = function(cx, cy){
  cx = cx - this.width/6;
  cy = cy - this.height/10;
  //console.log(cx);
  
  if (cx > this.cx + this.xThreshold) {
    this.cx = cx - this.xThreshold;
  }
  else if (cx < this.cx - this.xThreshold){
    this.cx = cx + this.xThreshold;
  }

  
  if (cy > this.cy + this.yThreshold) {
    this.cy = cy - this.yThreshold;
  }
  else if (cy < this.cy - this.yThreshold){
    this.cy = cy + this.yThreshold;
  }
  

  //Can't move camera too far
  if(this.cx < 0){
    this.cx = 0
  }
  else if (this.cx + this.cameraWidth > this.width){
    this.cx = this.width - this.cameraWidth;
  }
  
 if (this.cy < 0){
   this.cy = 0;
 }
 else if(this.cy + this.cameraHeight > this.height){
   this.cy = this.height - this.cameraHeight;
 }
}