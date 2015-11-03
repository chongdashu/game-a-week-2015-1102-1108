/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Core
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Engine
 * @class Core.Engine
 * @constructor
 **/
var Engine = function() {
    this.init();
};
var p = Engine.prototype;
Engine.prototype.constructor = Engine;

    p.entities = [];
    p.entityMap = {};
    p.systems = [];
    p.families = {};
    p.isUpdating = false;

    p.onUpdateCompleteCallbacks = [];

    p.init = function()
    {
        console.log("[Engine], init()");
        this.entities = [];
        this.entityMap = {};
        this.systems = [];
        this.families = {};
        this.onUpdateCompleteCallbacks = [];
        this.isUpdating = false;
       
    };

    // -- Entity-related

    p.addEntity = function(entity) {
        if (entity._name in this.entityMap) {
            console.error("Entity with name=%s already exists.", entity._name);
        }

        // add entity to list 
        this.entities.push(entity);

        // add entity to map
        this.entityMap[entity._name] = entity;

        // link callbacks
        entity.addOnComponentAddCallback(this.onComponentAddCallback);
        entity.addOnComponentRemoveCallback(this.onComponentRemoveCallback);

        var keys = Object.keys(this.families);
        for (var i=0; i < keys.length; i++) {
            // Add entity to families
            this.families[keys[i]].addEntity(entity);
        }

    };

    p.removeEntity = function(entity) {
        if (!(entity._name in this.entityMap)) {
            console.error("Entity with name=%s doesn't exists", entity._name);
        }
        
        // remove entity from map
        delete this.entityMap[entity._name];

        // unlink callbacks
        entity.removeOnComponentAddCallback(this.onComponentAddCallback);
        entity.removeOnComponentRemoveCallback(this.onComponentRemoveCallback);

        var keys = Object.keys(this.families);
        for (var i=0; i < keys.length; i++) {
            // Remove entity from families
            this.families[keys[i]].removeEntity(entity);
        }

        // remove entity from list
        this.entities.splice(this.entities.indexOf(entity), 1);
    };

    // -- Callbacks

    p.onComponentAddCallback = function(entity, componentType) {

    };

    p.onComponentRemoveCallback = function(entity, componentType) {

    };

    p.getEntity = function(name) {
        if (name in this.entityMap) {
            return this.entityMap[name];
        }
        return null;
    };

    p.getEntities = function() {
        return this.entities;
    };

    // -- Node-related

    /**
     * 
     */
    p.getNodes = function(nodeClass) {
        // console.log("nodeClass=%o", nodeClass);
    
        if (typeof nodeClass == "undefined" || nodeClass === null) {
            return [];
        }

        var nodeType = nodeClass.TYPE;

        if (nodeType in this.families) {
            // return family associated with this node type
            return this.families[nodeType].nodes;
        }

        // create new family for this node type
        var family = new chongdashu.Family(nodeClass, this);

        // add family to map
        this.families[nodeType] = family;

        // add existing entities to family
        for (var i=0; i < this.entities.length; i++) {
            // BUG:
            // Find out why if this is not present, still works sometimes.
            family.addEntity(this.entities[i]);
        }

        // return node group
        return family.nodes;
    };

    p.clearNodes = function(nodeType) {
        if (nodeType in this.families) {
            this.families[nodeType].clear();
        }

        delete this.families[nodeType];
    };

    // -- System
    p.addSystem = function(system, priority) {
        system.priority = priority;
        
        this.systems.push(system);
        system.onEngineAdd(this);
    };

    p.removeSystem = function(system) {
        this.systems.splice(this.systems.indexOf(system),1);
        system.onEngineRemove(this);
    };

    p.getSystem = function(systemClass) {
        for (var i=0; i < this.systems.length; i++) {
            if (this.systems[i] instanceof systemClass) {
                return this.systems[i];
            }
        }

        return null;
    };

    p.getSystems = function() {
        return this.systems;
    };

    p.preUpdate = function() {

    };

    p.update = function(elapsed)  {
        this.isUpdating = true;
        var i=0;
        for (i=0; i < this.systems.length; i++) {
            this.systems[i].update(elapsed);
        }
        this.isUpdating = false;

        for (i=0; i < this.onUpdateCompleteCallbacks.length; i++) {
            this.onUpdateCompleteCallbacks[i](this);
        }
    };

    p.postUpdate = function() {

    };

// Link
// ----
chongdashu.Engine = Engine;

}());