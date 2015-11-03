/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Core
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Family
 * @class Core.Family
 * @constructor
 **/
var Family = function(nodeClass, engine) {
    this.init(nodeClass, engine);
};
var p = Family.prototype;
Family.prototype.constructor = Family;

    p.nodes = [];
    p.entityNodeMap = {};
    p.components = {}; // [Component.Type, Bool]
    p.nodeClass = null;
    p.engine = null;

    p.init = function(nodeClass, engine)
    {
        console.log("[Family], init()");
        this.nodes = [];
        this.components = {};

        this.engine = engine;
        this.nodeClass = nodeClass;

        // BUG:
        // If this line is not present, things just fall apart. FIND OUT WHY.
        this.entityNodeMap = {};

        // get the list of components that this family
        // is in charge of based on the node class
        // console.log("nodeClass=%o", nodeClass);
        // console.log("nodeClass.COMPONENT_TYPES=%o", nodeClass.COMPONENT_TYPES);
        for (var i=0; i < nodeClass.COMPONENT_TYPES.length; i++) {
            // console.log("Add: nodeClass.TYPE=", nodeClass.COMPONENT_TYPES[i]);
            this.components[nodeClass.COMPONENT_TYPES[i]] = true;
        }

        if (Object.keys(this.components).length === 0) {
            console.error("Error, no components added");
        }

    };

    p.getNodes = function() {
        return this.nodes;
    };

    p.addEntity = function(entity) {
        if (!(entity._name in this.entityNodeMap)) {

            // console.log("entity=%o", entity);
            // console.log("this.components=%o", this.components);
            
            if (!this.isEntityComponentsPresent(entity, this.components)) {
                // if entity does not matchr required components, 
                // do not add
                // console.error("entity %o (%s) does not have required this.components %o for nodeType", entity, entity._name, this.components, this.nodeClass.TYPE);
                return;
            }

            var node = new this.nodeClass(entity);
            this.entityNodeMap[entity._name] = node;
            this.nodes.push(node);
        }
    };

    p.removeEntity = function(entity) {


        var inside = (entity._name) in this.entityNodeMap;
        if ( (entity._name) in this.entityNodeMap) {
            console.warn("[Family], nodeType=%s, removeEntity(%s), this=%o", this.nodeClass.TYPE, entity._name, this);
            var node = this.entityNodeMap[entity._name];
            delete this.entityNodeMap[entity._name];
            this.nodes.splice(this.nodes.indexOf(node), 1);
        }
    };

    p.clearEntities = function() {
        for (var i=0; i < this.nodes.length; i++) {
            delete this.entityNodeMap[this.nodes[i].entity._name];
        }
        this.nodes.splice(0, this.nodes.length);
    };

    p.isEntityComponentsPresent = function(entity, components) {

        var containsKeys = true;

        $.each(components, function(key, value) {
            // Go through the list of components that
            // this node's family is associated with
            if (!(key in entity._components)) {
                containsKeys = false;
                return false;
            }
        });
        return containsKeys;
    };
// Link
// ----
chongdashu.Family = Family;

}());


