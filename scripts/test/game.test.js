/**
 * @jest-environment jsdom
 */

//import the game to be tested (each function needs to be imported)
const { default: JSDOMEnvironment } = require("jest-environment-jsdom");
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

//jestspy will report activity based on paramemters: window with the alert method
//it will catch the alert and divert it into a function empty
jest.spyOn(window, "alert").mockImplementation(() => { });


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
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
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
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });

});

describe("gameplay works correctly", () => {
    //before each runs before each test is run
    //before all runs before all the test
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    //reset the state after each test
    afterEach(() => {
        game.score =0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurns add a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update the game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        //add the turn into the player move array before
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn;
        expect(window.alert).toBeCalledWith("Wrong Move!");
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    })
    test("clicking during computer sequence should fail", () =>{
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    })

//showturns() should:
//step trough the currentGame
//turn on the light
//turn off the light
});