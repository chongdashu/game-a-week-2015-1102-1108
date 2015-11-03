/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * InputComponent
 * @class Game.Component.InputComponent
 * @extends Core.Component
 * @constructor
 **/
var InputComponent = function(sprite) {
    // @param {Phaser.Keyboard} entity
    this.init(sprite);
};
var p = createjs.extend(InputComponent, chongdashu.Component);
    
    /**
    * The type identifier of this component.
    *
    * @property Game.InputComponent.TYPE
    * @type String
    * @static
    * @final
    */
    InputComponent.TYPE = "component:InputComponent";

    p.pointer = null;

    p.init = function(sprite)
    {
        console.log("[InputComponent], init()");
        this.Component_init(InputComponent.TYPE);

        // -- 
        sprite.inputEnabled = true;
        this.input = sprite.input;
        this.input.useHandCursor = false;
    };

// Link
// ----
chongdashu.InputComponent = createjs.promote(InputComponent, "Component");

}());