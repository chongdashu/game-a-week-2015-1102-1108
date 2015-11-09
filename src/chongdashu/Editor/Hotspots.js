/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Hotspots
 * @class Game.Component.Hotspots
 * @extends Core.Component
 * @extends Game.Component.SpriteComponent
 * @constructor
 **/
var Hotspots = function(game) {
    // @param {Phaser.Keyboard} entity
    this.init(game);
};
var p = Hotspots.prototype;

    p.images = {};
    p.actionTimer = -1;

    p.actions = null;
    p.actionIndex = -1;

    p.init = function(game)
    {
        this.game = game;
    };

    p.create = function() {
        var self = this;
        this.actions = null;
        this.actionIndex = -1;
    };

    p.processHotspot = function(state, action, entity) {
        console.error("processHotspot");
        
        var actionKey = action.key.split("action-icon-")[1];
        var hotspot = this.game.hotspots.json[entity.uid];

        var actions = hotspot[actionKey];

        console.error(actionKey);
        console.error(hotspot);
        console.error(actions);

        var self = this;

        this.actions = actions;

        $.each(actions, function(index, action) {
            var key = Object.keys(action)[0];
            var value = action[key];

            self.actionIndex = index;

            if (key == "SAY") {
                self.actionTimer = Math.max(2000, value.split(" ").length * 500);
                if (state.speechText) {
                    state.speechText.setText(value);
                }
               
                return false;
            }
        });

    };

    p.update = function() {

        var state = this.game.state.getCurrentState();

        if (this.actionTimer > 0 ) {
            this.actionTimer -= this.game.time.elapsed;
        }
        else {
            this.actionTimer = -1;
            if (this.actions) {
                console.error(this.actions);
                var action = this.actions[this.actionIndex];

                var key = Object.keys(action)[0];
                var value = action[key];

                if (key == "SAY") {
                    if (state.speechText)
                        state.speechText.setText("");
                }

                this.actionIndex++;
                if (this.actionIndex >= this.actions.length) {
                    this.actions = null;
                    this.actionIndex = -1;
                }



            }
        }
    };



// Link
// ----
chongdashu.Hotspots = createjs.promote(Hotspots, "SpriteComponent");

}());