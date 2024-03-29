// GENERIC RENDERING

var g_doClear = true;
var cnt = 0;

const backGround = new Image();
backGround.src = "resrc/introbg.png"
const text = new Image();
text.src = "resrc/introStart.png"


function intro(ctx) {
    // I've pulled the clear out of `renderSimulation()` and into
    // here, so that it becomes part of our "diagnostic" wrappers
    //*/
    if (g_doClear) util.clearCanvas(ctx);

    ctx.drawImage(backGround,0,0,g_canvas.width,g_canvas.height);
    ctx.drawImage(text,17,10,3294,290,2*g_canvas.width/7,4*g_canvas.height/5,3*g_canvas.width/7,64)

    if(cnt === 0)ctx.font = "50px Arial";
    else if(cnt === 15)ctx.font = "55px Arial";
    else if(cnt === 30)ctx.font = "60px Arial";
    else if(cnt === 45)ctx.font = "65px Arial";
    else if(cnt === 60)ctx.font = "70px Arial";
    
    
    ctx.fillStyle = "white";
    ctx.textAlign = "center";




    ++cnt;
    if(cnt === 75)cnt = 0;
    ++g_frameCounter;
}