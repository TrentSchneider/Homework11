var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var arrayData = require("./db/db.json");

// Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API Routes
app.get("/api/notes", function (req, res) {
  return res.json(arrayData);
});

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
