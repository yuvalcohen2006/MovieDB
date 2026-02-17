require("dotenv").config();
require("./api/config/mongoose");

const express = require("express");
const path = require("path");

const movieRouter = require("./api/rest/routers/movieRouter")
const actorRouter = require("./api/rest/routers/actorRouter")

const app = express();
const PORT = 3000;

app.set("view engine", "hbs");
app.set("views", __dirname + "/interface/views");

app.use("/api/handlers", express.static(path.join(__dirname, "api/handlers")));
app.use("/styles", express.static(path.join(__dirname, "interface/styles")));
app.use(express.json());

app.use(movieRouter);
app.use(actorRouter);

app.get("", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
