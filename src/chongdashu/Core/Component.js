/**
* @author       Chong-U Lim <me@chongdashu.com>
* @copyright    2015 Chong-U Lim
* @module       Core
*/
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Component
 * @class Core.Component
 **/
var Component = function() {
    this.init();
};
var p = Component.prototype;
Component.prototype.constructor = Component;
    
    p.componentType = null;
    p.entity = null;

    Component.entityContains = function (entity, componentType)  {
        return entity.komponents && compoentType in entity.komponents;
    };

    p.init = function(componentType)
    {
        this.componentType = componentType;
    };

    p.addTo = function(entity) {
        
        if (!entity.komponents) {
            entity.komponents = {};
        }
        entity.komponents[this.getType()] = this;
    };

    p.getType = function() {
        return this.componentType;
    };

    p.getEntity = function() {
        return this.entity;
    };

    p.update = function() {
        // console.log("[Component], update()");
    };
    

// Link
// ----
chongdashu.Component = Component;

}());


