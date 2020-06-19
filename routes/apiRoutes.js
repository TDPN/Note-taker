var fs = require("fs");
var uuid = require("uuidv1");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    var file = fs.readFileSync("db/db.json");
    var parseDb = JSON.parse(file);
    console.log(parseDb);
    res.json(parseDb);
  });

  app.post("/api/notes", function (req, res) {
    var db = fs.readFileSync("db/db.json");
    var note = { title: req.body.title, text: req.body.text, id: uuid() };
    const noteArray = JSON.parse(db);
    noteArray.push(note);
    noteJSON = JSON.stringify(noteArray);
    fs.writeFileSync("db/db.json", noteJSON);
    res.json(req.body);
  });

  app.delete("/api/notes/:id", function (req, res) {
    var db = fs.readFileSync("db/db.json");
    const noteArray = JSON.parse(db);
    for (i = 0; i < noteArray.length; i++) {
      if (noteArray[i].id == req.params.id) {
        noteArray.splice(i, 1);
      }
    }
    noteJSON = JSON.stringify(noteArray);
    fs.writeFileSync("db/db.json", noteJSON);
    res.json({ ok: true });
  });
};
