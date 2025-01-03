let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"]
}

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                // accept the click only if the currentgame > 0 - game already in progress
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    //get click targets ID and store that in move variable
                    let move = e.target.getAttribute("id");
                    //store the move in game.lastbutton
                    game.lastButton = move;
                    lightsOn(move);
                    //push that in game.playermoves
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
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
    game.turnInProgress = true;
    //set the turnNumbers to zero and use it as index number for the array
    game.turnNumber = 0;
    let turns = setInterval(() => {
        //calling the fucntion inside a set interval
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        //if the turnnumber is equal or higher than lenght of current game
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800)
}

function playerTurn() {
    //compare value with the same index number
    //get the last element of playermoves array
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        game.score++;
        showScore();
        addTurn();
    } else {
        alert("wrong move!");
        newGame();
    }
}

//export the game to be tested 
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };

