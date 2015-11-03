/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Node
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * AudioNode
 * @class Game.Node.AudioNode
 * @extends Core.Node
 * @constructor
 **/
var AudioNode = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = createjs.extend(AudioNode, chongdashu.Node);
    
    AudioNode.TYPE = "node:AudioNode";

    AudioNode.COMPONENT_TYPES = [
        chongdashu.AudioComponent.TYPE
    ];

    p.ac = null; // AudioComponent 

    p.init = function(entity)
    {
        console.log("[AudioNode], init()");
        this.Node_init(AudioNode.TYPE, entity);

        // -- Add references to entity's components here.
        this.ac = entity.get(chongdashu.AudioComponent.TYPE);
    };

// Link
// ----
chongdashu.AudioNode = createjs.promote(AudioNode, "Node");

}());