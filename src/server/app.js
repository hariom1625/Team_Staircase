require("dotenv").config();

const connectDB = require("./db/connection.js");

const express = require("express");
const app = express();
const session = require("express-session");
connectDB();
cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  express.json({
    extended: false,
  })
);

app.use("/api/cases", require("./api/cases"));
app.use("/api/user", require("./api/user"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => console.log("Server started on Port: 4000"));
