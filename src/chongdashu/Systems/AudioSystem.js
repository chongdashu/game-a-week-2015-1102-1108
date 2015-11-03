/**
 * 
 * @author Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * AudioSystem
 * @constructor
 * @class Game.System.AudioSystem
 * @extends Core.System
 * @extends Game.System.KeyboardControlSystem
 **/
var AudioSystem = function(state) {
    this.init(state);
};
var p = createjs.extend(AudioSystem, chongdashu.KeyboardControlSystem);

    p.keyStates = {};

    p.init = function(state)
    {
        console.log("[AudioSystem], init()");
        this.System_init(chongdashu.AudioNode);
    };

    p.updateNode = function(node) {
        var ac = node.ac;

        if (ac.playOneShot) {
            ac.audio.play();
            ac.audio.volume = 0.5;
            ac.playOneShot = false;
        }

    };

// Link
// ----
chongdashu.AudioSystem = createjs.promote(AudioSystem, "KeyboardControlSystem");

}());


