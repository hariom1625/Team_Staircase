const express = require("express");

const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const filename = "./api/MainAlgoToPrioritizeInCPP.txt";
const router = express.Router();
var program = "";
var input = "";
var options;
function readAlgoFile(req, res, next) {
  try {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      }
      program = data;
      // console.log(program);
    });
    fs.readFile("./api/sampleInput.txt", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      }
      input = data;
      console.log(program);
    });
    options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      headers: {
        "x-rapidapi-host": process.env.RAPID_HOST,
        "x-rapidapi-key": process.env.RAPID_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      data: {
        language_id: 54,
        stdin: `${input.toString()}`,
        source_code: `${program.toString()}`,
      },
    };
  } catch (err) {
    console.log(err + "fs");
  }
  next();
}

router.get("/prioritizeCase", readAlgoFile, async (req, res) => {
  try {
    if (program != null) {
      console.log(program);
      axios
        .request(options)
        .then(function (response) {
          const token = response.data.token;

          if (token != null) {
            console.log(token);
            let url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`;
            const newUrl = url.toString();
            const optionForGet = {
              newUrl,
              headers: {
                "x-rapidapi-key": process.env.RAPID_KEY,
                "x-rapidapi-host": process.env.RAPID_HOST,
                "content-type": "application/json",
              },
            };
            axios.request(optionForGet).then(function (response) {
              console.log(response.json);
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
