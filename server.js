let bot = require("./bot"); //Don't change this
bot.hostURL = 'http://aichallenge-gorgamite.c9users.io'; //Put the server url/IP adress here!
bot.key = "7enhdtntk52"; //Set your bot key to this string!
/***************************************************/
//Write your code in this function!!!
bot.direction = function(game) {
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
    if(enemyBots[i].energy > game.myBot.energy){
        tempPlayer = JSON.parse(JSON.stringify(enemyBots[i]));
        tempPlayer.energy = ( ((enemyBots[i].energy+ game.myBot.energy) /2) - game.myBot.energy)
        collectArr.push(tempPlayer)
    }
}


        for(var i=0;i<collectArr.length;i++){
        scoreArr.push(collectArr[i].energy / bot.findDistance(game.myBot.pos, collectArr[i].pos))
    }

            for(const enemy of enemyBots){
                if(enemy.energy < game.myBot.energy + 1){
bot.avoid(enemy.pos);
                  }
            }
            if(game.myBot.energy > 0){
 bot.avoid(game.myBase.pos);
            }
    
    
    
    //Calculates most profitable next step
let bestNode = collectArr[0];
for(var i=0;i<scoreArr.length;i++){
    if((bestNode.energy / bot.findDistance(game.myBot.pos, bestNode.pos)) <  scoreArr[i]){
        if(bot.nextStep(game.myBot.pos, collectArr[i].pos) !== undefined){
        bestNode = collectArr[i];
        }
    }
}
    
//Returns to base before game ends.
if(game.turn >=  game.totalTurns - (bot.findDistance(game.myBot.pos, game.bases[game.myBot.id].pos, false)  * game.players.length )){
    myDir = bot.nextStep(game.myBot.pos, game.myBase.pos, false);
} else{
    
         

    myDir = bot.nextStep(game.myBot.pos, bestNode.pos);
    
    
    
    
}
return myDir;
} //DO NOT CHANGE ANYTHING BELOW THIS LINE
bot();
