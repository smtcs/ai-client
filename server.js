var io = require('socket.io-client');
var PF = require('pathfinding');

// TODO: change to seperate file using require for student use only
// var botBrain = require('botBrain');

var cnt = 0;

var socket = require('socket.io-client')('http://aichallenge-gorgamite.c9users.io');

// TODO: Change to botBrain.key property in the future
var key = "8miaaw7bkd4";
// var name = "hello";

socket.emit("name", key);

socket.on("gameStart", function(game) {

})

// socket.on("getName", function(str) {
//     name = str;
// })
socket.on("update", function(game) {
    // Running Player Created Brain        
    let tempdir = direction(game);
    //EVALUATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeee
    if (tempdir != undefined) {
        socket.emit("new direction", { dir: tempdir, "id": game.idTurn });
    }


})
socket.on("queue", function(str) {
    console.log(str);
})
var dirs = ["north", "south", "east", "west", "south", "south"]

// Function Created and Given to Player


function direction(game) {

    var enemyBots = [];
    
    if (game.idTurn != 0) { enemyBots.push(game.players[0]); }
    if (game.idTurn != 1) { enemyBots.push(game.players[1]); }
    // if (game.idTurn != 2) { enemyBots.push(game.players[2]); }
    // if (game.idTurn != 3) { enemyBots.push(game.players[3]); }
    // if (game.idTurn != 4) { enemyBots.push(game.players[4]); }


    // console.log(enemyBots.length, enemyBots[0])
    // console.log("ENEMYBOTS: " + enemyBots)
    console.log("asking for dir!")
    return nextStep([game.myBot.pos[1], game.myBot.pos[0]], [Math.floor(Math.random() * 17),Math.floor(Math.random() * 17)]);
    //   return dirs[Math.floor(Math.random() * 4)];
}



// return _this.pathDir;
function nextStep(pos1, pos2) {
    if (pos1 === undefined || pos2 === undefined) {
        return "none";
    }
    console.log(pos1, pos2)
    var grid = new PF.Grid(19, 19);
    grid.setWalkableAt(pos1[0], pos1[1], true);
    grid.setWalkableAt(pos2[0], pos2[1], true);
    //console.log(pos1[0], pos1[1], pos2[0], pos2[1]);
    var finder = new PF.AStarFinder();
    var path = finder.findPath(pos1[0], pos1[1], pos2[0], pos2[1], grid);
    // console.log(path)
    if (path === null || path === undefined || path.length === 0) {}
    else {
        if (path[1]) {
            if (path[1][0] === pos1[0]) {
                if (path[1][1] < pos1[1]) {
                    return "north";
                }
                else {
                    return "south";
                }

            }
            else {
                if (path[1][0] > pos1[0]) {
                    return "east";
                }
                else {
                    return "west";
                }
            }
        }
    }
}
