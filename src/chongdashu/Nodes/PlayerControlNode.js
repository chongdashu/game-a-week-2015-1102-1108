/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Node
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * PlayerControlNode
 * @class Game.Node.PlayerControlNode
 * @extends Core.Node
 * @constructor
 **/
var PlayerControlNode = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = createjs.extend(PlayerControlNode, chongdashu.Node);
    
    PlayerControlNode.TYPE = "node:PlayerControlNode";

    PlayerControlNode.COMPONENT_TYPES = [
        chongdashu.PlayerComponent.TYPE,
        chongdashu.ArcadeSpriteComponent.TYPE,
        chongdashu.KeyboardComponent.TYPE
    ];

    p.kc = null;

    p.init = function(entity)
    {
        console.log("[PlayerControlNode], init()");
        this.Node_init(PlayerControlNode.TYPE, entity);

        // -- Add references to entity's components here.
        p.kc = entity.get(chongdashu.KeyboardComponent.TYPE);
        p.asc = entity.get(chongdashu.ArcadeSpriteComponent.TYPE);
        p.pc = entity.get(chongdashu.PlayerComponent.TYPE);
    };

// Link
// ----
chongdashu.PlayerControlNode = createjs.promote(PlayerControlNode, "Node");

}());