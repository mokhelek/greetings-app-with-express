import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greetUsers from "./public/js/greetings.js";
import db from "./public/js/db.js";

import flash from "express-flash";
import session from "express-session";

let app = express();

app.use(
    session({
        secret: "<add a secret string here>",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(flash());

app.use(express.static("public")); 

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let greetUsersInstance = greetUsers();

app.get("/", async (req, res) => {
    const homePage = await greetUsersInstance.homePage(db)
    res.render("home", {
        userCount: homePage.userCount,
        userGreeting: homePage.userGreeting,
    });
});

app.post("/greet", async (req, res) => {
    greetUsersInstance.setLanguage(req.body.greetingLanguage);
    greetUsersInstance.setUserName(req.body.nameInput);

    if (req.body.greetingLanguage && req.body.nameInput) {
        await db.none("INSERT INTO greetings (username, counter) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET counter = greetings.counter + 1", [req.body.nameInput, 1]);
    } else {
        if (req.body.nameInput && !req.body.greetingLanguage) {
            req.flash("info", "Please select a language");
        } else if (req.body.greetingLanguage && !req.body.nameInput) {
            req.flash("info", "Please enter your name");
        } else {
            req.flash("info", "Both name and language are needed");
        }
    }

    res.redirect("/");
});

app.get("/greeted", async (req, res) => {
    let greetedUsersData = await db.any("SELECT * FROM greetings");

    res.render("greeted_users", { greetedUsersData });
});

app.get("/counter/:username", async (req, res) => {
    const userData = await db.oneOrNone("SELECT * FROM greetings WHERE username = $1", [req.params.username]);

    res.render("user_count", userData);
});

app.get("/reset", async (req, res) => {
    await db.none("DELETE FROM greetings");

    res.redirect("/");
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});
