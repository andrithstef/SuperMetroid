function Tile(descr) {
    this.setup(descr);
    this.setTile();


}


Tile.prototype = new Entity();
Tile.prototype.shape = "Rect";
Tile.prototype.width = 64;
Tile.prototype.height = 64;
Tile.prototype.halfWidth = 32;
Tile.prototype.halfHeight = 32;

//replacement for sprite data, until then
Tile.prototype.colour = 'white';
Tile.prototype.shape = "Rect";

Tile.prototype.setTile = function(){
    if (this.id ==='WL1'){
        this.collidable = true;
        this.sx = 0;
        this.sy = 0;
        // 0,0
    }
    else if(this.id ==='WL2'){
        this.collidable = true;
        this.sx = 0;
        this.sy = 64;
        //0,64
    }
    else if(this.id ==='WL3'){
        this.collidable = true;
        this.sx = 0;
        this.sy= 128;
        // 0,128
    }
    else if(this.id ==='WL4'){
        this.collidable = true;
        this.sx = 0;
        this.sy= 192;
        // 0,192
    }
    else if(this.id ==='WR1'){
        this.collidable = true;
        this.sx = 0;
        this.sy= 256;
        // 0,256
    }
    else if(this.id ==='WR2'){
        this.collidable = true;
        this.sx = 0;
        this.sy= 320;
        // 0,320
    }
    else if(this.id ==='WR3'){
        this.collidable = true;
        this.sx = 0;
        this.sy= 384;
        // 0,384
    }
    else if(this.id ==='WR4'){
        this.collidable = true;
        this.sx = 0;
        this.sy= 448;
        // 0,448
    }
    else if(this.id ==='ID1'){
        this.collidable = false;
        this.sx = 640;
        this.sy= 512;
        // 0,512
    }
    else if(this.id ==='ID2'){
        this.collidable = false;
        this.sx = 640;
        this.sy= 576;
        // 0,576
    }
    else if(this.id ==='ID3'){
        this.collidable = false;
        this.sx = 640;
        this.sy= 640;
        // 0,640
    }
    else if(this.id ==='ID4'){
        this.collidable = false;
        this.sx = 640;
        this.sy= 704;
        // 0,704
    }
    else if(this.id ==='PL1'){
        this.collidable = true;
        this.sx = 64;
        this.sy = 0;
        // 64,0
    }
    else if(this.id ==='PL2'){
        this.collidable = true;
        this.sx = 64;
        this.sy = 64;
        // 64,64
    }
    else if(this.id ==='PR1'){
        this.collidable = true;
        this.sx = 64;
        this.sy = 128;
        // 64,128
    }
    else if(this.id ==='PR2'){
        this.collidable = true;
        this.sx = 64;
        this.sy = 192;
        // 64,192
    }
    else if(this.id ==='>1'){
        this.collidable = false;
        this.sx = 64;
        this.sy = 256;
        // 64,256
    }
    else if(this.id ==='>2'){
        this.collidable = false;
        this.sx = 64;
        this.sy = 320;
        // 64,320
    }
    else if(this.id ==='<1'){
        this.collidable = false;
        this.sx = 64;
        this.sy = 384;
        // 64,384
    }
    else if(this.id ==='<2'){
        this.collidable = false;
        this.sx = 64;
        this.sy = 448;
        // 64,448
    }
    else if(this.id ==='EL'){
        this.collidable = false;
        this.sx = 128;
        this.sy =0;
        // 128,0
    }
    else if(this.id ==='ER'){
        this.collidable = false;
        this.sx = 128;
        this.sy =64;
        // 128,64
    }
    else if(this.id ==='PL'){
        this.collidable = true;
        this.sx = 128;
        this.sy =128;
        // 128,128
    }
    else if(this.id ==='SP1'){
        this.collidable = true;
        this.sx = 128;
        this.sy =192;
        // 128,192
    }
    else if(this.id ==='SP5'){
        this.collidable = false;
        this.sx = 128;
        this.sy =256;
        // 128,256
    }
    else if(this.id ==='GML'){
        this.collidable = true;
        this.sx = 128;
        this.sy =320;
        // 128,320
    }
    else if(this.id ==='#TL'){
        this.collidable = true;
        this.sx = 128;
        this.sy =384;
        // 128,384
    }
    else if(this.id ==='#BL'){
        this.collidable = true;
        this.sx = 128;
        this.sy =448;
        // 128,448
    }
    else if(this.id ==='MLL'){
        this.collidable = false;

        this.sx = 192;
        this.sy = 0;
        // 192,0
    }
    else if(this.id ==='MLD'){
        this.collidable = false;

        this.sx = 192;
        this.sy = 64;
        // 192,64
    }
    else if(this.id ==='PM'){
        this.collidable = true;

        this.sx = 192;
        this.sy = 128;
        // 192,128
    }
    else if(this.id ==='SP2'){
        this.collidable = true;

        this.sx = 192;
        this.sy = 192;
        // 192,192
    }
    else if(this.id ==='SP6'){
        this.collidable = true;

        this.sx = 192;
        this.sy = 256;
        // 192,256
    }
    else if(this.id ==='GMR'){
        this.collidable = true;

        this.sx = 192;
        this.sy = 320;
        // 192,320
    }
    else if(this.id ==='#TR'){
        this.collidable = true;

        this.sx = 192;
        this.sy = 384;
        // 192,384
    }
    else if(this.id ==='#BL'){
        this.collidable = true;

        this.sx = 192;
        this.sy = 448;
        // 192,448
    }
    else if(this.id ==='MRL'){
        this.collidable = false;

        this.sx = 256;
        this.sy = 0;
        // 256,0
    }
    else if(this.id ==='MRD'){
        this.collidable = false;

        this.sx = 256;
        this.sy = 64;
        // 256,64
    }
    else if(this.id ==='PR'){
        this.collidable = true;

        this.sx = 256;
        this.sy = 128;
        // 256,128
    }
    else if(this.id ==='SP3'){
        this.collidable = true;

        this.sx = 256;
        this.sy = 192;
        // 256,192
    }
    else if(this.id ==='SP7'){
        this.collidable = true;

        this.sx = 256;
        this.sy = 256;
        // 256,256
    }
    else if(this.id ==='MTL'){
        this.collidable = true;

        this.sx = 256;
        this.sy = 320;
        // 256,320
    }
    else if(this.id ==='Li1'){
        this.collidable = false;

        this.sx = 256;
        this.sy = 284;
        // 256,384
    }
    else if(this.id ==='Li4'){
        this.collidable = false;

        this.sx = 256;
        this.sy = 448;
        // 256,448
    }
    else if(this.id ==='D/'){
        this.collidable = false;

        this.sx = 320;
        this.sy = 0;
        // 320,0
    }
    else if(this.id ==='ML/'){
        this.collidable = false;

        this.sx = 320;
        this.sy = 64;
        // 320,64
    }
    else if(this.id ==='#'){
        this.collidable = true;

        this.sx = 320;
        this.sy = 128;
        // 320,128
    }
    else if(this.id ==='SP4'){
        this.collidable = true;

        this.sx = 320;
        this.sy = 192;
        // 320,192
    }
    else if(this.id ==='SP8'){
        this.collidable = false;

        this.sx = 320;
        this.sy = 256;
        // 320,256
    }
    else if(this.id ==='MTR'){
        this.collidable = true;

        this.sx = 320;
        this.sy = 320;
        // 320,320
    }
    else if(this.id ==='Li2'){
        this.collidable = false;

        this.sx = 320;
        this.sy = 384;
        // 320,384
    }
    else if(this.id ==='Li4'){
        this.collidable = false;

        this.sx = 320;
        this.sy = 448;
        // 320,448
    }
    else if(this.id ==='L/'){
        this.collidable = false;

        this.sx = 384;
        this.sy = 0;
        //384,0
    }
    else if(this.id ==='MR/'){
        this.collidable = false;

        this.sx = 384;
        this.sy = 64;
        //384,64
    }
    else if(this.id ==='DB1'){
        this.collidable = true;

        this.sx = 384;
        this.sy = 128;
        this.isDoor = true;
        this.dir = 'right';
        //384,128
    }
    else if(this.id ==='DB2'){
        this.collidable = true;

        this.sx = 384;
        this.sy = 192;
        this.isDoor = true;
        this.dir = 'right';
        //384,192
    }
    else if(this.id ==='DB3'){
        this.collidable = true;

        this.sx = 384;
        this.sy = 256;
        this.isDoor = true;
        this.dir = 'right';
        //384,256
    }
    else if(this.id ==='DB4'){
        this.collidable = true;

        this.sx = 384;
        this.sy = 320;
        this.isDoor = true;
        this.dir = 'right';
        //384,320
    }
    else if(this.id ==='IO'){
        this.collidable = true;

        this.sx = 384;
        this.sy = 384;
        //  384,384
        // width 128, height 386
        this.width = 128;
        this.halfWidth = 64;
        this.height = 386;
        this.halfHeight = 192;
        //sprite over door before its shot
    }
    else if(this.id ==='0'){
        this.collidable = false;

        this.sx = 448;
        this.sy = 0;
        // 448,0
    }

    else if(this.id ==='0col'){
        this.collidable = false;

        this.sx = 448;
        this.sy = 0;
        // 448,0
    }
    else if(this.id ==='!!L'){
        this.collidable = false;

        this.sx = 448;
        this.sy = 64;
        // 448,64
    }
    else if(this.id ==='XL'){
        this.collidable = false;

        this.sx = 448;
        this.sy = 128;
        // 448,128
    }
    else if(this.id ==='//L'){
        this.collidable = false;

        this.sx = 448;
        this.sy = 192;
        // 448,192
    }
    else if(this.id ==='||TD'){
        this.collidable = false;

        this.sx = 448;
        this.sy = 256;
        // 448,256
    }
    else if(this.id ==='B|'){
        this.collidable = true;

        this.sx = 448;
        this.sy = 320;
        // 448,320
    }

    else if(this.id ==='||ML'){
        this.collidable = false;

        this.sx = 512;
        this.sy = 0;
        // 512,0
    }
    else if(this.id ==='_LL'){
        this.collidable = false;

        this.sx = 512;
        this.sy = 64;
        // 512,64
    }
    else if(this.id ==='||BD'){
        this.collidable = false;

        this.sx = 512;
        this.sy = 128;
        // 512,128
    }
    else if(this.id ==='_MD'){
        this.collidable = false;

        this.sx = 512;
        this.sy = 192;
        // 512,192
    }
    else if(this.id ==='-#D'){
        this.collidable = false;

        this.sx = 512;
        this.sy = 256;
        // 512,256
    }
    else if(this.id ==='B_'){
        this.collidable = true;

        this.sx = 512;
        this.sy = 320;
        // 512,320
    }
    else if(this.id ==='STL'){
        this.collidable = true;

        this.sx = 512;
        this.sy = 384;
        // 512,384
    }
    else if(this.id ==='B-|'){
        this.collidable = true;

        this.sx = 512;
        this.sy = 448;
        // 512,448
    }
    else if(this.id ==='DL1'){
        this.collidable = true;

        this.sx = 512;
        this.sy = 512;
        this.isDoor = true;
        // 512,512
    }
    else if(this.id ==='DL2'){
        this.collidable = true;

        this.sx = 512;
        this.sy = 576;
        this.isDoor = true;
        // 512,512
    }
    else if(this.id ==='DL3'){
        this.collidable = true;

        this.sx = 512;
        this.sy = 640;
        this.isDoor = true;
        // 512,512
    }
    else if(this.id ==='DL4'){
        this.collidable = true;

        this.sx = 512;
        this.sy = 704;
        this.isDoor = true;
        // 512,512
    }
    else if(this.id ==='|#L'){
        this.collidable = false;

        this.sx = 576;
        this.sy = 0;
        // 576,0
    }
    else if(this.id ==='_RL'){
        this.collidable = false;

        this.sx = 576;
        this.sy = 64;
        // 576,64
    }
    else if(this.id ==='||TL'){
        this.collidable = false;

        this.sx = 576;
        this.sy = 128;
        // 576,128
    }
    else if(this.id ==='||MD'){
        this.collidable = false;

        this.sx = 576;
        this.sy = 192;
        // 576,192
    }
    else if(this.id ==='_RD'){
        this.collidable = false;

        this.sx = 576;
        this.sy = 256;
        // 576,256
    }
    else if(this.id ==='B-'){
        this.collidable = true;

        this.sx = 576;
        this.sy = 320;
        // 576,320
    }
    else if(this.id ==='StTL'){
        this.collidable = true;

        this.sx = 576;
        this.sy = 384;
        // 576,384
    }
    else if(this.id ==='B_|'){
        this.collidable = true;

        this.sx = 576;
        this.sy = 448;
        // 576,448
    }
    else if(this.id ==='DL5'){
        this.collidable = true;

        this.sx = 576;
        this.sy = 512;
    }
    else if(this.id ==='DL6'){
        this.collidable = true;

        this.sx = 576;
        this.sy = 576;
    }
    else if(this.id ==='DL7'){
        this.collidable = true;

        this.sx = 576;
        this.sy = 640;
    }
    else if(this.id ==='DL8'){
        this.collidable = true;

        this.sx = 576;
        this.sy = 704;
    }
    else if(this.id ==='|_L'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 0;
        // 640,0
    }
    else if(this.id ==='||BL'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 64;
        // 640,64
    }
    else if(this.id ==='|-L'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 128;
        // 640,128
    }
    else if(this.id ==='|#DL'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 192;
        // 640,192
    }
    else if(this.id ==='-|D'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 256;
        // 640,256
    }
    else if(this.id ==='TL'){
        this.collidable = true;

        this.sx = 640;
        this.sy = 320;
        // 640,320
    }
    else if(this.id ==='StBL'){
        this.collidable = true;

        this.sx = 640;
        this.sy = 384;
        // 640,384
    }
    else if(this.id ==='B|_'){
        this.collidable = true;

        this.sx = 640;
        this.sy = 448;
        // 640,448
    }
    else if(this.id ==='DR1'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 512;
        // 640,512
    }
    else if(this.id ==='DR2'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 576;
    }

    else if(this.id ==='DR3'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 640;
    }
    else if(this.id ==='DR4'){
        this.collidable = false;

        this.sx = 640;
        this.sy = 704;
    }
    else if(this.id ==='_|L'){
        this.collidable = false;

        this.sx = 704;
        this.sy = 0;
        // 704,0
    }
    else if(this.id ==='_ML'){
        this.collidable = false;

        this.sx = 704;
        this.sy = 64;
        // 704,64
    }
    else if(this.id ==='-|L'){
        this.collidable = false;

        this.sx = 704;
        this.sy = 128;
        // 704,128
    }
    else if(this.id ==='#|DL'){
        this.collidable = false;

        this.sx = 704;
        this.sy = 192;
        // 704,192
    }
    else if(this.id ==='_|D'){
        this.collidable = false;

        this.sx = 704;
        this.sy = 256;
        // 704,256
    }
    else if(this.id ==='TR'){
        this.collidable = true;

        this.sx = 704;
        this.sy = 320;
        // 704,320
    }
    else if(this.id ==='StBR'){
        this.collidable = true;

        this.sx = 704;
        this.sy = 384;
        // 704,384
    }
    else if(this.id ==='B|-'){
        this.collidable = true;

        this.sx = 704;
        this.sy = 448;
        // 704,448
    }

    else if(this.id ==='DR5'){
        this.collidable = true;

        this.sx = 704;
        this.sy = 512;
        this.isDoor = true;
        this.dir = 'right';
        // 640,512
    }
    else if(this.id ==='DR6'){
        this.collidable = true;

        this.sx = 704;
        this.sy = 576;
        this.isDoor = true;
        this.dir = 'right';
    }

    else if(this.id ==='DR7'){
        this.collidable = true;

        this.sx = 704;
        this.sy = 640;
        this.isDoor = true;
        this.dir = 'right';
    }
    else if(this.id ==='DR8'){
        this.collidable = true;

        this.sx = 704;
        this.sy = 704;
        this.isDoor = true;
        this.dir = 'right';
    }
    else if(this.id ==='#|L'){
        this.collidable = false;

        this.sx = 768;
        this.sy = 0;
        // 768,0
    }
    else if(this.id ==='#L'){
        this.collidable = false;

        this.sx = 768;
        this.sy = 64;
        // 768,64
    }
    else if(this.id ==='-#L'){
        this.collidable = false;

        this.sx = 768;
        this.sy = 128;
        // 768,128
    }
    else if(this.id ==='_#L'){
        this.collidable = false;

        this.sx = 768;
        this.sy = 192;
        // 768,192
    }
    else if(this.id ==='|_D'){
        this.collidable = false;

        this.sx = 768;
        this.sy = 256;
        // 768,256
    }
    else if(this.id ==='BL'){
        this.collidable = true;

        this.sx = 768;
        this.sy = 320;
        // 768,320
    }
    else if(this.id ==='StTR'){
        this.collidable = true;

        this.sx = 768;
        this.sy = 384;
        // 768,384
    }
    else if(this.id ==='B'){
        this.collidable = true;

        this.sx = 768;
        this.sy = 448;
        // 768,448
    }
    else if(this.id ==='BD1'){
        this.collidable = true;

        this.sx = 768;
        this.sy = 512;
        // 768,512
    }
    else if(this.id ==='BD2'){
        this.collidable = true;

        this.sx = 768;
        this.sy = 576;
        // 768,576
    }
    else if(this.id ==='BD3'){
        this.collidable = true;

        this.sx = 768;
        this.sy = 640;
        // 768,640
    }
    else if(this.id ==='BD4'){
        this.collidable = true;

        this.sx = 768;
        this.sy = 704;
        // 768,704
    }
    else if(this.id ==='OL'){
        this.collidable = false;

        this.sx = 832;
        this.sy = 0;
        // 832,0
    }
    else if(this.id ==='//R'){
        this.collidable = false;

        this.sx = 832;
        this.sy = 64;
        // 832,64
    }
    else if(this.id ==='XR'){
        this.collidable = false;

        this.sx = 832;
        this.sy = 128;
        // 832,128
    }
    else if(this.id ==='!!R'){
        this.collidable = false;

        this.sx = 832;
        this.sy = 192;
        // 832,192
    }
    else if(this.id ==='|-D'){
        this.collidable = false;

        this.sx = 832;
        this.sy = 256;
        // 832,256
    }
    else if(this.id ==='BR'){
        this.collidable = true;

        this.sx = 832;
        this.sy = 320;
        // 832,320
    }
    else if(this.id ==='STR'){
        this.collidable = true;
        this.sx = 832;
        this.sy = 384;
        // 832,384
    }
    else if(this.id ==='Bt'){
        this.collidable = true;
        this.sx = 832;
        this.sy = 448;
        // 832,448
    }
    else if(this.id ==='*L'){
        this.collidable = true;
        this.sx = 832;
        this.sy = 512;
        // 832,512
    }
    else if(this.id ==='BFL'){
        this.collidable = true;
        this.sx = 832;
        this.sy = 576;
        // 832,576
    }
    else if(this.id ==='*R'){
        this.collidable = true;
        this.sx = 832;
        this.sy = 640;
896    // 832,640
    }
    else if(this.id ==='[L'){
        this.collidable = false;
        this.sx = 896;
        this.sy = 0;
        // 896,0
    896
    }
    else if(this.id ==='rL'){
        this.collidable = false;
        this.sx = 896;
        this.sy = 64;
        // 896,64
    }
    else if(this.id ==='!FB'){
        this.collidable = false;
        this.sx = 896;
        this.sy = 128;
        // 896,128
    }
    else if(this.id ==='!|F'){
        this.colli896able = false;
        this.sx = 896;
        this.sy = 192;
        // 896,192
    }
    else if(this.id ==='s|'){
        this.collidable = false;
        this.sx = 896;
        this.sy = 256;
        // 896,256
    }
    else if(this.id ==='#|DD'){
        this.collidable = false;
        this.sx = 896;
        this.sy = 320;
        // 896,320
    }
    else if(this.id ==='Ts1'){
        this.collidable = false;
        this.sx = 896;
        this.sy = 384;
        // 896,384
    }
    else if(this.id ==='Tb1'){
        this.collidable = false;
        this.sx = 896;
        this.sy = 448;
        // 896,448
    }
    else if(this.id ==='^T'){
        this.collidable = true;
        this.sx = 896;
        this.sy = 512;
        // 896,512
    }
    else if(this.id ==='BFR'){
        this.collidable = true;
        this.sx = 896;
        this.sy = 640;
        // 896,640
    }
    else if(this.id ==='[R'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 0;
        // 960, 0
    }
    else if(this.id ==='tL'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 64;
        // 960,64
    }
    else if(this.id ==='!FT'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 128;
        //960,128
    }
    else if(this.id ==='OD'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 192;
        //960,192
    }
    else if(this.id ==='|#DD'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 256;
        //960,256
    }
    else if(this.id ==='_#D'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 320;
        //960,320
    }
    else if(this.id ==='Ts2'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 384;
        //960,384
    }
    else if(this.id ==='Tb2'){
        this.collidable = false;
        this.sx = 960;
        this.sy = 448;
        //960,448
    }
    else if(this.id ==='^B'){
        this.collidable = true;
        this.sx = 960;
        this.sy = 512;
        //960,512
    }
    else if(this.id ===']L'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 0;
        // 1024,0
    }
    else if(this.id ==='rR'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 64;
        // 1024,64
    }
    else if(this.id ==='/FT'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 128;
        // 1024,128
    }
    else if(this.id ==='|-DL'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 192;
        // 1024,192
    }
    else if(this.id ==='#D'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 256;
        // 1024,256
    }
    else if(this.id ==='!!T'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 320;
        // 1024,320
    }
    else if(this.id ==='Ts3'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 384;
        // 1024,384
    }
    else if(this.id ==='Tb3'){
        this.collidable = false;
        this.sx = 1024;
        this.sy = 448;
        // 1024,448
    }
    else if(this.id ==='Br'){
        this.collidable = true;
        this.sx = 1024;
        this.sy = 512;
        // 1024,512
    }
    else if(this.id ===']R'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 0;
        // 1088,0
    }
    else if(this.id ==='tR'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 64;
        // 1088,64
    }
    else if(this.id ==='/FB'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 128;
        // 1088,128
    }
    else if(this.id ==='|/F'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 192;
        // 1088,256
    }
    else if(this.id ==='|s'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 256;
        // 1088,320
    }
    else if(this.id ==='XT'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 320;
        // 1088,384
    }
    else if(this.id ==='Blk'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 384;
        // 1088,384
    }
    else if(this.id ==='//T'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 320;
        // 1152, 320
    }
    else if(this.id ==='Tb4'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 448;
        // 1088, 448
    }
    else if(this.id ==='BBsR'){
        this.collidable = true;
        this.sx = 1088;
        this.sy = 512;
    }
    else if(this.id ==='BBsL'){
        this.collidable = true;
        this.sx = 1088;
        this.sy = 576;
    }
    else if(this.id ==='#r'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 0;
    }
    else if(this.id ==='#t'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 64;
    }
    else if(this.id ==='!!ext1'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 128;
    }
    else if(this.id ==='//ext1'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 192;
    }
    else if(this.id ==='!!ext2'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 448;
    }
    else if(this.id ==='//ext2'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 512;
    }
    else if(this.id ==='!!ext3'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 640;
    }
    else if(this.id ==='.ext1'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 640;
    }
    else if(this.id ==='.ext2'){
        this.collidable = false;
        this.sx = 1088;
        this.sy = 704;
    }
    else if(this.id ==='//ext3'){
        this.collidable = false;
        this.sx = 1152;
        this.sy = 704;
    }
    else{
        return false;
    }
};

Tile.prototype.isCollidable = function(){
    return this.collidable;
}
