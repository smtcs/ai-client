let bot = require("./bot");
bot.key = "7enhdtntk52"; //Set your bot key to this string!

bot.direction = function(game) { //ONLY CHANGE THIS FUNCTION

    var enemyBots = [];
    var enemyBases = [];
    let myDir = "none";


    var scoreArr = [];
for(let i=0;i<game.players.length;i++){ //Adds all other bots to the enemyBots array.
    if(game.players[i].id != game.myBot.id){
        enemyBases.push(game.bases[i]); //Adds all other bases to the enemyBases array
        enemyBots.push(game.players[i])
    }
}




let collectArr = game.nodes.concat(game.bases);


for(let i=0;i<enemyBots.length;i++){
    var tempPlayer;
    if(bot.findDistance(game.myBot.pos,enemyBots[i].pos) <= 4 && enemyBots[i].energy > game.myBot.energy){
        tempPlayer = JSON.parse(JSON.stringify(enemyBots[i]));
        tempPlayer.energy = (game.myBot.energy - ((enemyBots[i].energy+ game.myBot.energy) /2))
        collectArr.push(tempPlayer)
    }
}


        for(var i=0;i<collectArr.length;i++){
        scoreArr.push(collectArr[i].energy / bot.findDistance(game.myBot.pos, collectArr[i].pos))
    }

                let avoidArr = [];
            for(const enemy of enemyBots){
                if(enemy.energy <= game.myBot.energy +1){
                   let enemyPos = JSON.parse(JSON.stringify(enemy.pos));
               avoidArr.push(enemyPos);
                   enemyPos = JSON.parse(JSON.stringify(enemy.pos));
               enemyPos[0]--;
               avoidArr.push(enemyPos);
             enemyPos = JSON.parse(JSON.stringify(enemy.pos));
               enemyPos[0]++;
               avoidArr.push(enemyPos);
                 enemyPos = JSON.parse(JSON.stringify(enemy.pos));
               enemyPos[1]--;
               avoidArr.push(enemyPos);
               enemyPos = JSON.parse(JSON.stringify(enemy.pos));
               enemyPos[1] ++;
               avoidArr.push(enemyPos);
                  }
            }
            console.log(avoidArr)
    
    
    
    //Calculates most profitable next step
let bestNode = collectArr[0];
for(var i=0;i<scoreArr.length;i++){
    if((bestNode.energy / bot.findDistance(game.myBot.pos, bestNode.pos)) <  scoreArr[i]){
        if(bot.nextStep(game.myBot.pos, collectArr[i].pos, avoidArr) !== undefined){
        bestNode = collectArr[i];
        }
    }
}
    
//Returns to base before game ends.
if(game.turn >=  game.totalTurns - (bot.findDistance(game.myBot.pos, game.bases[game.myBot.id].pos)  * game.players.length )){
    myDir = bot.nextStep(game.myBot.pos, game.myBase.pos);
} else{
    
         

    myDir = bot.nextStep(game.myBot.pos, bestNode.pos, avoidArr);
    
    
    
    
}
return myDir;
} //DO NOT CHANGE ANYTHING BELOW THIS LINE
bot();