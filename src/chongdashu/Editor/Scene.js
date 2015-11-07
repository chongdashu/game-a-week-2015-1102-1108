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
        };
    };

    p.unsetEntity = function() {
        
        if (this.selectedEntity) {
            this.selectedEntity.tint = 0xFFFFFF;
            this.selectedEntity = null;
        }

        $("#scene-objects").find("tr.success").removeClass("success");
    };

    p.setEntity = function(entity) {
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
        }
    };

    p.updateProperties = function() {
        $("#property-world-x").val(this.selectedEntity.x);
        $("#property-world-y").val(this.selectedEntity.y);
        $("#scene-objects").find("tr[key="+this.selectedEntity.key+"]").addClass("success");
    };

    p.add = function(entity) {
        var tr = $('<tr class="scene-object"><td class="object-attribute-name"></td></tr>');
        tr.attr("key", entity["key"]);
        console.log(entity);
        tr.find("td").html(entity.key);
        $("#scene-objects").append(tr);
        this.sceneObjects[entity.key] = entity;
    };

    p.save = function() {
        var self = this;
        $.each(this.sceneObjects, function(key, entity) {
            if (!(key in self.sceneObjectProperties)) {
                self.sceneObjectProperties[key] = {};
            }
            console.error("save(), key=%s", key);
            self.sceneObjectProperties[key].x = entity.x;
            self.sceneObjectProperties[key].y = entity.y;
            self.sceneObjectProperties[key]["body.velocity.x"] = entity.body.velocity.x;
            self.sceneObjectProperties[key]["body.velocity.y"] = entity.body.velocity.y;
        });
    };

    p.load = function() {
        var self = this;
        $.each(this.sceneObjects, function(key, entity) {
            if (!(key in self.sceneObjectProperties)) {
                return;
            }
            console.error("load(), key=%s", key);
            self.sceneObjects[key].x = self.sceneObjectProperties[key]["x"];
            self.sceneObjects[key].y = self.sceneObjectProperties[key]["y"];
            self.sceneObjects[key].body.velocity.x = self.sceneObjectProperties[key]["body.velocity.x"];
            self.sceneObjects[key].body.velocity.y = self.sceneObjectProperties[key]["body.velocity.y"];
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

        

    };


// Link
// ----
chongdashu.Scene = createjs.promote(Scene, "SpriteComponent");

}());