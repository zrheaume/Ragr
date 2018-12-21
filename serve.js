require('dotenv').config();
var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

const DIR = __dirname;
const PORT = process.env.PORT || 8080;

//Initialize express application
var app = express();

//Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Use statements
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require(__dirname + "/app/route.js")(app);

app.listen(PORT, function (err) {
    if (err) throw (err);
    console.log("Server listening on port " + PORT);
});