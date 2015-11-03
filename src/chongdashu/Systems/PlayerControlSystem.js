/**
 * 
 * @author Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * PlayerControlSystem
 * @constructor
 * @class Game.System.PlayerControlSystem
 * @extends Game.System.KeyboardControlSystem
 **/
var PlayerControlSystem = function(state) {
    this.init(state);
};
var p = createjs.extend(PlayerControlSystem, chongdashu.KeyboardControlSystem);

    p.init = function(state)
    {
        console.log("[PlayerControlSystem], init()");
        this.System_init(chongdashu.PlayerControlNode);
    };

    p.updateNode = function(node) {
        var asc = node.asc;
        var kc = node.kc;
        var pc = node.pc;

        var sprite = asc.sprite;
        var body = asc.body;

        // -- perform superclass update first
        this.KeyboardControlSystem_updateNode(node);

        if (this.isJustDown(kc, Phaser.Keyboard.LEFT)) {
            body.velocity.x = -10;
        }
        if (this.isJustDown(kc, Phaser.Keyboard.RIGHT)) {
            body.velocity.x = +10;
        }
        if (this.isUp(kc, Phaser.Keyboard.RIGHT)  && this.isUp(kc, Phaser.Keyboard.LEFT)) {
            body.velocity.x = 0;
            body.velocity.y = 0;
        }

    };

// Link
// ----
chongdashu.PlayerControlSystem = createjs.promote(PlayerControlSystem, "KeyboardControlSystem");

}());


