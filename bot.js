function bot(){
console.log("Joined Queue! Waiting for game to start...");
bot.PF = require('pathfinding');
bot.io = require('socket.io-client');
bot.socket = require('socket.io-client')('http://aichallenge-' + bot.hostC9Name + '.c9users.io');
bot.socket.emit("name", bot.key);


var globalGame;
bot.socket.on("update", function(game) {
    
            console.log("----------------------------------------------")
                console.log("      \x1b[4m%s\x1b[0m", "Game number " + (game.gameId+1));
    console.log("\x1b[31m", "Energy - Base Energy", "\x1b[0m");
     
    console.log("\x1b[31m", "My Bot " +  "\x1b[0m" + game.myBot.energy + " - " + game.bases[game.idTurn].energy);
    for(var i=0;i<game.players.length;i++){
        if(i != game.myBot.id){
    console.log( "\x1b[31m"  ,"Bot "  +  (i+1)  + "\x1b[0m " + game.players[i].energy + " - " + game.bases[i].energy);
        }
    }
    console.log( "\x1b[33m", "Turn: " + game.turn + "/" + game.totalTurns, "\x1b[0m")
    
    console.log("----------------------------------------------")
    globalGame = game;
    // Running Player Created Brain        
    let tempdir = bot.direction(game);
    
    console.log("Going in this direction! " + tempdir) 
    if (tempdir != undefined && tempdir != "") {
      bot.socket.emit("new direction", { dir: tempdir, "id": game.idTurn, "gameId": game.gameId });
    }


})




bot.findDistance = function(pos1, pos2, avoidBlock) {
    var grid = new bot.PF.Grid(20, 20);
    grid.setWalkableAt(pos1[0], pos1[1], true);
    grid.setWalkableAt(pos2[0], pos2[1], true);
    for (let i = 0; i < globalGame.barricades.length; i++) {
        grid.setWalkableAt(globalGame.barricades[i][0], globalGame.barricades[i][1], false)
    }
        if(avoidBlock !== undefined && avoidBlock.length > 0){
        if(avoidBlock[0].constructor === Array){
            for(let i=0;i<avoidBlock.length;i++){
                if(avoidBlock[i][0] < 20 && avoidBlock[i][0] >= 0 && avoidBlock[i][1] < 20 && avoidBlock[i][1] >= 0 ){
                grid.setWalkableAt(avoidBlock[i][0],avoidBlock[i][1], false);
                }
            }
        } else{
             if(avoidBlock[0] < 20 && avoidBlock[0] >= 0 && avoidBlock[1] < 20 && avoidBlock[1] >= 0 ){
        grid.setWalkableAt(avoidBlock[0],avoidBlock[1],false);
        }
        }
    }
    var finder = new bot.PF.AStarFinder();
    var path = finder.findPath(pos1[0], pos1[1], pos2[0], pos2[1], grid);
    return path.length;
}



bot.stepArray = function(pos1, pos2, avoidBlock) {
    var grid = new bot.PF.Grid(20, 20);
    grid.setWalkableAt(pos1[0], pos1[1], true);
    grid.setWalkableAt(pos2[0], pos2[1], true);
    for (let i = 0; i < globalGame.barricades.length; i++) {
        grid.setWalkableAt(globalGame.barricades[i][0], globalGame.barricades[i][1], false)
    }
        if(avoidBlock !== undefined && avoidBlock.length > 0){
        if(avoidBlock[0].constructor === Array){
            for(let i=0;i<avoidBlock.length;i++){
                if(avoidBlock[i][0] < 20 && avoidBlock[i][0] >= 0 && avoidBlock[i][1] < 20 && avoidBlock[i][1] >= 0 ){
                grid.setWalkableAt(avoidBlock[i][0],avoidBlock[i][1], false);
                }
            }
        } else{
             if(avoidBlock[0] < 20 && avoidBlock[0] >= 0 && avoidBlock[1] < 20 && avoidBlock[1] >= 0 ){
        grid.setWalkableAt(avoidBlock[0],avoidBlock[1],false);
        }
        }
    }
    var finder = new bot.PF.AStarFinder();
    var path = finder.findPath(pos1[0], pos1[1], pos2[0], pos2[1], grid);
    return path;
}

bot.nextStep = function(pos1, pos2, avoidBlock) {
    if (pos1 === undefined || pos2 === undefined) {
        return "none";
    }
    var grid = new bot.PF.Grid(20, 20);
    grid.setWalkableAt(pos1[0], pos1[1], true);
    grid.setWalkableAt(pos2[0], pos2[1], true);
    for (let i = 0; i < globalGame.barricades.length; i++) {
        grid.setWalkableAt(globalGame.barricades[i][0], globalGame.barricades[i][1], false)
    }
    if(avoidBlock !== undefined && avoidBlock.length > 0){
        if(avoidBlock[0].constructor === Array){
            for(let i=0;i<avoidBlock.length;i++){
            if(avoidBlock[i][0] < 20 && avoidBlock[i][0] >= 0 && avoidBlock[i][1] < 20 && avoidBlock[i][1] >= 0 ){
                grid.setWalkableAt(avoidBlock[i][0],avoidBlock[i][1], false);
            }
            }
        } else{
             if(avoidBlock[0] < 20 && avoidBlock[0] >= 0 && avoidBlock[1] < 20 && avoidBlock[1] >= 0 ){
        grid.setWalkableAt(avoidBlock[0],avoidBlock[1],false);
             }
        }
    }
    var finder = new bot.PF.AStarFinder();
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

bot.checkPos = function(dirStr, pos){
    let tempPosVar = JSON.parse(JSON.stringify(pos));
    if(dirStr == "north"){
        tempPosVar[1]--;
    } else if(dirStr == "south"){
        tempPosVar[1]++;
    } else if(dirStr == "east"){
        tempPosVar[0]++;
    } else if(dirStr == "west"){
        tempPosVar[0]--;
    }
    console.log("checkpos " + tempPosVar)
    return tempPosVar;
    
}





}
module.exports = bot;