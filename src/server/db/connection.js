require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB Connected.....!!!!!");
};

module.exports = connectDB;
