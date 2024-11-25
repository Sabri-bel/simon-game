let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"]
}

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    showScore();
    addTurn();
}

function addTurn() {
    //clear the player arrows
    //add a random buttn id to the current game array
    //call showturns() function
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400)

}

function showTurns() {
    //set the turnNumbers to zero and use it as index number for the array
    game.turnNumber = 0;
    let turns = setInterval(() => {
        //calling the fucntion inside a set interval
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        //if the turnnumber is equal or higher than lenght of current game
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800)
}

//export the game to be tested 
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };

