import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greetUsers from "./public/js/greetings.js";


let app = express();

app.use(express.static("public")); // * Set the static files folder

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let greetUsersInstance = greetUsers()


app.get("/", function(req, res){
  // TODO : -> Get the counter and the greeting

  let userGreeting = greetUsersInstance.getUserGreeting()
  let userCount = greetUsersInstance.getCounter()


  res.render("home", {
    userCount,
    userGreeting
  });
});


app.post("/greet", (req, res) => {
  greetUsersInstance.setLanguage(req.body.greetingLanguage)
  greetUsersInstance.setUserName(req.body.nameInput)

  res.redirect("/");
});



let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});