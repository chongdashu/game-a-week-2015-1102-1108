/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * GameState
 * @class GameState
 * @constructor
 **/
var GameState = function(game) {
};
var p = GameState.prototype;

    // @phaser
    p.preload = function() {
    };

    // @phaser
    p.create = function() {

        var map = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 1, 1, 1, 1, 1, 0, 0, 0,            
            0, 0, 0, 1, 1, 1, 0, 0, 0, 0,   0, 0, 1, 1, 1, 1, 1, 0, 0, 0,

            0, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];

        var walkMap = new Phaser.BitmapData(this.game, "walkable", this.game.world.width, this.game.world.height);

        var tileWidth = 32;
        var tileHeight = 32;

        var tilesX = this.game.world.width/tileWidth;
        var tilesY = this.game.world.height/tileHeight;

        for (var i=0; i < map.length; i++) {
            if (map[i] == 1) {

                var tileY = Math.floor(i / tilesX);
                var tileX = Math.floor(i % tilesX);

                var left = tileWidth*tileX;
                var top =  tileHeight*tileY;

                walkMap.context.fillStyle = "#00AA00";
                walkMap.context.fillRect(left, top, tileWidth, tileHeight);
                walkMap.context.rect(left, top, tileWidth, tileHeight);
                walkMap.context.stroke();

                console.log("tile=[%s, %s], Rect=[%s, %s, %s, %s]", tileX, tileY, left, top, tileWidth, tileHeight);

            }


        }

        this.game.add.image(-this.game.width/2, - this.game.height/2, walkMap);

        // -- grid

        var bitmap = new Phaser.BitmapData(this.game, "grid", this.game.world.width, this.game.world.height);
        // These functions use the canvas context to draw lines using the canvas API
        for(var y = this.game.height-32; y >= 0; y -= 32) {
            bitmap.context.beginPath();
            bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            bitmap.context.moveTo(0, y);
            bitmap.context.lineTo(this.game.width, y);
            bitmap.context.stroke();
        }
        for(var x = this.game.width-32; x >= 0; x -= 32) {
            bitmap.context.beginPath();
            bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            bitmap.context.moveTo(x, 0);
            bitmap.context.lineTo(x, this.game.height);
            bitmap.context.stroke();
        }
        this.game.add.image(-this.game.width/2, -this.game.world.height/2, bitmap);

    };

    // @phaser
    p.update = function() {
       
    };

    

// Link
// ----
chongdashu.GameState = GameState;

}());


