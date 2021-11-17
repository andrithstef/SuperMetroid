function Ridley(){

    this.isKillable = true;
    this.isDamaging = false;

    this.cx = 1000;
    this.cy = 400;

    this.init();
}

const ridleySheet = new Image();
ridleySheet.src = "resrc/Ridley.png"

Ridley.prototype.health = 200;
Ridley.prototype.scale = 2;
Ridley.prototype.isEscaping = false; 
Ridley.prototype.isFlying = false;

//Body parts that make up Ridley
Ridley.prototype.body = new Entity();
Ridley.prototype.head = new Entity();
Ridley.prototype.leg = new Entity();
Ridley.prototype.wing = new Entity();
Ridley.prototype.hand = new Entity();
Ridley.prototype.tail = new Entity();
Ridley.prototype.jar = new Entity();

//Wing animation stuff
Ridley.prototype.framenr = 0;
Ridley.prototype.framesToAnimationFrame = 5;
Ridley.prototype.animationFrame = 0;
Ridley.prototype.reverseAnimationFrame = false;

//Head animation stuff
Ridley.prototype.headFramenr = 0;
Ridley.prototype.headAnimationFrame = 0;
Ridley.prototype.headFramesToAnimationFrame = 10;

//Location stuff
Ridley.prototype.moveTargetX;
Ridley.prototype.moveTargetY;
Ridley.prototype.hasReachedTarget = true;
Ridley.prototype.speed = 3;
Ridley.prototype.velX = 0;
Ridley.prototype.velY = 0;
Ridley.prototype.maxDistFromPlayer = 1000;
Ridley.prototype.minDistFromPlayer = 300;
Ridley.prototype.minAngleFromPlayer = 0.05;
Ridley.prototype.maxAngleFromPlayer = Math.PI/3;


//Fireball stuff
Ridley.prototype.timeToFireball = Math.floor(Math.random()*(300-200) + 200);
Ridley.prototype.ballnr = 0;
Ridley.prototype.chargeTime = 100;
Ridley.prototype.mouthOpen = false;
Ridley.prototype.charged = false;
Ridley.prototype.hasShot = false;
Ridley.prototype.closeMouth = false;
Ridley.prototype.timeToNextshot = 15;
Ridley.prototype.shotsFired = 0;
Ridley.prototype.targetX;
Ridley.prototype.targetY;

//Jar stuff
Ridley.prototype.jarAnimationFrame = 0;
Ridley.prototype.jarFramenr = 0;
Ridley.prototype.jarFramesToAnimationFrame = 15;
Ridley.prototype.isHoldingJar = true;

//Tail stuff
Ridley.prototype.tailLength = 13;
Ridley.prototype.tailX;
Ridley.prototype.tailY;
Ridley.prototype.tailSpan = 0;
Ridley.prototype.needsTailTarget = true;
Ridley.prototype.tailSpeed = 3;
Ridley.prototype.tailTimer = 10;
Ridley.prototype.tailTargetX = 150;
Ridley.prototype.tailTargetY = 150;
Ridley.prototype.tailDist = 200;
Ridley.prototype.tailRadian = 1;
Ridley.prototype.reverseTail = 1;

//Flying away stuff
Ridley.prototype.flyingAnimation = 0;
Ridley.prototype.flyingFrame = 0;
Ridley.prototype.flyingTime = 0;
Ridley.prototype.flyingX = 0;
Ridley.prototype.goingDown = true;

Ridley.prototype.init = function(descr) {
    //This is just initial setup for each body part

    //Set body
    this.body.setup(descr);
    this.body.owner = this;
    this.body.isFireproof = true;
    this.body.setPos(this.cx, this.cy);
    this.body.velX = 0;
    this.body.velY = 0;
    this.body.halfWidth = 30 * this.scale;
    this.body.halfHeight = 43 * this.scale;
    this.body.spriteData = {
        x: 33, 
        y: 178, 
        w: 30, 
        h: 43
    }
    //set head
    this.head.setup(descr);
    this.head.owner = this;
    this.head.isFireproof = true;
    this.head.halfWidth = 41 * this.scale;
    this.head.halfHeight = 54 * this.scale;
    this.head.Xdists = [21, 4, 6]; //x coords of sprites
    this.head.Ydists = [118, 68, 7]; //y coords of sprites
    this.head.widths = [41, 63, 54]; //widths of sprites
    this.head.heights = [54, 46, 54]; //Heights of sprites
    this.head.xOffsets = [45, 70, 40]; //Offsets for the head
    this.head.yOffsets = [40, 50, 16]; //Offsets for the head

    //set hand
    this.hand.setup(descr);
    this.hand.owner = this;
    this.hand.isFireproof = true;
    this.hand.spriteData = {
        x: 9,
        y: 204, 
        w: 28,
        h: 15
    }
    this.hand.halfWidth = 28 * this.scale;
    this.hand.halfHeight = 15 * this.scale;

    //set leg
    this.leg.setup(descr);
    this.leg.owner = this;
    this.leg.isFireproof = true;
    this.leg.spriteData = {
        x: 4,
        y: 226, 
        w: 32,
        h: 30
    }
    this.leg.halfHeight = 30 * this.scale;
    this.leg.halfWidth = 32 * this.scale

    //set wing
    this.wing.setup(descr);
    this.wing.owner = this;
    this.wing.isFireproof = true;
    this.wing.Xdists = [4, 50, 95, 4, 48, 93]; //x coords of sprites
    this.wing.Ydists = [277, 284, 293, 312, 314, 315]; //y coords of sprites
    this.wing.widths = [39, 38, 37, 37, 38, 40]; //widths of sprites
    this.wing.heights = [28, 21, 12, 13, 21, 27]; //Heights of sprites
    this.wing.yOffsets = [-40, -30, 0, 0, 20, 40] //Offsets for the wing
    this.wing.halfheight = 28 * this.scale;
    this.wing.halfWidth = 39 * this.scale;

    //Set jar
    this.jar.setup(descr);
    this.jar.isJar = true;
    this.jar.owner = this;
    this.jar.isFireproof = true;
    this.jar.halfHeight = 31 * this.scale; 
    this.jar.halfWidth = 15 * this.scale;
    this.jar.xDists = [4, 23, 42, 23];
    this.jar.yDist = 543;
    this.jar.Swidth = 15;
    this.jar.Sheight = 31;

    //Set tail
    this.tail[0] = new TailPart(0, this.body)
    for(var i = 1; i<this.tailLength; i++){
        this.tail[i] = new TailPart(i, this.tail[i-1]);
        this.tailSpan += this.tail[i].partLength;
    }
}

Ridley.prototype.update = function(du, player){

    if(this.isDead){
        this.unregister();
        return entityManager.KILL_ME_NOW;
    }

    if(this.isFlying){
        this.escape();
        return;
    }

    //If there is a fireball in ridley's mouth, we must update it
    if(this.fireball){
        this.fireball.update(du, this);
        if (this.fireball.isDead) this.fireball = null;
    }

    if(this.health < 0){
        this.isEscaping = true;
    }

    //Update each body part
    this.updateAnimationFrame();
    this.updateBody(du, player);
    this.updateHead(du, player);
    this.updateHand(du);
    this.updateJar(du);
    this.updateLeg(du);
    this.updateWing(du);
    this.updateTail(du);
    if(this.isDead){
        return entityManager.KILL_ME_NOW;
    }
}

Ridley.prototype.updateBody = function(du, player){
    spatialManager.unregister(this.body);
    //The body is the centre of the whole body
    //Each body part's location is based on the body's location

    if(this.isDead){
        return entityManager.KILL_ME_NOW;
    }

    if(this.isEscaping){
        this.moveTargetY = -300;
        this.updateVelocity();
        this.body.cy += this.velY * du * this.speed * 3;
        if(this.body.cy < - 200){
            this.isFlying = true;
            this.cx = 700;
            this.cy = -300;
            this.scale = 0.3;
        }
        return;
    }

    if(this.hasReachedTarget || this.shouldMove(player)){
        this.moveToNewPosition(player);
    }

    this.updateVelocity();

    if(this.body.cx < this.moveTargetX + 10 && this.body.cx > this.moveTargetX - 10
        && this.body.cy < this.moveTargetY + 10 && this.body.cy > this.moveTargetY - 10){
            this.hasReachedTarget = true;
        }
    this.body.cx += this.velX * du * this.speed;
    this.body.cy += this.velY * du * this.speed;
    spatialManager.register(this.body);
}

Ridley.prototype.updateHead = function(du, player){
    spatialManager.unregister(this.head);

    if(this.isDead){
        return entityManager.KILL_ME_NOW;
    }

    //The head's main purpose is to shoot fireballs 
    //Update time to next fireball
    this.timeToFireball -= du;

    //Follow the body
    this.head.setPos(this.body.cx-this.body.halfWidth-this.head.halfWidth + this.head.xOffsets[this.headAnimationFrame], 
        this.body.cy -this.body.halfWidth - this.head.halfWidth + this.head.yOffsets[this.headAnimationFrame]);
    
    if(this.closeMouth){
        //The mouth is open, and should be closed
        this.shutMouth();
    }

    if(this.timeToFireball < 0 && !this.mouthOpen && !this.charged){
        //Ridley can shoot a fireball, so she must open her mouth
        this.openMouth();
    }
    else if(this.mouthOpen && !this.charged){
        //Her mouth is open, so she needs to charge up her fireball
        this.chargefireBall(du);
    }
    else if(this.charged && !this.closeMouth){
        //She is charged up, and ready to fire

        //She must wait a bit between each shot
        this.timeToNextshot -= du;
        if(this.timeToNextshot < 0){
            //She can shoot
            this.shootFireball(player);
        }
    }

    
    this.head.spriteData = {
        x: this.head.Xdists[this.headAnimationFrame],
        y: this.head.Ydists[this.headAnimationFrame],
        w: this.head.widths[this.headAnimationFrame],
        h: this.head.heights[this.headAnimationFrame]
    };
    this.head.halfHeight = this.head.spriteData.h * this.scale;
    this.head.halfWidth = this.head.spriteData.w * this.scale;
    spatialManager.register(this.head);
}

Ridley.prototype.updateHand = function(du){
    spatialManager.unregister(this.hand);

    if(this.isDead){
        return entityManager.KILL_ME_NOW;
    }

    //the hands don't do anything, just follow the body
    this.hand.setPos(this.body.cx-this.body.halfWidth-this.hand.halfWidth + 10, 
        this.body.cy + this.hand.halfHeight+ 22);
    spatialManager.register(this.hand);
}

Ridley.prototype.updateLeg = function(du){
    spatialManager.unregister(this.leg);
    
    if(this.isDead){
        return entityManager.KILL_ME_NOW;
    }

    //The legs don't really do anything, they just follow the body
    this.leg.setPos(this.body.cx+this.body.halfWidth-this.leg.halfWidth - 20, 
        this.body.cy + this.leg.halfHeight+30);
    spatialManager.register(this.leg);
}

Ridley.prototype.updateWing = function(du){
    spatialManager.unregister(this.wing);
    
    if(this.isDead){
        return entityManager.KILL_ME_NOW;
    }

    //The wings must always follow the body
    this.wing.setPos(this.body.cx+this.body.halfWidth-this.wing.halfWidth + 80, 
        this.body.cy  + this.wing.yOffsets[this.animationFrame] - 50);

    //update the size, since they are always changing
    this.wing.halfHeight = this.wing.heights[this.animationFrame] * this.scale;
    this.wing.halfWidth = this.wing.widths[this.animationFrame] * this.scale;

    //Update sprite, since it is always changing
    this.wing.spriteData = {
        x: this.wing.Xdists[this.animationFrame],
        y: this.wing.Ydists[this.animationFrame],
        w: this.wing.widths[this.animationFrame],
        h: this.wing.heights[this.animationFrame]
    };
    spatialManager.register(this.wing);
}

Ridley.prototype.updateJar = function(du){
    spatialManager.unregister(this.jar);

    if(this.isDead){
        return entityManager.KILL_ME_NOW;
    }
        
    this.updateJarAnimation();
    this.jar.spriteData = {
        x: this.jar.xDists[this.jarAnimationFrame],
        y: this.jar.yDist,
        w: this.jar.Swidth,
        h: this.jar.Sheight
    }
    //Holdin jar, follow hand
    this.jar.setPos(this.hand.cx - 20, this.hand.cy + 50);

    spatialManager.register(this.jar);
}

Ridley.prototype.updateTail = function(du){
    //Update each tailpart so that it's still the same relative to the root
    for(var i = 0; i < this.tailLength; i++){
        this.tail[i].update(this.tail[0], this);
    }


    this.tailX = this.tail[0].cx;
    this.tailY = this.tail[0].cy;
    
    if(this.tailTimer < 0){
        //So that the tail stays in the same spot for a bit
        this.needsTailTarget = true;
    }
    if(this.needsTailTarget){
        //find new place for tail to go
        this.chooseTailLocation(du);
    }

    //check if the tail has reached it's target
    var tailEnd = this.tail[this.tailLength - 1];
    
    if((tailEnd.cx < this.tailTargetX + this.tailX + 20) 
    && (tailEnd.cx > this.tailTargetX + this.tailX - 20)
    && (tailEnd.cy < this.tailTargetY + this.tailY + 20) 
    && (tailEnd.cy > this.tailTargetY + this.tailY - 20))
    {
        this.tailTimer -= du;
    }
    else{
        //The tail is in the process of reaching it's target

        //find direction to target and normalize
        var dx = tailEnd.cx - this.tailTargetX - this.tailX;
        var dy = tailEnd.cy - this.tailTargetY - this.tailY;
        
        const len = Math.sqrt(dx * dx + dy * dy);
        dx = -dx/len;
        dy = -dy/len;
        this.applyFABRIK(dx, dy);
    }
 }

 Ridley.prototype.applyFABRIK = function(dx, dy){
     //set new goal
     this.tail[this.tailLength-1].cx += dx*this.tailSpeed;
     this.tail[this.tailLength-1].cy += dy*this.tailSpeed;

     this.goalX = this.tail[this.tailLength-1].cx;
     this.goalY = this.tail[this.tailLength-1].cy;

     //The actual algorithm 
     //Go backwards for each tailPart
     for(var i = this.tailLength-2; i>= 0; i--){
        this.updatePoint(this.tail[i], this.tail[i+1]);
     }
 }

Ridley.prototype.updatePoint = function(e1, e2){ 
    
    var dx = e1.cx - e2.cx;
    var dy = e1.cy - e2.cy;

    const len = Math.sqrt(dx*dx + dy*dy);

    dx = dx/len;
    dy = dy/len;

    e1.cx = e2.cx + dx * e1.partLength;
    e1.cy = e2.cy + dy * e1.partLength;
}

Ridley.prototype.render = function(ctx){

    
    if(this.isFlying && this.spriteData){
        this.drawBodyPart(ctx, this);
        return;
    }
    
    if(this.body.cy < -200){
        return;
    }

    //If there is a fireball in Ridley's mouth, render it
    if(this.fireball){
        this.fireball.render(ctx);
    }

    //Draw each body part
    this.drawBodyPart(ctx, this.head);
    this.drawBodyPart(ctx, this.body);
    this.drawBodyPart(ctx, this.jar);
    this.drawBodyPart(ctx, this.hand);
    this.drawBodyPart(ctx, this.leg);
    this.drawBodyPart(ctx, this.wing);
    this.renderTail(ctx);
}

Ridley.prototype.drawBodyPart = function(ctx, part){
    //Render a body part
    s = part.spriteData;
    ctx.drawImage(ridleySheet,6*s.x,6*s.y,6*s.w,6*s.h,
        part.cx-part.halfWidth - g_camera.cx,
        part.cy-part.halfHeight - g_camera.cy,
        2*s.w*this.scale,2*s.h*this.scale);
}

Ridley.prototype.renderTail = function(ctx){
    for(var i = 0; i<this.tailLength; i++){
        this.tail[i].render(ctx);
    }
}

Ridley.prototype.updateAnimationFrame = function(){
    //This is for the wings, since they are always flapping
    this.framenr += 1;
    if (this.animationFrame === 5){
        this.reverseAnimationFrame = true;
    }
    else if (this.animationFrame === 0){
        this.reverseAnimationFrame = false;
    }
    if (this.framenr > this.framesToAnimationFrame){
        (this.reverseAnimationFrame)? this.animationFrame -= 1 : this.animationFrame += 1;
        this.framenr = 0;
    }
}

Ridley.prototype.updateHeadAnimation = function(){
    this.headFramenr += 1;
    if (this.headFramenr > this.headFramesToAnimationFrame){
        if(this.closeMouth){
            if(this.headAnimationFrame > 0){
                this.headAnimationFrame -= 1;
            }
        }
        if (this.headAnimationFrame < 2){
            this.headAnimationFrame += 1;
        }
        this.headFramenr = 0;
    }
}

Ridley.prototype.updateJarAnimation = function(){
    this.jarFramenr += 1;
    if(this.jarFramenr > this.jarFramesToAnimationFrame){
        this.jarAnimationFrame += 1;
        this.jarFramenr = 0;
    }
    if(this.jarAnimationFrame > 3){
        this.jarAnimationFrame = 0;
    }
}

Ridley.prototype.openMouth = function(){
    //Animation for opening Ridley's mouth
    this.updateHeadAnimation();
    if(this.headAnimationFrame === 2){
        this.mouthOpen = true;
        this.timeToFireball = 1000;
        this.fireball = new Fire(this.head.cx -g_camera.cx -50, this.head.cy- g_camera.cy, 0, 0);
    }
}

Ridley.prototype.shutMouth = function(){
    //Animation for closing Ridley's mouth
    this.headFramenr += 1;
    if (this.headFramenr > this.headFramesToAnimationFrame){
        this.headAnimationFrame -= 1;
        this.headFramenr = 0;
    }
    if (this.headAnimationFrame <= 0){
        this.closeMouth = false;
        this.mouthOpen = false;
        this.charged = false;
        this.timeToFireball = Math.floor(Math.random()*(300-200) + 200);
    }
}

Ridley.prototype.chargefireBall = function(du){
    //The mouth is open, so Ridley charges up a fireball
        this.chargeTime -= du;
        if (this.chargeTime < 0){
            //She has charged up, ready to shoot
            this.charged = true;
            this.ballnr = 1;
            this.timeToNextshot = 0;
        }
}

Ridley.prototype.shootFireball = function(player){
    if(this.shotsFired > 5){
        //She has shot all of her fireballs and must close her mouth
        this.closeMouth = true;
        this.charged = false;
        this.hasShot = true;
        this.timeToFireball = 1000;
        this.chargeTime = 100;
        this.shotsFired = 0;
        if(this.fireball) this.fireball.isDead = true;
    }
    //Find player and shoot in her direction
    this.findAngleToPlayer(player)
    this.shotsFired += 1;
    entityManager._bullets.push(new Fire(this.head.cx - g_camera.cx - 45, this.head.cy- g_camera.cy - 5, this.fireVelX, this.fireVelY));
    this.timeToNextshot = 15;
}

Ridley.prototype.getShot = function(shot, part){
    //What happens if Ridley gets shot
    this.health -= 10;
}

Ridley.prototype.findAngleToPlayer = function(player){
    //Determine in which direction to shoot the fireball

    //ridley shooting coordinates
    const x = this.head.cx  - 55;
    const y = this.head.cy - 25;

    //Player coordinates
    this.targetX = player.cx;
    this.targetY = player.cy;

    //Difference between the two
    var dx = this.targetX - x;
    var dy = this.targetY - y;

    //Normalize the distance into a unit vector
    const len = Math.sqrt(dx*dx + dy*dy);
    dx = dx/len;
    dy = dy/len;

    this.fireVelX = dx;
    this.fireVelY = dy;

}

Ridley.prototype.moveToNewPosition = function(player){
    //Ridley always wants to be in a specific frame around the player

    var x = player.cx;
    var y = player.cy;

    var dist = Math.random()*(this.maxDistFromPlayer-this.minDistFromPlayer) + this.minDistFromPlayer;
    var angle = Math.random()*(this.maxAngleFromPlayer-this.minAngleFromPlayer) + this.minAngleFromPlayer;

    this.moveTargetX = x + dist*Math.cos(angle);
    this.moveTargetY = y - dist*Math.sin(angle);

    if(this.moveTargetX > g_canvas.width-100){
        this.moveTargetX = g_canvas.width-100;
    }

    if(this.moveTargetY < 250){
        this.moveTargetY = 250;
    }

    this.hasReachedTarget = false;
}

Ridley.prototype.updateVelocity = function(){
    
    var dx = this.moveTargetX - this.body.cx;
    var dy = this.moveTargetY - this.body.cy;
    const len = Math.sqrt(dx*dx + dy*dy);

    this.velX = dx/len;
    this.velY = dy/len;
}

Ridley.prototype.shouldMove = function(player){
    var dist = Math.pow(player.cx - this.moveTargetX,2)+Math.pow(player.cy - this.moveTargetY,2)
    if(this.moveTargetX < player.cx){
        //Samus behind Ridley
        return true;
    }
    if(dist < Math.pow(this.minDistFromPlayer,2)){
        //Too close
        return true;
    }
    if(dist > Math.pow(this.maxDistFromPlayer,2)){
        //Too far
        return true;
    }
}

Ridley.prototype.chooseTailLocation = function(du){
    this.tailRadian += this.reverseTail*0.5;

    if((this.tailRadian > Math.random()*10 + 10 && this.reverseTail === 1)
    || this.tailRadian < Math.random()*5-10 && this.reverseTail === -1){
        this.reverseTail *= -1;
    }

    var dl = Math.random()*50;

    this.tailTargetX  = Math.cos(this.tailRadian)*(this.tailDist+dl);
    this.tailTargetY  = Math.sin(this.tailRadian)*(this.tailDist+dl);

    if(this.tailTargetY < -10){
        this.tailTargetY = Math.random()*10-20;
    }
    if(this.tailTargetX < -150){
        this.tailTargetX += (Math.random()*50+50);
    }

    this.needsTailTarget = false;
    this.tailTimer = 0;
}

Ridley.prototype.updateFlyingFrame = function(){
    this.flyingFrame += 1;
    if(this.flyingFrame > 10){
        this.flyingAnimation += 1;
        this.flyingAnimation %= 2;
        this.flyingFrame = 0;
    }
}

Ridley.prototype.escape = function(du){
    //update sprite
    this.updateFlyingFrame();
    this.halfWidth = this.escapingSprites[2][this.flyingAnimation]*this.scale;
    this.halfHeight = this.escapingSprites[3][this.flyingAnimation]*this.scale;
    this.spriteData = {
        x: this.escapingSprites[0][this.flyingAnimation],
        y: this.escapingSprites[1][this.flyingAnimation],
        w: this.escapingSprites[2][this.flyingAnimation],
        h: this.escapingSprites[3][this.flyingAnimation]
    }

    //first flies down from the top of the screen
    if(this.cy > 500) this.goingDown = false;

    if(this.goingDown){
        //Shes flying down
        this.cy += 20;
        this.cx = 900 + (this.escapingSprites[5][this.flyingAnimation]*this.scale/2) + this.flyingX;
        return;
    }

    //She has reached her location, so now she flies towards the camera and up
    this.flyingTime += 1;
    this.flyingTime *= 1.08;
    this.flyingX += 1;
    this.cy = 500 + (this.escapingSprites[4][this.flyingAnimation]*this.scale/2) - this.flyingTime;
    this.cx = 900 + (this.escapingSprites[5][this.flyingAnimation]*this.scale/2) + this.flyingX;
    this.scale *= 1.05;

    if(this.scale > 7){
        //She has escaped, so remove her from the game
        this.isDead = true;
        RidleyFight.stop();
    }
}

Ridley.prototype.unregister = function(){
    //Unregister all body parts from the spatial manager
    spatialManager.unregister(this.body);
    spatialManager.unregister(this.head);
    spatialManager.unregister(this.hand);
    spatialManager.unregister(this.jar);
    spatialManager.unregister(this.leg);
    spatialManager.unregister(this.wing);
    for(var i = 0; i< this.tailLength; i++){
        spatialManager.unregister(this.tail[i]);
    }
}

Ridley.prototype.escapingSprites = [
    //Sprites used for the escape sequence
    [4, 129],  //x
    [418, 431],//y
    [119, 127],//w
    [116, 103], //h
    [-26, 0], //Y offset
    [-16, 0]  //X offset
]