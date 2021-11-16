function SpecialItem(descr){
    this.setup(descr);

}

SpecialItem.prototype = new Entity();
SpecialItem.prototype.SpriteSource = new Image();
SpecialItem.prototype.SpriteSource.src = "resrc/SpecialSprite.png";
SpecialItem.prototype.itemID = null;
SpecialItem.prototype.Platform = function(num){
    this.width = 128
    this.sx = 0;
    this.height = 32;
    this.cx = 448;
    this.cy = 384;
    this.halfHeight = 16;
    this.halfWidth = 64;
    if (num === 1){
        this.sy = 384;
        this.itemID = 'Platform1';
    }
    if (num === 2){
        this.sy = 416;
        this.itemID = 'Platform2';
    }
};

SpecialItem.prototype.beforeDoor = function(){
    this.cx = 1088;
    this.cy = 2368;
    this.sx = 0;
    this.sy = 0;
    this.width = 128;
    this.height = 384;
    this.halfWidth = 64;
    this.halfHeight = 192;
    this.itemID = 'beforeDoor';
};

SpecialItem.prototype.BigVat = function(){
    this.sx = 504;
    this.sy = 0;
    this.sx = 716;
    this.sy = 0;
    this.width = 624;
    this.height = 1024;
    this.halfWidth = 312;
    this.halfHeight = 512;
    this.itemID = 'BigVat';
};

SpecialItem.prototype.DoorLeft = function(){
    //all height: 256
    //all width: 32
    /*
    closed
    sx: 472
    sy: 0
    */

    /*
    opening 1
    sx: 436
    sy: 0
    */

    /*
    opening 2
    sx: 400
    sy: 0
    */

    /*
    opening 3
    sx: 356
    sy: 0
    */

    /*
    opening 4
    sx: 316
    sy: 0
    */
};

SpecialItem.prototype.DoorRight = function(){
    //all height: 256
    //all width: 32
    /*
    closed
    sx: 128
    sy: 0
    */

    /*
    opening 1
    sx: 164
    sy: 0
    */

    /*
    opening 2
    sx: 200
    sy: 0
    */

    /*
    opening 3
    sx: 244
    sy: 0
    */

    /*
    opening 4
    sx: 284
    sy: 0
    */
};

SpecialItem.prototype.Burner = function(num){
    this.width = 88;
    this.height = 21;
    this.cx = 468;
    this.cy = 490;
    this.sx = 128;
    this.halfWidth = 44;
    this.height = 10.5;
    if (num===1){
        this.sy = 256;
        this.itemID = 'Burner1'
    }
    if (num===2){
        this.sy = 276;
        this.itemID = 'Burner2'
    }
    if (num===3){
        this.sy = 296;
        this.itemID = 'Burner3'
    }
    if (num===4){
        this.sy = 316;
        this.itemID = 'Burner4'
    }
};
