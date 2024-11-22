/**
 * @jest-environment jsdom
 */


//import the game to be tested
const { game } = require("../game");


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
});