/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * SpriteComponent
 * @class Game.Component.SpriteComponent
 * @extends Core.Component
 * @constructor
 **/
var SpriteComponent = function(sprite) {
    // @param {Phaser.Keyboard} entity
    this.init(sprite);
};
var p = createjs.extend(SpriteComponent, chongdashu.Component);
    
    /**
    * The type identifier of this component.
    *
    * @property Game.SpriteComponent.TYPE
    * @type String
    * @static
    * @final
    */
    SpriteComponent.TYPE = "component:SpriteComponent";

    p.sprite = null;

    p.init = function(sprite)
    {
        console.log("[SpriteComponent], init()");
        this.Component_init(SpriteComponent.TYPE);

        this.sprite = sprite;
        this.sprite.anchor.set(0.5);
        
    };

// Link
// ----
chongdashu.SpriteComponent = createjs.promote(SpriteComponent, "Component");

}());