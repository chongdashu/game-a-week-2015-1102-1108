/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * GameState
 * @class GameState
 * @constructor
 **/
var GameState = function(game) {
};
var p = GameState.prototype;

    // @phaser
    p.preload = function() {
    };

    p.heuristic = function(startIndex, goalIndex) {

        var tileWidth = 32;
        var tileHeight = 32;

        var tilesX = this.game.world.width/tileWidth;
        var tilesY = this.game.world.height/tileHeight;

        var tileY1 = Math.floor(startIndex / tilesX);
        var tileX1 = Math.floor(startIndex % tilesX);

        var tileY2 = Math.floor(goalIndex / tilesX);
        var tileX2 = Math.floor(goalIndex % tilesX);

        return Math.abs(tileX1-tileX2) + Math.abs(tileY1-tileY2);
    };

    p.distance = function(startIndex, goalIndex) {

        var tileWidth = 32;
        var tileHeight = 32;

        var tilesX = this.game.world.width/tileWidth;
        var tilesY = this.game.world.height/tileHeight;

        var tileY1 = Math.floor(startIndex / tilesX);
        var tileX1 = Math.floor(startIndex % tilesX);

        var tileY2 = Math.floor(goalIndex / tilesX);
        var tileX2 = Math.floor(goalIndex % tilesX);

        return Phaser.Math.distance(tileX1, tileY1, tileX2, tileY2);

    };

    p.astar = function(startIndex, goalIndex, nodes, edges) {


        var closedSet = {};
        var openSet = [startIndex];

        var cameFrom = {};

        var g_score = {};
        var f_score = {};

        for (var n=0; n < nodes.length; n++) {
            g_score[nodes[n]] = 99999;
            f_score[nodes[n]] = 99999;
        }

        g_score[startIndex] = 0;
        f_score[startIndex] = g_score[startIndex] + this.heuristic(startIndex, goalIndex);

        var iters = 0;
        while (openSet.length > 0 && iters < 1000) {

            // console.log("iters=" + iters++);

            var current = null;

            var lowest = 99999;
            var lowestIndex = -1;
            $.each(openSet, function(index, nodeIndex) {
                var value = f_score[nodeIndex];
                if (value < lowest) {
                    lowest = value;
                    lowestIndex = nodeIndex;
                }
            });

            current = lowestIndex;

            if (current == goalIndex) {
                var c = current;
                var total_path = [c];
                while (c in cameFrom) {
                    c = cameFrom[c];
                    total_path.push(c);
                }

                return total_path;
            }

            openSet.splice(openSet.indexOf(current), 1);
            closedSet[current] = true;

            var neighbors = [];
            if (current in edges) {
                neighbors = edges[current];
            }

            // console.log("neighbors[%s]=%o", current, neighbors);

            for (var i=0; i < neighbors.length; i ++) {
                var neighbor = neighbors[i];
                if (neighbor in closedSet && closedSet[neighbor]) {
                    continue;
                }

                var tentative_g = g_score[current] + this.distance(current, neighbor);
                if (!(neighbor in openSet)) {
                    openSet.push(neighbor);
                }
                else if (tentative_g >= g_score[neighbor]) {
                    continue;
                }

                cameFrom[neighbor] = current;
                g_score[neighbor] = tentative_g;
                f_score[neighbor] = g_score[neighbor] + this.heuristic(neighbor, goalIndex);

            }

        }

        return null;


    };

    // @phaser
    p.create = function() {

        var map = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
            0, 0, 0, 1, 1, 1, 0, 0, 0, 0,   0, 0, 1, 1, 1, 1, 1, 0, 0, 0,

            0, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];

        var walkMap = new Phaser.BitmapData(this.game, "walkable", this.game.world.width, this.game.world.height);

        var tileWidth = 32;
        var tileHeight = 32;

        var tilesX = this.game.world.width/tileWidth;
        var tilesY = this.game.world.height/tileHeight;

        var nodes = [];
        var edges = {};

        var startTileX = 1;
        var startTileY = 10;

        var endTileX = 17;
        var endTileY = 11;

        var startIndex = startTileY * tilesX + startTileX;
        var endIndex = endTileY * tilesX + endTileX;

        for (var i=0; i < map.length; i++) {
            if (map[i] == 1) {

                var tileY = Math.floor(i / tilesX);
                var tileX = Math.floor(i % tilesX);

                var left = tileWidth*tileX;
                var top =  tileHeight*tileY;

                if (i == startIndex) {
                    walkMap.context.fillStyle = "#0000AA";
                }
                else if (i == endIndex) {
                    walkMap.context.fillStyle = "#AA0000";
                }
                else {
                    walkMap.context.fillStyle = "rgba(0, 200, 00, 0.5)";
                }
                
                walkMap.context.fillRect(left, top, tileWidth, tileHeight);
                walkMap.context.rect(left, top, tileWidth, tileHeight);
                walkMap.context.stroke();

                nodes.push(i);

                var neighbors = [
                    [0, -1, "up"],
                    [0, +1, "down"],
                    [-1, 0, "left"],
                    [+1, 0, "right"]
                ];

                console.log("%s | tile=[%s, %s], Rect=[%s, %s, %s, %s]", i, tileX, tileY, left, top, tileWidth, tileHeight);

                for (var j=0; j < neighbors.length; j++) {
                    var neighborX = tileX + neighbors[j][0];
                    var neighborY = tileY + neighbors[j][1];
                    var neighborDir = neighbors[j][2];
                    var neighborIndex = neighborY * tilesX + neighborX;

                    if (neighborX >= 0 && neighborX < tilesX &&
                        neighborY >= 0 && neighborY < tilesY &&
                        map[neighborIndex] ==1 ) {
                        
                            if (!(i in edges)) {
                                edges[i] = [];
                            }
                            if (!(neighborIndex in edges[i])) {
                                edges[i].push(neighborIndex);
                            }
                    }
                }

            }
        }

        var path = this.astar(startIndex, endIndex, nodes, edges);

        for (var k=0; k < path.length-1; k++) {
            var nodeIndex = path[k];

            var nodeTileY = Math.floor(nodeIndex / tilesX);
            var nodeTileX = Math.floor(nodeIndex % tilesX);

            var nodeX = tileWidth * nodeTileX;
            var nodeY = tileHeight * nodeTileY;

            var nextIndex = path[k+1];
            var nextTileY = Math.floor(nextIndex / tilesX);
            var nextTileX = Math.floor(nextIndex % tilesX);

            var nextX = tileWidth * nextTileX;
            var nextY = tileHeight * nextTileY;

            walkMap.context.beginPath();
            walkMap.context.strokeStyle = 'rgba(255, 0, 255, 1.0)';
            walkMap.context.moveTo(nodeX + tileWidth/2, nodeY + tileHeight/2);
            walkMap.context.lineTo(nextX + tileWidth/2, nextY + tileHeight/2);
            walkMap.context.stroke();
        }

        console.log("startIndex=%s", startIndex);
        console.log("endIndex=%s", endIndex);

        console.log("neighbors[startIndex]=%o", edges[startIndex]);
        console.log("neighbors[endIndex]=%o", edges[endIndex]);

        console.log("path=%o", path);

        console.log("nodes=%o", nodes);
        console.log("edges=%o", edges);

        this.game.add.image(-this.game.width/2, - this.game.height/2, walkMap);

        // -- pathfinding


        // -- grid

        var bitmap = new Phaser.BitmapData(this.game, "grid", this.game.world.width, this.game.world.height);
        // These functions use the canvas context to draw lines using the canvas API
        for(var y = this.game.height-32; y >= 0; y -= 32) {
            bitmap.context.beginPath();
            bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            bitmap.context.moveTo(0, y);
            bitmap.context.lineTo(this.game.width, y);
            bitmap.context.stroke();
        }
        for(var x = this.game.width-32; x >= 0; x -= 32) {
            bitmap.context.beginPath();
            bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            bitmap.context.moveTo(x, 0);
            bitmap.context.lineTo(x, this.game.height);
            bitmap.context.stroke();
        }
        this.game.add.image(-this.game.width/2, -this.game.world.height/2, bitmap);

    };

    // @phaser
    p.update = function() {
       
    };

    

// Link
// ----
chongdashu.GameState = GameState;

}());


