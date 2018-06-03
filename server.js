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
    //     console.log("----------------------------------------------")
    // console.log("\x1b[31m", "  Energy - Base Energy", "\x1b[0m");
     
    // console.log("\x1b[31m", "My Bot " +  "\x1b[0m" + game.myBot.energy + " - " + game.bases[game.idTurn].energy);
    // for(var i=0;i<game.players.length;i++){
    //     if(i != game.myBot.id){
    // console.log( "\x1b[31m"  ,"Bot "  +  (i+1)  + "\x1b[0m " + game.myBot.energy + " - " + game.bases[game.idTurn].energy);
    //     }
    // }
    // console.log( "\x1b[33m", "Turn: " + game.turn + "/200", "\x1b[0m")
    
    // console.log("----------------------------------------------")
    
    
    
    
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
    var enemyBots = [];
    let myDir = "none";

    if (game.idTurn != 0) { enemyBots.push(game.players[0]); }
    if (game.idTurn != 1) { enemyBots.push(game.players[1]); }
        var closestNode = game.nodes[0];
    for(var i=0;i<game.nodes.length;i++){
if(findDistance(game.myBot.pos, closestNode.pos) > findDistance(game.myBot.pos, game.nodes[i].pos) && game.nodes[i].energy > 5){
    console.log(game.nodes[i].pos + "  is not   "+ game.mybot.pos)
    closestNode = game.nodes[i];
}
    }
    
 
 console.log("MOTHERUFjdanda")
        console.log();
        console.log(game.myBot.pos  + "  is? " + closestNode.pos)
 
    console.log("node with most energy! " + closestNode.pos)

 console.log("PLAYER POS " + game.players[game.idTurn].pos + " MYBPT " + game.myBot.pos )
if(game.turn >=  200 - (findDistance(game.myBot.pos, game.bases[game.idTurn].pos)  * game.players.length )){
    myDir = nextStep(game.myBot.pos, game.bases[game.idTurn].pos);
    console.log("Goin to base! " + game.bases[game.idTurn].pos  + " im at " + game.myBot.pos  + " and my id is " + game.idTurn);
} else{
    console.log("going to closest node~!!!!  " + closestNode.pos + " im at " + game.myBot.pos + " and my id is " + game.idTurn);
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
    
    console.log(pos1, pos2)
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
