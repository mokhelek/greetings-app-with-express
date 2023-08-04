export default function greetUsers() {
    let greetedUserName = "";
    let greetLanguage = "";

    function setUserName(userName) {
        greetedUserName =  toTitleCase(userName) ;
    }

    function getUserName() {
        return greetedUserName;
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function setLanguage(language) {
        greetLanguage = language;
    }

    function getLanguage() {
        return greetLanguage;
    }

    function getLanguagesGreet() {
        if (getLanguage() == "english") {
            return "Hello";
        }
        if (getLanguage() == "xhosa") {
            return "Molo";
        }
        if (getLanguage() == "sesotho") {
            return "Dumela";
        }
    }

    function getUserGreeting() {
        return getLanguagesGreet() + ", " + greetedUserName;
    }

    function checkValidName(userName) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(userName);
    }

    async function homePage(db) {
        let greetedUsersData = await db.any("SELECT * FROM greetings");
        let userGreeting = false;
        let userCount = 0;

        if (getUserGreeting().includes("Molo") || getUserGreeting().includes("Hello") || getUserGreeting().includes("Dumela")) {
            userGreeting = getUserGreeting();
        }

        for (let i = 0; i < greetedUsersData.length; i++) {
            userCount += Number(greetedUsersData[i].counter);
        }
        console.log(getUserGreeting());

        return {
            userGreeting,
            userCount,
        };
    }

    async function addUser(db, language, username, req) {
        if (language && username) {
            await db.none("INSERT INTO greetings (username, counter) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET counter = greetings.counter + 1", [toTitleCase(username), 1]);
            setLanguage(language)
            setUserName(username)
        } else {
            if (username && !language) {
                req.flash("info", "Please select a language");
            } else if (language && !username) {
                req.flash("info", "Please enter your name");
            } else {
                req.flash("info", "Both name and language are needed");
            }
        }
    }

    async function greetedUsers(db) {
        let greetedUsers = await db.any("SELECT * FROM greetings");
        return greetedUsers;
    }

    async function userCounter(db, username) {
        return await db.oneOrNone("SELECT * FROM greetings WHERE username = $1", [username]);
    }

    async function resetData(db) {
        await db.none("DELETE FROM greetings");
    }

    return {
        getUserName,
        getLanguage,
        getUserGreeting,
        getLanguagesGreet,
        setLanguage,
        setUserName,
        checkValidName,

        homePage,
        addUser,
        greetedUsers,
        userCounter,
        resetData,
    };
}
