//require("dotenv").config();

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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(
  express.json({
    extended: false,
  })
);

app.use("/api/cases", require("./api/cases"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => console.log("Server started on Port: 4000"));

// app.get("/",function(req,res){
// // res.send({message :"Hello World !!"})
// res.json([
// {id:1,username:"Hey"},
// {id:2,username:"Hello World !!"}
// ])
// });

// app.get("/",function(req,res){
// res.sendFile(questionslist.js);
// });
//
//
// const question = require('./routes/QuestionList');
// app.use('/api/question', question);