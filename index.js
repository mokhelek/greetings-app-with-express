import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greetUsers from "./public/js/greetings.js";
import db from "./public/js/db.js";

let app = express();

app.use(express.static("public")); // * Set the static files folder

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let greetUsersInstance = greetUsers();

app.get("/", async (req, res) => {
    let userGreeting = greetUsersInstance.getUserGreeting();
    let userCount = 0;
    
    let greetedUsersData = await db.any("SELECT * FROM greetings");

    for (let i = 0; i < greetedUsersData.length; i++) {
        userCount += Number(greetedUsersData[i].counter) ;
    }

    res.render("home", {
        userCount,
        userGreeting,
    });
});

app.post("/greet", (req, res) => {
    greetUsersInstance.setLanguage(req.body.greetingLanguage);
    greetUsersInstance.setUserName(req.body.nameInput);



    db.none('INSERT INTO greetings(username, counter) VALUES($1, $2)',[req.body.nameInput,1])
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Failed to add data to the database' });
    });




    
});

app.get("/greeted", function (req, res) {
    // TODO : -> A list of all the greeted users
});

app.get("/counter/:username", function (req, res) {
    // TODO : -> Show info of how many times a specific user has been greeted
});

/*
    app.get("/data", async (req, res) => {
      
        try {
            const users = await db.any('SELECT * FROM greetings');
            res.json(users);
          } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users' });
          }
    
    });
*/

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});
