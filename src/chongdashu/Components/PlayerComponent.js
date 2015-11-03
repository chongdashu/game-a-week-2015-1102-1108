/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * PlayerComponent
 * @class Game.Component.PlayerComponent
 * @extends Core.Component
 * @constructor
 **/
var PlayerComponent = function() {
    // @param {Phaser.Keyboard} entity
    this.init();
};
var p = createjs.extend(PlayerComponent, chongdashu.Component);
    
    /**
    * The type identifier of this component.
    *
    * @property Game.PlayerComponent.TYPE
    * @type String
    * @static
    * @final
    */
    PlayerComponent.TYPE = "component:PlayerComponent";

    p.audioCache = {};

    p.init = function()
    {
        console.log("[PlayerComponent], init()");
        this.Component_init(PlayerComponent.TYPE);

        this.audioCache = {};
    };

// Link
// ----
chongdashu.PlayerComponent = createjs.promote(PlayerComponent, "Component");

}());