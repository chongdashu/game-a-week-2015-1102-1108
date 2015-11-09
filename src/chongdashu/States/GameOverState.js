/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game
* @msubmodule   State
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * GameOverState
 * @class State.GameOverState
 * @constructor
 **/
var GameOverState = function(game) {
};
var p = GameOverState.prototype;
    

    // @phaser
    p.preload = function() {
        Debug.log("[GameOverState], preload()", Debug.LEVEL_ENGINE);
        
    };

    // @phaser
    p.create = function() {
        Debug.log("[GameOverState], create()", Debug.LEVEL_ENGINE);

        // Preloader specific stuff.
        // -------------------------
        
        var titleStyle = {
            font: "bold 24px Consolas",
            fill: "#ffaabb",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 4
        };
        var subtitleStyle = {
            font: "16px Consolas",
            fill: "#aaaabb",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 3
        };
        var instructionStyle = {
            font: "12px Consolas",
            fill: "#fefefe",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 1
        };
        var twitterText = {
            font: "11px Consolas",
            fill: "#aaaaff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 1
        };
        var startStyle = {
            font: "12px Consolas",
            fill: "#fefefe",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 1
        };

        this.titleText = this.game.add.text(0, -64, "Congratulations!", titleStyle);
        this.titleText.anchor.setTo(0.5, 0.5);
        this.subtitleText = this.game.add.text(0, -64+32, "You Win!", subtitleStyle);
        this.subtitleText.anchor.setTo(0.5, 0.5);
        this.twitterText = this.game.add.text(0, 0, "@chongdashu", twitterText);
        this.twitterText.anchor.setTo(0.5, 0.5);
        
        this.startText = this.game.add.text(0, +96, "Refresh Page to Play Again", instructionStyle);
        this.startText.anchor.setTo(0.5, 0.5);
        
        this.instructionsText = this.game.add.text(0, +64, "", startStyle);
        this.instructionsText.anchor.setTo(0.5, 0.5);

       
    };

    // @phaser
    p.update = function() {
        // this.loadingText.text = "Loading: " + this.load.progress + "%";
        
    };

    // @phaser
    p.render = function() {
    };
    

// Link
// ----
chongdashu.GameOverState = GameOverState;

}());


