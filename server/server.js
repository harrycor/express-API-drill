const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes");

let app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server page");
});

app.use("/api", indexRouter);

app.listen(3000);
