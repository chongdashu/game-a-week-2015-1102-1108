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

    p.onAddEntity = function() {
        console.error("onAddEntity()");
    };


    p.create = function() {
        var self = this;

        $(".asset-image").on("mousedown", function(event) {
            event.preventDefault();
            console.error("mousedown");
            $(this).addClass("float");

            var img = $("<img></img>").attr("src", $(this).attr("src"));
            self.selectedEntity = img;

            $(img).css({
                top: event.clientY - $(self.selectedEntity).get(0).height/2,
                left: event.clientX - $(self.selectedEntity).get(0).width/2,
                position: "absolute"
            });


            
            $("body").append(img);
        });

        $("body").on("mouseup", function(event) {
            console.error("mouseup");
            if (self.selectedEntity) {

                if (event.clientX >= 0 && event.clientX <= 640 && event.clientY >= 0 && event.clientY <= 480 ) {
                    self.onAddEntity();
                }

                $(self.selectedEntity).remove();
            }
        });


        $(window).on("mousemove", function(event) {
            if (self.selectedEntity) {
                $(self.selectedEntity).css({
                    top: event.clientY - $(self.selectedEntity).get(0).height/2,
                    left: event.clientX - $(self.selectedEntity).get(0).width/2,
                    position: "absolute"
                });
            }
        });
    };

    p.update = function() {
    };



// Link
// ----
chongdashu.Assets = createjs.promote(Assets, "SpriteComponent");

}());