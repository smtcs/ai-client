

var io = require('socket.io-client');
var socket = require('socket.io-client')('http://aichallenge-gorgamite.c9users.io');

var name = "hellaaasow";
socket.emit("name", name);



socket.on("update", function(game) {
    // console.log(game.idTurn + "   " + game.players.length)
    if (game.players[game.idTurn].name == name) {
        //EVALUATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeee
        socket.emit("new direction", {dir: direction(), name: name});
    }
})
socket.on("queue", function(str) {
    console.log(str);
})

function direction(game) {
    // console.log(game.players[game.idTurn])
    // game.players[game.idTurn].dir = "west";
    return "east";
}

// hi

// socket.on("turn", function())
