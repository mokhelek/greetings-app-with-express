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

app.get("/", function(req, res){
  res.render("home");
});


app.post("/greet", (req, res) => {
  console.log(req.body)
  res.redirect("/");
});



let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});