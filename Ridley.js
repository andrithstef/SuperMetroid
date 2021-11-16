function Ridley(){

    this.isKillable = true;
    this.isDamaging = false;

    this.cx = 1000;
    this.cy = 400;

    this.init();
}

const ridleySheet = new Image();
ridleySheet.src = "resrc/Ridley.png"

Ridley.prototype.health = 1000;
Ridley.prototype.scale = 2;

//Body parts that make up Ridley
Ridley.prototype.body = new Entity();
Ridley.prototype.head = new Entity();
Ridley.prototype.leg = new Entity();
Ridley.prototype.wing = new Entity();
Ridley.prototype.hand = new Entity();
Ridley.prototype.tail = new Entity();

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
Ridley.prototype.maxDistFromPlayer = 700;
Ridley.prototype.minDistFromPlayer = 300;
Ridley.prototype.minAngleFromPlayer = 0.05;
Ridley.prototype.maxAngleFromPlayer = Math.PI/3;


//Fireball stuff
Ridley.prototype.timeToFireball = Math.floor(Math.random()*(500-300) + 300);
Ridley.prototype.ballnr = 0;
Ridley.prototype.chargeTime = 100;
Ridley.prototype.mouthOpen = false;
Ridley.prototype.charged = false;
Ridley.prototype.hasShot = false;
Ridley.prototype.closeMouth = false;
Ridley.prototype.timeToNextshot = 30;
Ridley.prototype.shotsFired = 0;
Ridley.prototype.targetX;
Ridley.prototype.targetY;

Ridley.prototype.init = function() {
    //This is just initial setup for each body part

    //Set body
    this.body.setup();
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
    this.head.setup();
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
    this.hand.setup();
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
    this.leg.setup();
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
    this.wing.setup();
    this.wing.isFireproof = true;
    this.wing.Xdists = [4, 50, 95, 4, 48, 93]; //x coords of sprites
    this.wing.Ydists = [277, 284, 293, 312, 314, 315]; //y coords of sprites
    this.wing.widths = [39, 38, 37, 37, 38, 40]; //widths of sprites
    this.wing.heights = [28, 21, 12, 13, 21, 27]; //Heights of sprites
    this.wing.yOffsets = [-40, -30, 0, 0, 20, 40] //Offsets for the wing
    this.wing.halfheight = 28 * this.scale;
    this.wing.halfWidth = 39 * this.scale;

}

Ridley.prototype.update = function(du, player){
    //If there is a fireball in ridley's mouth, we must update it
    if(this.fireball){
        this.fireball.update(du, this);
        if (this.fireball.isDead) this.fireball = null;
    }

    //Update each body part
    this.updateAnimationFrame();
    this.updateBody(du, player);
    this.updateHead(du, player);
    this.updateHand(du);
    this.updateLeg(du);
    this.updateWing(du);
}

Ridley.prototype.updateBody = function(du, player){
    spatialManager.unregister(this.body);
    //The body is the centre of the whole body
    //Each body part's location is based on the body's location

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

    //the hands don't do anything, just follow the body
    this.hand.setPos(this.body.cx-this.body.halfWidth-this.hand.halfWidth + 10, 
        this.body.cy + this.hand.halfHeight+ 22);
    spatialManager.register(this.hand);
}

Ridley.prototype.updateLeg = function(du){
    spatialManager.unregister(this.leg);
    
    //The legs don't really do anything, they just follow the body
    this.leg.setPos(this.body.cx+this.body.halfWidth-this.leg.halfWidth - 5, 
        this.body.cy + this.leg.halfHeight+ 22);
    spatialManager.register(this.leg);
}

Ridley.prototype.updateWing = function(du){
    spatialManager.unregister(this.wing);
    
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

Ridley.prototype.render = function(ctx){
    //If there is a fireball in Ridley's mouth, render it
    if(this.fireball){
        this.fireball.render(ctx);
    }

    if(this.moveTargetX){
        ctx.beginPath();
        ctx.fillRect(this.moveTargetX - g_camera.cx, this.moveTargetY - g_camera.cy, 20, 20);
        ctx.stroke();
    }

    //Draw each body part
    this.drawBodyPart(ctx, this.head);
    this.drawBodyPart(ctx, this.body);
    this.drawBodyPart(ctx, this.hand);
    this.drawBodyPart(ctx, this.leg);
    this.drawBodyPart(ctx, this.wing);
}

Ridley.prototype.drawBodyPart = function(ctx, part){
    //Render a body part
    s = part.spriteData;
    ctx.drawImage(ridleySheet,6*s.x,6*s.y,6*s.w,6*s.h,
        part.cx-part.halfWidth - g_camera.cx,
        part.cy-part.halfHeight - g_camera.cy,
        2*s.w*this.scale,2*s.h*this.scale);
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
        this.timeToFireball = Math.floor(Math.random()*(500-300) + 300);
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
    if(this.shotsFired > 3){
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
    this.timeToNextshot = 30;
}

Ridley.prototype.getShot = function(shot){
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

    console.log("new target!");

    var x = player.cx;
    var y = player.cy;

    var dist = Math.random()*(this.maxDistFromPlayer-this.minDistFromPlayer) + this.minDistFromPlayer;
    var angle = Math.random()*(this.maxAngleFromPlayer-this.minAngleFromPlayer) + this.minAngleFromPlayer;

    console.log(dist, angle);

    this.moveTargetX = x + dist*Math.cos(angle);
    this.moveTargetY = y - dist*Math.sin(angle);

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
        console.log("samus behind ridley");
        return true;
    }
    if(dist < Math.pow(this.minDistFromPlayer,2)){
        console.log("Too close!!!!");
        return true;
    }
    if(dist > Math.pow(this.maxDistFromPlayer,2)){
        console.log("too far!!1");
        return true;
    }
}