function Tile(descr) {
    this.setup(descr);
    this.setTile();


}

Tile.prototype.tileSheet = new Image ();
Tile.prototype = new Entity();
Tile.prototype.shape = "Rect";
Tile.prototype.width = 64;
Tile.prototype.height = 64;
Tile.prototype.halfWidth = 32;
Tile.prototype.halfHeight = 32;
Tile.prototype.collidable = false;

//replacement for sprite data, until then
Tile.prototype.colour = 'white';
Tile.prototype.shape = "Rect";

Tile.prototype.setTile = function(){
    if (this.id ==='WL1'){
        this.collidable = true;
        // 0,0
    }
    else if(this.id ==='WL2'){
        this.collidable = true;
        //0,64
    }
    else if(this.id ==='WL3'){
        this.collidable = true;
        // 0,128
    }
    else if(this.id ==='WL4'){
        this.collidable = true;
        // 0,192
    }
    else if(this.id ==='WR1'){
        this.collidable = true;
        // 0,256
    }
    else if(this.id ==='WR2'){
        this.collidable = true;
        // 0,320
    }
    else if(this.id ==='WR3'){
        this.collidable = true;
        // 0,384
    }
    else if(this.id ==='WR4'){
        this.collidable = true;
        // 0,448
    }
    else if(this.id ==='ID1'){
        this.collidable = false;
        // 0,512
    }
    else if(this.id ==='ID2'){
        this.collidable = false;
        // 0,576
    }
    else if(this.id ==='ID3'){
        this.collidable = false;
        // 0,640
    }
    else if(this.id ==='ID4'){
        this.collidable = false;
        // 0,704
    }
    else if(this.id ==='PL1'){
        this.collidable = true;
        // 64,0
    }
    else if(this.id ==='PL2'){
        this.collidable = true;
        // 64,64
    }
    else if(this.id ==='PR1'){
        this.collidable = true;
        // 64,128
    }
    else if(this.id ==='PR2'){
        this.collidable = true;
        // 64,192
    }
    else if(this.id ==='>1'){
        this.collidable = true;
        // 64,256
    }
    else if(this.id ==='>2'){
        this.collidable = true;
        // 64,320
    }
    else if(this.id ==='<1'){
        this.collidable = true;
        // 64,384
    }
    else if(this.id ==='<2'){
        this.collidable = true;
        // 64,448
    }
    else if(this.id ==='EL'){
        this.collidable = true;
        // 128,0
    }
    else if(this.id ==='ER'){
        this.collidable = true;
        // 128,64
    }
    else if(this.id ==='PL'){
        this.collidable = true;
        // 128,128
    }
    else if(this.id ==='SP1'){
        this.collidable = true;
        // 128,192
    }
    else if(this.id ==='SP5'){
        this.collidable = false;
        // 128,256
    }
    else if(this.id ==='GML'){
        this.collidable = true;
        // 128,320
    }
    else if(this.id ==='#TL'){
        this.collidable = true;
        // 128,384
    }
    else if(this.id ==='#BL'){
        this.collidable = true;
        // 128,448
    }
    else if(this.id ==='MLL'){
        this.collidable = true;
        // 192,0
    }
    else if(this.id ==='MLD'){
        this.collidable = true;
        // 192,64
    }
    else if(this.id ==='PM'){
        this.collidable = true;
        // 192,128
    }
    else if(this.id ==='SP2'){
        this.collidable = true;
        // 192,192
    }
    else if(this.id ==='SP6'){
        this.collidable = true;
        // 192,256
    }
    else if(this.id ==='GMR'){
        this.collidable = true;
        // 192,320
    }
    else if(this.id ==='#TR'){
        this.collidable = true;
        // 192,384
    }
    else if(this.id ==='#BL'){
        this.collidable = true;
        // 192,448
    }
    else if(this.id ==='MRL'){
        this.collidable = true;
        // 256,0
    }
    else if(this.id ==='MRD'){
        this.collidable = true;
        // 256,64
    }
    else if(this.id ==='PR'){
        this.collidable = true;
        // 256,128
    }
    else if(this.id ==='SP3'){
        this.collidable = true;
        // 256,192
    }
    else if(this.id ==='SP7'){
        this.collidable = true;
        // 256,256
    }
    else if(this.id ==='MTL'){
        this.collidable = true;
        // 256,320
    }
    else if(this.id ==='Li1'){
        this.collidable = false;
        // 256,384
    }
    else if(this.id ==='Li4'){
        this.collidable = false;
        // 256,448
    }
    else if(this.id ==='D/'){
        this.collidable = true;
        // 320,0
    }
    else if(this.id ==='ML/'){
        this.collidable = true;
        // 320,64
    }
    else if(this.id ==='#'){
        this.collidable = true;
        // 320,128
    }
    else if(this.id ==='SP4'){
        this.collidable = true;
        // 320,192
    }
    else if(this.id ==='SP8'){
        this.collidable = false;
        // 320,256
    }
    else if(this.id ==='MTR'){
        this.collidable = true;
        // 320,320
    }
    else if(this.id ==='Li2'){
        this.collidable = false;
        // 320,384
    }
    else if(this.id ==='Li4'){
        this.collidable = false;
        // 320,448
    }
    else if(this.id ==='L/'){
        this.collidable = true;
        //384,0
    }
    else if(this.id ==='MR/'){
        this.collidable = true;
        //384,64
    }
    else if(this.id ==='DB1'){
        this.collidable = true;
        //384,128
    }
    else if(this.id ==='DB2'){
        this.collidable = true;
        //384,192
    }
    else if(this.id ==='DB3'){
        this.collidable = true;
        //384,256
    }
    else if(this.id ==='DB4'){
        this.collidable = true;
        //384,320
    }
    else if(this.id ==='IO'){
        this.collidable = true;
        //  384,384
        // width 128, height 386
        //sprite over door before its shot
    }
    else if(this.id ==='0'){
        this.collidable = false;
        // 448,0
    }
    else if(this.id ==='!!L'){
        this.collidable = false;
        // 448,64
    }
    else if(this.id ==='XL'){
        this.collidable = false;
        // 448,128
    }
    else if(this.id ==='//L'){
        this.collidable = false;
        // 448,192
    }
    else if(this.id ==='||TD'){
        this.collidable = false;
        // 448,256
    }
    else if(this.id ==='B|'){
        this.collidable = true;
        // 448,320
    }

    else if(this.id ==='||ML'){
        this.collidable = false;
        // 512,0
    }
    else if(this.id ==='_LL'){
        this.collidable = false;
        // 512,64
    }
    else if(this.id ==='||BD'){
        this.collidable = false;
        // 512,128
    }
    else if(this.id ==='_MD'){
        this.collidable = false;
        // 512,192
    }
    else if(this.id ==='-#DD'){
        this.collidable = false;
        // 512,256
    }
    else if(this.id ==='B_'){
        this.collidable = true;
        // 512,320
    }
    else if(this.id ==='STL'){
        this.collidable = true;
        // 512,384
    }
    else if(this.id ==='B-|'){
        this.collidable = true;
        // 512,448
    }
    else if(this.id ==='DL'){
        this.collidable = true;
        // 512,512
        //width 128, height 256
    }
    else if(this.id ==='|#L'){
        this.collidable = false;
        // 576,0
    }
    else if(this.id ==='_RL'){
        this.collidable = false;
        // 576,64
    }
    else if(this.id ==='||TL'){
        this.collidable = false;
        // 576,128
    }
    else if(this.id ==='||MD'){
        this.collidable = false;
        // 576,192
    }
    else if(this.id ==='_RD'){
        this.collidable = false;
        // 576,256
    }
    else if(this.id ==='B-'){
        this.collidable = true;
        // 576,320
    }
    else if(this.id ==='StTL'){
        this.collidable = true;
        // 576,384
    }
    else if(this.id ==='B_|'){
        this.collidable = true;
        // 576,448
    }
    else if(this.id ==='|_L'){
        this.collidable = false;
        // 640,0
    }
    else if(this.id ==='||BL'){
        this.collidable = false;
        // 640,64
    }
    else if(this.id ==='|-L'){
        this.collidable = false;
        // 640,128
    }
    else if(this.id ==='|#DL'){
        this.collidable = false;
        // 640,192
    }
    else if(this.id ==='-|D'){
        this.collidable = false;
        // 640,256
    }
    else if(this.id ==='TL'){
        this.collidable = true;
        // 640,320
    }
    else if(this.id ==='StBL'){
        this.collidable = true;
        // 640,384
    }
    else if(this.id ==='B|_'){
        this.collidable = true;
        // 640,448
    }
    else if(this.id ==='DR1'){
        this.collidable = true;
        // 640,512
        //width 128, height 256
    }
    else if(this.id ==='_|L'){
        this.collidable = false;
        // 704,0
    }
    else if(this.id ==='_ML'){
        this.collidable = false;
        // 704,64
    }
    else if(this.id ==='-|L'){
        this.collidable = false;
        // 704,128
    }
    else if(this.id ==='#|DL'){
        this.collidable = false;
        // 704,192
    }
    else if(this.id ==='_|D'){
        this.collidable = false;
        // 704,256
    }
    else if(this.id ==='TR'){
        this.collidable = true;
        // 704,320
    }
    else if(this.id ==='STR'){
        this.collidable = true;
        // 704,384
    }
    else if(this.id ==='B|-'){
        this.collidable = true;
        // 704,448
    }
    else if(this.id ==='#|L'){
        this.collidable = false;
        // 768,0
    }
    else if(this.id ==='#L'){
        this.collidable = false;
        // 768,64
    }
    else if(this.id ==='-#L'){
        this.collidable = false;
        // 768,128
    }
    else if(this.id ==='_#L'){
        this.collidable = false;
        // 768,192
    }
    else if(this.id ==='|_D'){
        this.collidable = false;
        // 768,256
    }
    else if(this.id ==='BL'){
        this.collidable = true;
        // 768,320
    }
    else if(this.id ==='StTR'){
        this.collidable = true;
        // 768,384
    }
    else if(this.id ==='B'){
        this.collidable = true;
        // 768,448
    }
    else if(this.id ==='BD1'){
        this.collidable = true;
        // 768,512
    }
    else if(this.id ==='BD2'){
        this.collidable = true;
        // 768,576
    }
    else if(this.id ==='BD3'){
        this.collidable = true;
        // 768,640
    }
    else if(this.id ==='BD4'){
        this.collidable = true;
        // 768,704
    }
    else if(this.id ==='OL'){
        this.collidable = false;
        // 832,0
    }
    else if(this.id ==='//R'){
        this.collidable = false;
        // 832,64
    }
    else if(this.id ==='XR'){
        this.collidable = false;
        // 832,128
    }
    else if(this.id ==='!!R'){
        this.collidable = false;
        // 832,192
    }
    else if(this.id ==='|-D'){
        this.collidable = false;
        // 832,256
    }
    else if(this.id ==='BR'){
        this.collidable = true;
        // 832,320
    }
    else if(this.id ==='StBR'){
        this.collidable = true;
        // 832,384
    }
    else if(this.id ==='Bt'){
        this.collidable = true;
        // 832,448
    }
    else if(this.id ==='*L'){
        this.collidable = true;
        // 832,512
    }
    else if(this.id ==='BFL'){
        this.collidable = true;
        // 832,576
    }
    else if(this.id ==='*R'){
        this.collidable = true;
        // 832,640
    }
    else if(this.id ==='[R'){
        this.collidable = false;
        // 896,0
    }
    else if(this.id ==='rL'){
        this.collidable = false;
        // 896,64
    }
    else if(this.id ==='!FT'){
        this.collidable = false;
        // 896,128
    }
    else if(this.id ==='!|F'){
        this.collidable = false;
        // 896,192
    }
    else if(this.id ==='s|'){
        this.collidable = false;
        // 896,256
    }
    else if(this.id ==='#|DD'){
        this.collidable = false;
        // 896,320
    }
    else if(this.id ==='Ts1'){
        this.collidable = false;
        // 896,384
    }
    else if(this.id ==='Tb1'){
        this.collidable = false;
        // 896,448
    }
    else if(this.id ==='^T'){
        this.collidable = true;
        // 896,512
    }
    else if(this.id ==='BFR'){
        this.collidable = true;
        // 896,640
    }
    else if(this.id ==='[L'){
        this.collidable = false;
        // 960, 0
    }
    else if(this.id ==='tL'){
        this.collidable = false;
        // 960,64
    }
    else if(this.id ==='!FB'){
        this.collidable = false;
        //960,128
    }
    else if(this.id ==='OD'){
        this.collidable = false;
        //960,192
    }
    else if(this.id ==='|#DD'){
        this.collidable = false;
        //960,256
    }
    else if(this.id ==='_#D'){
        this.collidable = false;
        //960,320
    }
    else if(this.id ==='Ts2'){
        this.collidable = false;
        //960,384
    }
    else if(this.id ==='Tb2'){
        this.collidable = false;
        //960,448
    }
    else if(this.id ==='^B'){
        this.collidable = true;
        //960,512
    }
    else if(this.id ===']R'){
        this.collidable = false;
        // 1024,0
    }
    else if(this.id ==='rR'){
        this.collidable = false;
        // 1024,64
    }
    else if(this.id ==='/FB'){
        this.collidable = false;
        // 1024,128
    }
    else if(this.id ==='|-DL'){
        this.collidable = false;
        // 1024,192
    }
    else if(this.id ==='#D'){
        this.collidable = false;
        // 1024,256
    }
    else if(this.id ==='!!T'){
        this.collidable = false;
        // 1024,320
    }
    else if(this.id ==='Ts3'){
        this.collidable = false;
        // 1024,384
    }
    else if(this.id ==='Tb3'){
        this.collidable = false;
        // 1024,448
    }
    else if(this.id ==='Br'){
        this.collidable = true;
        // 1024,512
    }
    else if(this.id ===']L'){
        this.collidable = false;
        // 1088,0
    }
    else if(this.id ==='tR'){
        this.collidable = false;
        // 1088,64
    }
    else if(this.id ==='/FT'){
        this.collidable = false;
        // 1088,128
    }
    else if(this.id ==='|/F'){
        this.collidable = false;
        // 1088,256
    }
    else if(this.id ==='|s'){
        this.collidable = false;
        // 1088,320
    }
    else if(this.id ==='XT'){
        this.collidable = false;
        // 1088,384
    }
    else if(this.id ==='//T'){
        this.collidable = false;
        // 1152, 320
    }
    else if(this.id ==='Tb4'){
        this.collidable = false;
        // 1088, 448
    }
};
