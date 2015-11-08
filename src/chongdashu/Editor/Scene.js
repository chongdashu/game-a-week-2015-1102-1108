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
    p.sceneObjectProperties = {};
    p.playing = false;
    p.selectedEntity = null;
    p.onButtonPlayCallbacks = [];
    p.sceneObjectCounter = 0;

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
        this.sceneObjectProperties = {};

        this.onButtonPlayCallbacks = [];

        var self = this;

        this.playing = false;
        this.sceneObjectCounter = 0;

        this.refreshControls();

        $("#button-play").on("click", function() {
            self.playing = !self.playing;
            self.refreshControls();
            self.onButtonPlayCallback();
        });

        $("#property-world-x").on("change", function(event) {
            if (self.selectedEntity) {
                self.selectedEntity.x = parseInt($(this).val(), 10);
            }
        });

        $("#property-world-y").on("change", function(event) {
            if (self.selectedEntity) {
                self.selectedEntity.y = parseInt($(this).val(), 10);
            }
        });

        $("#property-body-velocity-x").on("change", function(event) {
            if (self.selectedEntity) {
                self.selectedEntity.body.velocity.x = parseInt($(this).val(), 10);
            }
        });

        $("#property-body-velocity-y").on("change", function(event) {
            if (self.selectedEntity) {
                self.selectedEntity.body.velocity.y = parseInt($(this).val(), 10);
            }
        });

        $("#property-body-enabled").on("change", function(event) {
            if ($(event.target).prop("checked")) {
                if (self.selectedEntity && (!self.selectedEntity.body || !self.selectedEntity.body.enable)) {
                    self.game.physics.arcade.enable(self.selectedEntity);
                }
                self.updateProperties();
            }
        });

        $("#button-save-entities").on("click", function() {
            self.save();
            $(".modal").modal();
            $(".modal .object-properties").html(JSON.stringify(self.sceneObjectProperties, null, 4));
            $(".modal .object-properties").focus();
            $(".modal .object-properties").select();
        });


        
    };

    p.onButtonPlayCallback = function() {
        for (var i=0; i < this.onButtonPlayCallbacks.length; i++) {
            var info = this.onButtonPlayCallbacks[i];
            var fn = info[0];
            var context = info[1];
            fn.call(context, this.playing);
        }
    };

    p.create = function() {
        var self = this;
        this.game.input.keyboard.onUpCallback = function(event) {
            if (event.keyCode == Phaser.Keyboard.ESC) {
                self.unsetEntity();
            }
            if (event.keyCode == Phaser.Keyboard.BACKSPACE) {
                var entity = self.unsetEntity();
                if (entity) {
                    self.remove(entity);
                }
            }
        };
    };

    p.remove = function(entity) {
        var obj = $(".scene-object[uid=" + entity.uid + "]");
        obj.remove();
        var state = this.game.state.getCurrentState();
        if (state.onEntityRemove) {
            state.onEntityRemove(entity);
        }

        delete this.sceneObjects[entity.uid];
        delete this.sceneObjectProperties[entity.uid];

    };

    p.getNextUid = function() {
        var largestUid = -1;
        $.each(this.sceneObjects, function(key, value) {
            var uid = parseInt(key.split("object_")[1], 10);
            largestUid = Math.max(uid, largestUid);
        });

        return largestUid+1;
    };

    p.add = function(entity) {
        var tr = $('<tr class="scene-object"><td class="object-uid"></td><td class="object-key"></td></tr>');
        var uid = "object_" + this.getNextUid();

        this.sceneObjectCounter++;

        tr.attr("uid", uid);
        tr.attr("key", entity["key"]);
        console.log(entity);

        tr.find(".object-uid").html(uid);
        tr.find(".object-key").html(entity.key);

        $("#scene-objects").append(tr);
        this.sceneObjects[uid] = entity;
        entity.uid = uid;
    };

    p.unsetEntity = function() {
        
        var entity = this.selectedEntity;

        if (this.selectedEntity) {
            this.selectedEntity.tint = 0xFFFFFF;
            this.selectedEntity = null;
        }

        $("#scene-objects").find("tr.success").removeClass("success");

        return entity;
    };

    p.setEntity = function(entity) {

        this.unsetEntity();

        this.selectedEntity = entity;

        this.pointerDeltaX = this.game.input.activePointer.worldX - this.selectedEntity.x;
        this.pointerDeltaY = this.game.input.activePointer.worldY - this.selectedEntity.y;

        this.selectedEntity.tint = 0x00FF00;
        this.updateProperties();
    };

    p.refreshControls = function() {
        var self = this;
        $("#button-play").removeClass("btn-success");
        $("#button-play").removeClass("btn-danger");
        $("#button-play").removeClass("btn-default");
        $("#button-play").removeClass("active");

        if (this.playing) {
            $("#scene-overlay").show();
        }
        else {
            $("#scene-overlay").hide();
        }

        $("#button-play").addClass(self.playing ? "btn-success" : "btn-primary");

        if (this.playing) {
            this.save();
        }
        else {
            this.load();
            this.updateProperties();
        }
    };

    p.updateProperties = function() {

        if (this.selectedEntity) {
            $(".panel-properties input").prop("disabled", false);
            $("#property-world-x").val(this.selectedEntity.x);
            $("#property-world-y").val(this.selectedEntity.y);


            if (this.selectedEntity.body && this.selectedEntity.body.enable) {
                $("#property-body-enabled").prop("checked", true);
                $("#property-body-velocity-x").val(this.selectedEntity.body.velocity.x);
                $("#property-body-velocity-y").val(this.selectedEntity.body.velocity.y);
            }
            else {
                $("#property-body-enabled").prop("checked", false);
                $("#property-body-velocity-y").prop("disabled", true);
                $("#property-body-velocity-x").prop("disabled", true);
            }
            $("#scene-objects").find("tr[uid="+this.selectedEntity.uid+"]").addClass("success");
        }

       
    };

    p.onAssetAdd = function(info, x, y) {
        var state = this.game.state.getCurrentState();
        if (state.onAssetAdd) {
            state.onAssetAdd(info["name"], -this.game.width/2+x, -this.game.height/2+y);
        }
    };

    p.save = function() {
        var self = this;
        $.each(this.sceneObjects, function(uid, entity) {
            if (!(uid in self.sceneObjectProperties)) {
                self.sceneObjectProperties[uid] = {};
            }
            self.sceneObjectProperties[uid].x = entity.x;
            self.sceneObjectProperties[uid].y = entity.y;
            self.sceneObjectProperties[uid]["key"] = entity.key;
            self.sceneObjectProperties[uid]["bodyEnabled"] = entity.body !== null;
            if (entity.body) {
                self.sceneObjectProperties[uid]["body.velocity.x"] = entity.body.velocity.x;
                self.sceneObjectProperties[uid]["body.velocity.y"] = entity.body.velocity.y;
            }
            
        });
    };

    p.load = function() {
        var self = this;
        var state = this.game.state.getCurrentState();
        $.each(this.sceneObjectProperties, function(id, properties) {

            if (state.onAssetAdd && !(id in self.sceneObjects)) {
                var obj = state.onAssetAdd(properties["key"], properties["x"], properties["y"]);
                obj.uid = id;
                self.sceneObjects[id] = obj;
            }
            
        });

        $.each(this.sceneObjects, function(id, entity) {
            if (!(id in self.sceneObjectProperties)) {
                return;
            }
            self.sceneObjects[id]["uid"] = id;
            self.sceneObjects[id].x = self.sceneObjectProperties[id]["x"];
            self.sceneObjects[id].y = self.sceneObjectProperties[id]["y"];
            self.sceneObjects[id]["key"] = entity.key;

            if (self.sceneObjectProperties[id]["bodyEnabled"]) {
                // it was enabled earlier, check
                if (!self.sceneObjects[id].body || !self.sceneObjects[id].body.enable) {
                    self.game.physics.arcade.enable(self.sceneObjects[id].body);
                    self.sceneObjects[id].body.enable = true;
                }
            }
            else {
                if (self.sceneObjects[id].body && self.sceneObjects[id].body.enable) {
                    self.sceneObjects[id].body.enable = false;
                }
            }

            if (self.sceneObjects[id].body && self.sceneObjects[id].body.enable) {
                self.sceneObjects[id].body.velocity.x = self.sceneObjectProperties[id]["body.velocity.x"];
                self.sceneObjects[id].body.velocity.y = self.sceneObjectProperties[id]["body.velocity.y"];
            }
        });
    

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

        if (self.selectedEntity) {
            if (self.selectedEntity.input.pointerDown(this.game.input.activePointer.id)) {
                self.selectedEntity.x = this.game.input.activePointer.worldX - this.pointerDeltaX;
                self.selectedEntity.y = this.game.input.activePointer.worldY - this.pointerDeltaY;
                this.updateProperties();
            }
            
        }
        else {
            $(".panel-properties input").prop("disabled", true);
        }
        



    };


// Link
// ----
chongdashu.Scene = createjs.promote(Scene, "SpriteComponent");

}());