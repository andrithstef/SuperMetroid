// GENERIC RENDERING

var g_doClear = true;
var cnt = 0;


function intro(ctx) {
    // I've pulled the clear out of `renderSimulation()` and into
    // here, so that it becomes part of our "diagnostic" wrappers
    //*/
    if (g_doClear) util.clearCanvas(ctx);

    
    if(cnt === 0)ctx.font = "50px Arial";
    else if(cnt === 15)ctx.font = "55px Arial";
    else if(cnt === 30)ctx.font = "60px Arial";
    else if(cnt === 45)ctx.font = "65px Arial";
    else if(cnt === 60)ctx.font = "70px Arial";
    
    
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Push space to start", 700, 400); 




    ++cnt;
    if(cnt === 75)cnt = 0;
    ++g_frameCounter;
}