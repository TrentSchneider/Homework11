var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public/"));

var arrayData = require("./db/db.json");

// function for updating IDs for every object in the JSON file
function idUpdate() {
  for (let i = 0; i < arrayData.length; i++) {
    arrayData[i].id = i + 1;
  }
}

// Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API Routes
// route to retrieve JSON
app.get("/api/notes", function (req, res) {
  return res.json(arrayData);
});
// route to add new notes to the JSON
app.post("/api/notes", function (req, res) {
  let newNote = req.body;
  arrayData.push(newNote);
  idUpdate();
  return res.json(arrayData);
});
// route to delete objects from JSON based off of their ID
app.delete("/api/notes/:id", function (req, res) {
  let deleteId = req.params.id;
  let deleteObj = arrayData.find((data) => data.id == deleteId);
  let deleteIndex = arrayData.indexOf(deleteObj);
  arrayData.splice(deleteIndex, 1);
  idUpdate();
  res.send(deleteObj);
});

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
