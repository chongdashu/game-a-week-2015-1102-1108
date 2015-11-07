/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Assets
 * @class Game.Component.Assets
 * @extends Core.Component
 * @extends Game.Component.SpriteComponent
 * @constructor
 **/
var Assets = function(game, divId) {
    // @param {Phaser.Keyboard} entity
    this.init(game, divId);
};
var p = Assets.prototype;

    p.selectedEntity = null;
    
    p.init = function(game, divId)
    {
        this.game = game;

        console.log("[Assets], init(), divId=%s", divId);
        if (typeof divId == "undefined" || divId === null) {
            divId = "assets-container";
        }

        this.container = $("#"+divId).get(0);
        this.images = $(this.container).find(".assets-images");
    };

    p.setJson = function(assetsJson) {
        if (typeof assetsJson == "undefined" || assetsJson === null) {
            console.error("[Assets], load(), assetsJson=%s", assetsJson);
            return;
        }

        this.json = assetsJson;
    };

    p.load = function() {
        for (var i=0; i < this.json["images"].length; i++) {
            var asset = this.json["images"][i];

            this.game.load.image(asset["name"], asset["path"]);

            $(".assets-images").append(
                $('<div class="col-md-1"></div>').append(
                    $('<img class="thumbnail asset-image"></img>')
                        .attr("src", asset["path"])
                        .attr("name", asset["name"])));
        }
    };


    p.start = function() {
        
    };

    p.update = function() {
        
    };



// Link
// ----
chongdashu.Assets = createjs.promote(Assets, "SpriteComponent");

}());