/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Node
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * KeyboardControlNode
 * @class Game.Node.KeyboardControlNode
 * @extends Core.Node
 * @constructor
 **/
var KeyboardControlNode = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = createjs.extend(KeyboardControlNode, chongdashu.Node);
    
    KeyboardControlNode.TYPE = "node:KeyboardControlNode";

    KeyboardControlNode.COMPONENT_TYPES = [
        chongdashu.KeyboardComponent.TYPE
    ];

    p.kc = null;

    p.init = function(entity)
    {
        console.log("[KeyboardControlNode], init()");
        this.Node_init(KeyboardControlNode.TYPE, entity);

        // -- Add references to entity's components here.
        this.kc = entity.get(chongdashu.KeyboardComponent.TYPE);
    };

// Link
// ----
chongdashu.KeyboardControlNode = createjs.promote(KeyboardControlNode, "Node");

}());