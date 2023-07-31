
import assert from "assert" ;

import db from "../public/js/db.js";

import databaseInteraction from "../public/js/databaseLogic.js";

const databaseInteractionInstance = databaseInteraction(db) ;


describe("The basic database web app", function () {
    this.timeout(6000)

    beforeEach(async function () {
        try {
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE greetingstest RESTART IDENTITY CASCADE;");
          
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    it("should able to add user ", async function () {
        try {

            await databaseInteractionInstance.addUser({"username": "Tom" });
        
            
            let users = await databaseInteractionInstance.all();

            assert.equal(1, users.length);
          
        } catch (err) {
            console.log(err);
        }
    });

    it("get details of a specific user ", async function () {
        try {

            await databaseInteractionInstance.addUser({"username": "Bjorn" });
            
            let userData = await databaseInteractionInstance.getUserData("Bjorn");
            let expectedOutput = {
                counter :1,
                username:'Bjorn'
            }
            assert.deepEqual(expectedOutput,userData );
          
        } catch (err) {
            console.log(err);
        }
    });


    it("should be able to increment the user counter ", async function () {
        try {

            await databaseInteractionInstance.addUser({"username": "Bjorn" });
            await databaseInteractionInstance.addUser({"username": "Bjorn" });
            await databaseInteractionInstance.addUser({"username": "Bjorn" });

            
            let userCount = await databaseInteractionInstance.getUserCount("Bjorn");

            assert.equal(3,userCount );
          
        } catch (err) {
            console.log(err);
        }
    });


    it("Get a list of all greeted users", async function () {
        try {
            await databaseInteractionInstance.addUser({"username": "Tom" });
            await databaseInteractionInstance.addUser({"username": "Tom" });
            await databaseInteractionInstance.addUser({"username": "Kat" });
            
            let users = await databaseInteractionInstance.all();
            let expectedOutput = [
                {
                  counter: 2,
                  username: 'Tom'
                },
                {
                  counter: 1,
                  username: 'Kat'
                }
              ]
              
            assert.deepEqual(expectedOutput, users);
        } catch (err) {
            console.log(err);
        }
    });


    after(function () {
        db.$pool.end;
    });

})



