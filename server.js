var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public/"));

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
app.post("/api/notes", function (req, res) {});
app.delete("/api/notes/:id", function (req, res) {
  let deleteId = req.params.id;
  let deleteObj = arrayData.find((data) => data.id == deleteId);
  let deleteIndex = arrayData.indexOf(deleteObj);
  arrayData.splice(deleteIndex, 1);
  res.send(deleteObj);
});

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
