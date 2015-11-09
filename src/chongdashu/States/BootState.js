/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Game
* @msubmodule   State
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * BootState
 * @class State.BootState
 * @constructor
 **/
var BootState = function(game) {
};
var p = BootState.prototype;
// BootState.prototype.constructor = BootState;

    // @phaser
    p.init = function()
    {
        Debug.log("[BootState], init()", Debug.LEVEL_ENGINE);

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            // this.scale.pageAlignHorizontally = true;

            // Make world (0,0) in the center of screen.
            this.game.world.setBounds(
            -GLOBAL_GAME_WIDTH/2,
            -GLOBAL_GAME_HEIGHT/2,
            GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);
        }
        else
        {
            //  Same goes for mobile settings.
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(320, 240, 2048, 1536);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
        }
        

        // this.game.stage.backgroundColor = '#FFFFFF';

         this.game.world.setBounds(
            -GLOBAL_GAME_WIDTH/2,
            -GLOBAL_GAME_HEIGHT/2,
            GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.game.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        // this.stage.disableVisibilityChange = true;

        
    };

    // @phaser
    p.preload = function() {
        Debug.log("[BootState], preload()", Debug.LEVEL_ENGINE);

        this.load.image('preloader-frame', 'res/preloader-frame.png');
        this.load.image('preloader-bar', 'res/preloader-bar.png');
        this.load.json('assets', 'res/assets.json');
        this.load.json('objects', 'res/objects.json');
        this.load.json('hotspots', 'res/hotspots.json');
    };

    // @phaser
    p.create = function() {
        Debug.log("[BootState], create()", Debug.LEVEL_ENGINE);
        this.state.start("PreloadState");

        this.state.game.assets = window.assets;
        this.state.game.assets.json = this.state.game.cache.getJSON("assets");

        this.state.game.scene = window.scene;
        this.state.game.scene.sceneObjectProperties = this.state.game.cache.getJSON("objects");

        this.state.game.hotspots = new chongdashu.Hotspots(game);
        this.state.game.hotspots.json = this.state.game.cache.getJSON("hotspots");
    };
    

// Link
// ----
chongdashu.BootState = BootState;

}());


