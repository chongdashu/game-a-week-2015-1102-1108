/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Core
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Node
 * @class Core.Node
 * @constructor
 **/
var Node = function(nodeType, entity) {
    this.init(nodeType, entity);
};
var p = Node.prototype;
Node.prototype.constructor = Node;

    p.entity = null;
    p.nodeType = "";

    /**
    * @property Core.Node.TYPE
    * @type String
    * @static
    * @final
    */
    Node.TYPE = "type";

    p.init = function(nodeType, entity)
    {
        // console.log("[Node], init()");
        
        this.nodeType = nodeType;
        this.entity = entity;
    };

    p.getType = function() {
        return this.nodeType;
    };

// Link
// ----
chongdashu.Node = Node;

}());


