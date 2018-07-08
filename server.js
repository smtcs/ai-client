let bot = require("./bot");
bot.key = "7enhdtntk52"; //Set your bot key to this string!

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
    
//Returns to base before game ends.
if(game.turn >=  game.totalTurns - (bot.findDistance(game.myBot.pos, game.bases[game.idTurn].pos)  * game.players.length )){
    myDir = bot.nextStep(game.myBot.pos, game.myBase.pos);
} else{
    
         
            let avoidArr = [];
            for(const enemy of enemyBots){
                   let enemyPos = JSON.parse(JSON.stringify(enemy.pos));
               avoidArr.push(enemyPos);
               enemyPos[0]--;
               avoidArr.push(enemyPos);
               enemyPos[0]+=2;
               enemyPos = JSON.parse(JSON.stringify(enemy.pos));
               avoidArr.push(enemyPos);
               enemyPos[1]--;
               avoidArr.push(enemyPos);
               enemyPos[1] += 2;
               avoidArr.push(enemyPos);
             }
    myDir = bot.nextStep(game.myBot.pos, bestNode.pos, avoidArr);
    
    
}
return myDir;
} //DO NOT CHANGE ANYTHING BELOW THIS LINE
bot();