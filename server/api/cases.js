const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();
// const Question = require("../db/Question");
// const Answer = require("../db/Answer");
router.get("/all", async (req, res) => {
  try {
    res.json("hey");
  } catch {}
});

module.exports = router;
