export default function databaseInteraction(db) {

    async function all() {
        let userData = await db.any("SELECT * from greetingstest");
        return userData;
    }

    async function addUser(details) {
        let results = await db.none("INSERT INTO greetingstest (counter, username) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET counter = greetingstest.counter + 1", [1, details.username]);

        return results;
    }

    async function getGreeted() {
        let results = await db.oneOrNone("SELECT * FROM greetingstest");

        return results;
    }

    async function getUserCount(username) {
        let results = await db.oneOrNone("SELECT * FROM greetingstest WHERE username = $1", [username]);
        return results.counter;
    }

    async function getUserData(username) {
        let results = await db.oneOrNone("SELECT * FROM greetingstest WHERE username = $1", [username]);
        return results;
    }

    // async function update(category) {
    //     return await db.none("UPDATE categories SET description = $1 WHERE id = $2", [category.description, category.id]);
    // }

    // async function deleteOne(id) {
    //     return await db.none("DELETE FROM categories WHERE id = $1", [id]);
    // }

    return {
        all,
        addUser,
        getUserCount,
        getGreeted,
        getUserData,

        // delete: deleteOne,
        // update
    };
}
