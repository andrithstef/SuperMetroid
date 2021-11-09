function Tile(descr) {
    this.setup(descr);
    this.setTile();

    this.cx += this.halfWidth;
    this.cy += this.halfHeight;
}

Tile.prototype = new Entity();
Tile.prototype.shape = "Rect";
Tile.prototype.width = 64;
Tile.prototype.height = 64;
Tile.prototype.halfWidth = 32;
Tile.prototype.halfHeight = 32;
Tile.prototype.collidable = false;

//replacement for sprite data, until then
Tile.prototype.colour = 'white';

Tile.prototype.setTile = function(){
    if (this.id ===1){
        this.collidable = true;
        this.colour = 'blue';
    }
};
