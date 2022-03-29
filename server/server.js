const express = require("express");
const path = require('path');
const cors = require("cors");
const indexRouter = require("./routes");

let app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("server page");
// });
app.use(express.static(path.join(__dirname, '../client')))

app.use("/api", indexRouter);

app.listen(3000);
