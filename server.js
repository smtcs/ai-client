
var io = require('socket.io-client');
var socket = require('socket.io-client')('http://aichallenge-gorgamite.c9users.io');

var name = "hellaow";
socket.emit("name", name);

socket.on("update", function(game){
    console.log(game.idTurn + "   " + game.players)
if(game.players.name[game.players.length-1] == name){
    console.log(game.names[game.players.length-1] + " is " + name);
}
})
socket.on("queue", function(str){
    console.log(str);
})

// socket.on("turn", function())