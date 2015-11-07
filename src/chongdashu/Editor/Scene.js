/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Scene
 * @class Game.Component.Scene
 * @extends Core.Component
 * @extends Game.Component.SpriteComponent
 * @constructor
 **/
var Scene = function(game, divId) {
    // @param {Phaser.Keyboard} entity
    this.init(game, divId);
};
var p = Scene.prototype;

    p.sceneObjects = {};
    p.playing = false;

    p.init = function(game, divId)
    {
        this.game = game;

        console.log("[Scene], init(), divId=%s", divId);
        if (typeof divId == "undefined" || divId === null) {
            divId = "scene-container";
        }
        console.log("[Scene], init(), divId=%s", divId);

        this.container = $("#"+divId).get(0);
        this.footer = $(this.container).find(".scene-info");
        console.warn($(this.footer));

        this.sceneObjects = {};

        var self = this;

        this.playing = false;

        this.refreshControls();

        $("#button-play").on("click", function() {
            self.playing = !self.playing;
            self.refreshControls();
        });
        
    };

    p.refreshControls = function() {
        var self = this;
        $("#button-play").removeClass("btn-success");
        $("#button-play").removeClass("btn-danger");
        $("#button-play").removeClass("btn-default");
        $("#button-play").removeClass("active");

        $("#button-play").addClass(self.playing ? "btn-success" : "btn-primary");
    };

    p.update = function() {
        var self = this;
        if (self.game && self.game.input && self.game.input.activePointer) {
            // console.warn($(self.footer));
            $(self.footer).html(
                "x: " + self.game.input.activePointer.x + " " +
                "y: " + self.game.input.activePointer.y + " | " +
                "world.X: " + self.game.input.activePointer.worldX + " " +
                "world.y: " + self.game.input.activePointer.worldY
            );
        }

    };


// Link
// ----
chongdashu.Scene = createjs.promote(Scene, "SpriteComponent");

}());