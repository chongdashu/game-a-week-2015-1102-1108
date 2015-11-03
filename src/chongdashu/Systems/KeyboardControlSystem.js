/**
 * 
 * @author Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * KeyboardControlSystem
 * @constructor
 * @class Game.System.KeyboardControlSystem
 * @extends Core.System
 **/
var KeyboardControlSystem = function(state) {
    this.init(state);
};
var p = createjs.extend(KeyboardControlSystem, chongdashu.System);

    // --
    var KeyboardComponent = chongdashu.KeyboardComponent;
    // --

    p.init = function(state)
    {
        console.log("[KeyboardControlSystem], init()");
        this.System_init(chongdashu.EnemyControlNode);
    };

    p.updateNode = function(node) {
        var kc = node.kc;

        $.each(kc.keyStates, function(key, state) {
            if (kc.keyboard.isDown(key)) {
                if (state == KeyboardComponent.JUST_UP || state == KeyboardComponent.UP) {
                    kc.keyStates[key] = KeyboardComponent.JUST_DOWN;
                }
                else {
                    kc.keyStates[key] = KeyboardComponent.DOWN;
                }
            }
            else if (!kc.keyboard.isDown(key)) {
                if (state == KeyboardComponent.JUST_DOWN || state == KeyboardComponent.DOWN) {
                    kc.keyStates[key] = KeyboardComponent.JUST_UP;
                }
                else {
                    kc.keyStates[key] = KeyboardComponent.UP;
                }
            }
        });

    };

    // -- 

    p.initKey = function(kc, keycode) {
        if (!(keycode in kc.keyStates)) {
            kc.keyStates[keycode] = KeyboardComponent.UP;
        }
    };

    p.isJustDown = function(kc, keycode) {
        this.initKey(kc, keycode);
        return kc.keyStates[keycode] && (kc.keyStates[keycode] === KeyboardComponent.JUST_DOWN);
    };

    p.isDown = function(kc, keycode) {
        this.initKey(kc, keycode);
        return kc.keyStates[keycode] && (this.isJustDown(kc, keycode) || (kc.keyStates[keycode] === KeyboardComponent.DOWN));
    };

    p.isJustUp = function(kc, keycode) {
        this.initKey(kc, keycode);
        return kc.keyStates[keycode] && (kc.keyStates[keycode] === KeyboardComponent.JUST_UP);
    };

    p.isUp = function(kc, keycode) {
        this.initKey(kc, keycode);
        return kc.keyStates[keycode] && (this.isJustUp(kc, keycode) || (kc.keyStates[keycode] === KeyboardComponent.UP));
    };

// Link
// ----
chongdashu.KeyboardControlSystem = createjs.promote(KeyboardControlSystem, "System");

}());


