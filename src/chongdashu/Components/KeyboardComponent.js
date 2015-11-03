/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * KeyboardComponent is a wrapper for a game's
 * keyboard key states.
 *
 * @class Game.Component.KeyboardComponent
 * @extends Core.Component
 * @constructor
 **/
var KeyboardComponent = function(keyboard) {
    // @param {Phaser.Keyboard} keyboard
    this.init(keyboard);
};
var p = createjs.extend(KeyboardComponent, chongdashu.Component);
    
    // --
    /**
    * The type identifier of this component.
    *
    * @property Game.KeyboardComponent.TYPE
    * @type String
    * @static
    * @final
    */
    KeyboardComponent.TYPE = "component:KeyboardComponent";

    // --
    
    KeyboardComponent.UP = "up";
    KeyboardComponent.JUST_UP = "just_up";
    KeyboardComponent.DOWN = "down";
    KeyboardComponent.JUST_DOWN = "just_down";

    // --

    p.keyStates = null;
    p.keyboard = null;

    p.init = function(keyboard)
    {
        console.log("[KeyboardComponent], init()");
        this.Component_init(KeyboardComponent.TYPE);
        this.keyStates = {};
        this.keyboard = keyboard;
    };


// Link
// ----
chongdashu.KeyboardComponent = createjs.promote(KeyboardComponent, "Component");

}());


