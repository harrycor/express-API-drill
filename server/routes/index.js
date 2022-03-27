const express = require("express");
const chirpRouter = require("./chirps");

let router = express.Router();

router.use('/chirps', chirpRouter);

router.get("/", (req, res) => {
  res.send("index or api page");
});

module.exports = router;
