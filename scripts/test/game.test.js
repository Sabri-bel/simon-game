/**
 * @jest-environment jsdom
 */


//import the game to be tested (each function needs to be imported)
const { game, newGame, showScore, addTurn } = require("../game");


//the code below will be the same for every html 
// just need to change the filename
beforeAll(() => {
    //install the fs library (node default standard library)
    let fs = require("fs");
    //load the index into jest's mock dom
    //setup the dome before the other tests run
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    //write to the fileContents the mock dom
    document.write(fileContents);
    //close the docuument after writing
    document.close();
});


describe("game object contains the correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    //correct choice should be present:
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

//newGame() fucntion should:
//reset the score to zero
//clear the playerMoves array
//clear the currentGame array
//call showscore() fucntion
//call addTurn() function


describe("new game works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    })
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    })
    test("should be one move in the computer sequence array", () => {
        expect(game.currentGame.length).toBe(1);
    })
    test("should clear the players move array", () => {
        expect(game.playerMoves.length).toBe(0);
    })
    test("should display zero for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });

});
