let bot = require("./bot");
bot.key = "7enhdtntk52";

bot.direction = function(game) { //ONLY CHANGE THIS FUNCTION
    var scoreArr = [];
    var enemyBots = [];
    var enemyBases = [];
    let myDir = "none";

for(let i=0;i<game.players.length;i++){
    if(game.players[i].id != game.idTurn){
        enemyBases.push(game.bases[i]);
        enemyBots.push(game.players[i])
    }
}

let collectArr = game.nodes.concat(game.bases);
        for(var i=0;i<collectArr.length;i++){
        scoreArr.push(collectArr[i].energy / bot.findDistance(game.myBot.pos, collectArr[i].pos))
    }
    //Calculates most profitable next step
let bestNode = collectArr[0];
for(var i=0;i<scoreArr.length;i++){
    if((bestNode.energy / bot.findDistance(game.myBot.pos, bestNode.pos)) <  scoreArr[i]){
        bestNode = collectArr[i];
    }
}
 console.log("best node: " +JSON.stringify( bestNode))
    
//Returns to base before game ends.
if(game.turn >=  game.totalTurns - (bot.findDistance(game.myBot.pos, game.bases[game.idTurn].pos)  * game.players.length )){
    myDir = bot.nextStep(game.myBot.pos, game.myBase.pos);
} else{
    myDir = bot.nextStep(game.myBot.pos, bestNode.pos)
    console.log("first DIR " + myDir)
    
    let tempPos = bot.checkPos(myDir, game.myBot.pos)
for(let i=0;i<enemyBots.length;i++){
if(tempPos[0] == enemyBots[i].pos[0] && tempPos[1] == enemyBots[i].pos[1] ){
    if(enemyBots[i].energy < game.myBot.energy + 1){
    myDir = bot.nextStep(game.myBot.pos, bestNode.pos, enemyBots[i].pos);
    }
    break;
}
}
}
return myDir;
}
//DO NOT CHANGE ANYTHING BELOW THIS LINE
bot();