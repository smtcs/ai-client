var io = require('socket.io-client');
var PF = require('pathfinding');

// TODO: change to seperate file using require for student use only
// var botBrain = require('botBrain');

var cnt = 0;

var socket = require('socket.io-client')('http://aichallenge-gorgamite.c9users.io');

// TODO: Change to botBrain.key property in the future
var key = "efqom7i9jl";
// var name = "hello";

socket.emit("name", key);

socket.on("gameStart", function(game) {

})

// socket.on("getName", function(str) {
//     name = str;
// })
var globalGame;
socket.on("update", function(game) {
    globalGame = game;
    // Running Player Created Brain        
    let tempdir = direction(game);
    
    console.log("Going in this direction! " + tempdir)
    //EVALUATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeee   
    if (tempdir != undefined && tempdir != "") {
      socket.emit("new direction", { dir: tempdir, "id": game.idTurn, "gameId": game.gameId });
    }


})
socket.on("queue", function(str) {
    console.log(str);
})
var dirs = ["north", "south", "east", "west", "south", "south"]

// Function Created and Given to Player


function direction(game) {
return "north";
    var enemyBots = [];
    let myDir = "none";

    if (game.idTurn != 0) { enemyBots.push(game.players[0]); }
    if (game.idTurn != 1) { enemyBots.push(game.players[1]); }
        var closestNode = game.nodes[0];
    for(var i=0;i<game.nodes.length;i++){
        if(findDistance(game.myBot.pos, game.nodes[i].pos) < findDistance(game.myBot.pos, closestNode.pos)){
            closestNode = game.nodes[i]
        }
    }
    

if(game.turn >=  200 - (findDistance(game.myBot.pos, game.bases[game.idTurn].pos)  * game.players.length )){
    myDir = nextStep(game.myBot.pos, game.bases[game.idTurn].pos);
} else{
    myDir = nextStep(game.myBot.pos, closestNode.pos)
}
return myDir;
}

function findDistance(pos1, pos2) {
    var grid = new PF.Grid(20, 20);
    grid.setWalkableAt(pos1[0], pos1[1], true);
    grid.setWalkableAt(pos2[0], pos2[1], true);
    for (let i = 0; i < globalGame.barricades.length; i++) {
        grid.setWalkableAt(globalGame.barricades[i][0], globalGame.barricades[i][1], false)
    }
    var finder = new PF.AStarFinder();
    var path = finder.findPath(pos1[0], pos1[1], pos2[0], pos2[1], grid);
    return path.length;
}



function stepArray(pos1, pos2) {
    var grid = new PF.Grid(20, 20);
    grid.setWalkableAt(pos1[0], pos1[1], true);
    grid.setWalkableAt(pos2[0], pos2[1], true);
    for (let i = 0; i < globalGame.barricades.length; i++) {
        grid.setWalkableAt(globalGame.barricades[i][0], globalGame.barricades[i][1], false)
    }
    var finder = new PF.AStarFinder();
    var path = finder.findPath(pos1[0], pos1[1], pos2[0], pos2[1], grid);
    return path;
}

function nextStep(pos1, pos2) {
    if (pos1 === undefined || pos2 === undefined) {
        return "none";
    }
    var grid = new PF.Grid(20, 20);
    grid.setWalkableAt(pos1[0], pos1[1], true);
    grid.setWalkableAt(pos2[0], pos2[1], true);
    for (let i = 0; i < globalGame.barricades.length; i++) {
        grid.setWalkableAt(globalGame.barricades[i][0], globalGame.barricades[i][1], false)
    }
    var finder = new PF.AStarFinder();
    var path = finder.findPath(pos1[0], pos1[1], pos2[0], pos2[1], grid);
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
