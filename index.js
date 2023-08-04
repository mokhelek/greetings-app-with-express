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
    const homePage = await greetUsersInstance.homePage(db);
    res.render("home", {
        userCount: homePage.userCount,
        userGreeting: homePage.userGreeting,
    });
});


app.get("/greeted", async (req, res) => {
    const greetedUsers = await greetUsersInstance.greetedUsers(db);
    res.render("greeted_users", { greetedUsersData: greetedUsers });
});

app.get("/counter/:username", async (req, res) => {
    const userData = await greetUsersInstance.userCounter(db, req.params.username);
    res.render("user_count", userData);
});

app.get("/reset", async (req, res) => {
    greetUsersInstance.resetData(db);
    res.redirect("/");
});

app.post("/greet", async (req, res) => {
    await greetUsersInstance.addUser(db, req.body.greetingLanguage, req.body.nameInput, req);
    res.redirect("/");
});



let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});
