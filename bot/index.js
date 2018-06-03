var io = require('socket.io-client');
var PF = require('pathfinding');
var socket = require('socket.io-client')('http://aichallenge-gorgamite.c9users.io');

function Bot(key){
    this.key = key;
}
Bot.prototype.runGame = function(){
socket.emit("name", this.key);
    
    
    
    
}





module.exports = Bot;