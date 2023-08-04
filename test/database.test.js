import assert from "assert";

// import db from "../public/js/db.js";
import db from "../model/db.js";

// import databaseInteraction from "../public/js/databaseLogic.js";
import databaseInteraction from "../model/databaseLogic.js";

const databaseInteractionInstance = databaseInteraction(db);

describe("The basic database web app", function () {
    this.timeout(6000);

    beforeEach(async function () {
        await db.none("TRUNCATE TABLE greetingstest RESTART IDENTITY CASCADE;");
    });

    it("should able to add user ", async function () {
        await databaseInteractionInstance.addUser({ username: "Tom" });

        let users = await databaseInteractionInstance.all();

        assert.equal(1, users.length);
    });

    it("get details of a specific user ", async function () {
        await databaseInteractionInstance.addUser({ username: "Bjorn" });

        let userData = await databaseInteractionInstance.getUserData("Bjorn");
        let expectedOutput = {
            counter: 1,
            username: "Bjorn",
        };
        assert.deepEqual(expectedOutput, userData);
    });

    it("should be able to increment the user counter ", async function () {
        await databaseInteractionInstance.addUser({ username: "Bjorn" });
        await databaseInteractionInstance.addUser({ username: "Bjorn" });
        await databaseInteractionInstance.addUser({ username: "Bjorn" });

        let userCount = await databaseInteractionInstance.getUserCount("Bjorn");

        assert.equal(3, userCount);
    });

    it("Get a list of all greeted users", async function () {
        await databaseInteractionInstance.addUser({ username: "Tom" });
        await databaseInteractionInstance.addUser({ username: "Tom" });
        await databaseInteractionInstance.addUser({ username: "Kat" });

        let users = await databaseInteractionInstance.all();
        let expectedOutput = [
            {
                counter: 2,
                username: "Tom",
            },
            {
                counter: 1,
                username: "Kat",
            },
        ];

        assert.deepEqual(expectedOutput, users);
    });

    after(function () {
        db.$pool.end;
    });
});
