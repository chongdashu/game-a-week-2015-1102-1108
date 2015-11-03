/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Core
*/

this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * System represents a System of the Entity-Component-System Design
 * paradigm.
 *
 * @class Core.System
 * @constructor
 **/
var System = function(nodeType) {
    this.init(nodeType);
};
var p = System.prototype;
System.prototype.constructor = System;
    
    /**
    * Indicates if the system is currently enabled or not. 
    * If not enabled, no system or node updates will be performed.
    * @property enabled
    *
    * @type boolean
    * @default true
    */
    p.enabled = false;

    /**
    * The priority of the current system. This is used by the 
    * {{#crossLink "Core.Engine"}}{{/crossLink}} to order the sequence of systems
    * that it processes. Lower priority numbers are executed first.
    *
    * @property priority
    * @type {integer}
    * @default 0
    */
    p.priority = 0;

    /**
    * An array of {{#crossLink "Core.Node"}}{{/crossLink}} objects that 
    * this system manages based on the {{#crossLink "Core.Node/Core.Node.TYPE:property"}}{{/crossLink}}
    * @property nodes
    * @type {Array}
    */
    p.nodes = null;

    /**
    * The {{#crossLink "Core.Node/Core.Node.TYPE:property"}}{{/crossLink}} that this system
    * will be responsible for.
    * @property String
    * @type Core.Node.TYPE
    */
    p.nodeType = null;

    p.engine = null;


    /**
    * The initialization method is called when the object is constructor.
    *
    * @method init
    * @param {string} nodeType The type of the node. See {{#crossLink "Core.Node/Core.Node.TYPE:property"}}{{/crossLink}}.
    */
    p.init = function(nodeType)
    {
        // console.log("[System], init()");

        this.priority = 0;
        this.enabled = true;

        this.nodeType = nodeType;
    };

    /**
    * The update loop of this system, as called by a given
    * {{#crossLink "Core.Engine"}}{{/crossLink}}'s update loop.
    * All related {{#crossLink "Core.Node"}}{{/crossLink}} objects are
    * updated. Handling of each node individually can be performed
    * by overriding the {{#crossLink "Core.System/updateNode:method"}}{{/crossLink}} method.
    * 
    *
    * @method update
    */
    p.update = function(elapsed) {
        var nodes = this.engine.getNodes(this.nodeType);
        if (nodes) {
            for (var i=0; i < nodes.length; i++) {
                this.updateNode(nodes[i], elapsed);
            }
        }
    };

    /**
    * @method updateNode
    * @param {Core.Node} node The node to be updated
    */
    p.updateNode = function(node) {
    };

    /**
    * Callback method when this system is added to the engine.
    *
    * @method onEngineAdd
    * @param {Core.Engine} engine reference to the {{#crossLink "Core.Engine"}}{{/crossLink}} object.
    */
    p.onEngineAdd = function(engine) {
        this.engine = engine;
    };

    /**
    * Callback method when this system is removed from the engine.
    *
    * @method onEngineRemove
    * @param {Core.Engine} engine reference to the {{#crossLink "Core.Engine"}}{{/crossLink}} object.
    */
    p.onEngineRemove = function(engine) {
        this.engine = null;
    };

    p.getType = function() {
        return this.constructor.name;
    };
    

// Link
// ----
chongdashu.System = System;

}());


