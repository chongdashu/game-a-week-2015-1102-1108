/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Core
*/

(function() {
    "use strict";

/**
 * Debug
 * @class Core.Debug
 **/
var Debug = function() {
};
var p = Debug.prototype;
    
    Debug.LEVEL_ALL = 0;
    Debug.LEVEL_ENGINE = 1;
    Debug.LEVEL_DEFAULT = 2;
    Debug.LEVEL_RELEASE = 99;

    Debug.levelFilter = Debug.LEVEL_DEFAULT;

    Debug.log = function ()  {
        var level = Debug.LEVEL_DEFAULT;

        if (arguments.length > 1) {
            var maybeLevel = arguments[arguments.length-1];
            if (typeof maybeLevel == "number") {
                level = maybeLevel;

                arguments.length = arguments.length -1;
            }
        }

        if (level >= Debug.levelFilter) {
            console.log.apply(console, arguments);
        }
        
    };


// Link
// ----
window.Debug = Debug;

}());



