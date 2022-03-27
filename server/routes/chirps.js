const express = require("express");
const chirpstore = require("../chirpstore");

let router = express.Router();

router.get("/:id?", (req, res) => {
  let id = req.params.id;
  if (id) {
    res.json(chirpstore.GetChirp(id));
  } else {
    res.json(chirpstore.GetChirps());
  }
});

router.post("/", (req, res) => {
  chirpstore.CreateChirp(req.body);
  res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  chirpstore.DeleteChirp(id);
  res.send("deleted");
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let newChirp = req.body; // this must be a JSON obj with 'name and text" to represent and replace the obj entirley
  chirpstore.UpdateChirp(id, newChirp);
  res.send("check that update");
});

module.exports = router;
