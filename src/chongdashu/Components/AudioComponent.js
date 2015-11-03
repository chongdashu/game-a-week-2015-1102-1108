/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game.Component
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * AudioComponent
 * @class Game.Component.AudioComponent
 * @extends Core.Component
 * @constructor
 **/
var AudioComponent = function(audio) {
    // @param {Phaser.Keyboard} entity
    this.init(audio);
};
var p = createjs.extend(AudioComponent, chongdashu.Component);
    
    /**
    * The type identifier of this component.
    *
    * @property Game.AudioComponent.TYPE
    * @type String
    * @static
    * @final
    */
    AudioComponent.TYPE = "component:AudioComponent";

    p.audio = {};
    p.playOneShot = false;

    p.init = function(audio)
    {
        console.log("[AudioComponent], init()");
        this.Component_init(AudioComponent.TYPE);

        this.audio = audio;
        this.playOneShot = false;
    };

// Link
// ----
chongdashu.AudioComponent = createjs.promote(AudioComponent, "Component");

}());