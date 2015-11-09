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

    p.cursor = null;

    p.waitForInventory = false;
    p.waitForFinale = false;

    p.init = function(game)
    {
        this.game = game;
    };

    p.create = function() {
        var self = this;
        this.actions = null;
        this.actionIndex = -1;
        this.actionTimer = -1;
        this.waitForInventory = false;
        this.waitForFinale = false;
    };

    p.processEquippedWithHotspot = function(state, equipped, hotspot) {
        console.error("processEquippedWithHotSpot, state=%o, equipped=%o, hotspot.uid=%s", state, equipped, hotspot.uid);
        if (hotspot.uid == "object_1") {

            this.cursor = "none";

            this.waitForInventory = true;


            state.endTileX = 5;
            state.endTileY = 9;
            state.equippedEntity.visible = false;
            state.equippedEntity = null;
            
            return true;
        }
        else {
            equipped.x = -self.game.width/2 + 32 + equipped.width/2;
            equipped.y = self.game.height/3;
            equipped.inventory = true;
            state.equippedEntity = null;
            return false;
        }
        
    };

    p.processHotspot = function(state, action, entity) {
        console.error("processHotspot");
        
        var actionKey = action.key.split("action-icon-")[1];
        var hotspot = this.game.hotspots.json[entity.uid];

        var actions = hotspot[actionKey];

        console.error(actionKey);
        console.error(hotspot);
        console.error(actions);

        if (actions) {
            var self = this;

            this.actions = actions;

            $.each(actions, function(index, action) {

                var keys = Object.keys(action);

                var key = keys[0];
                if (keys.length == 2) {
                    if ("INVENTORY" in action && entity.inventory) {
                        key = keys[1];
                    }
                    else if ("VISIBLE_OBJECT_3" in action && scene.sceneObjects["object_3"].visible) {
                        key = keys[1];
                        self.waitForFinale = true;
                        self.cursor = "none";

                    }
                    else {
                        return true;
                    }

                }
                
                var value = action[key];

                self.actionIndex = index;

                if (key == "SAY") {
                    self.actionTimer = Math.min(2000, value.split(" ").length * 500);
                    if (state.speechText) {
                        state.speechText.setText(value);
                    }

                    // self.cursor = "none";
                   
                    return false;
                }
                else if (key == "INPUT") {
                    if (value) {
                        self.cursor = null;
                    }
                    else {
                        self.cursor = "none";
                    }
                }
                else if (key == "WALK_TO") {
                    this.actions = actions;
                    state.endTileX = value[0];
                    state.endTileY = value[1];
                    return false;
                }
                else if (key == "ADD_TO_INVENTORY") {
                    entity.x = -self.game.width/2 + 32 + entity.width/2;
                    entity.y = self.game.height/3;
                    entity.inventory = true;
                }
                else if (key == "EQUIP") {
                    console.error("EQUIP!!!");
                    state.equippedEntity = entity;
                    return false;
                }

            });
        }

        

    };

    p.update = function() {

        var state = this.game.state.getCurrentState();
        var self = this;

        if (this.cursor) {
            $("canvas").css("cursor", this.cursor);
        }

        if (this.waitForInventory) {
            var tileX = 5;
            var tileY = 9;

            if (state.player) {
                var playerTileY = Math.floor((state.player.y + this.game.height/2) / 32);
                var playerTileX = Math.floor((state.player.x + this.game.width/2) / 32);


                if (playerTileX == tileX && playerTileY == tileY) {
                    
                    scene.sceneObjects["object_3"].visible = true;
                    state.equippedEntity = null;
                    self.cursor = null;
                    $("canvas").css("cursor", "default");
                    this.waitForInventory = false;

                }
            }

            
        }
        else if (this.waitForFinale) {
            var tileX = 18;
            var tileY = 10;

            if (state.player) {
                var playerTileY = Math.floor((state.player.y + this.game.height/2) / 32);
                var playerTileX = Math.floor((state.player.x + this.game.width/2) / 32);

                if (playerTileX == tileX && playerTileY == tileY) {
                    
                    this.game.state.start("GameOverState");

                }
            }
        }

        else if (this.actions) {
            var action = this.actions[this.actionIndex];
            var key = Object.keys(action)[0];
            var value = action[key];

            if (key == "WALK_TO") {
                var tileX = value[0];
                var tileY = value[1];

                if (state.player) {
                    var playerTileY = Math.floor((state.player.y + this.game.height/2) / 32);
                    var playerTileX = Math.floor((state.player.x + this.game.width/2) / 32);

                    console.error("tileX=%s, tileY=%s, playerX=%s, playerY=%s", tileX, tileY, playerTileX, playerTileY);

                    if (playerTileX == tileX && playerTileY == tileY) {
                        this.actionIndex++;
                    }
                }
            }
            else if (key == "INPUT") {
                console.error("INPUT NOW");
                if (value) {
                    self.cursor = null;
                    $("canvas").css("cursor", "default");

                }
                else {
                    self.cursor = "none";
                }

                this.actionIndex++;
            }
            if (key == "SAY" && self.actionTimer == -1) {
                console.error("SAY NOW");
                self.actionTimer = Math.min(2000, value.split(" ").length * 500);
                if (state.speechText) {
                    state.speechText.setText(value);
                }
            }
        }


        if (this.actionTimer > 0 ) {
            console.error("this.actionTimer=%s", this.actionTimer);
            this.actionTimer -= this.game.time.elapsed;
        }
        else if (this.actionTimer < -1) {
            this.actionTimer = -1;

            if (this.actions) {
                
                var action = this.actions[this.actionIndex];

                console.error(action);

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