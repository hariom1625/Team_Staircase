const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();
// const CaseInfo = require("../models/caseInfo");
const LogInfo = require("../models/logs");

router.post("/login", async (req, res) => {
  const newLog = new LogInfo();
  newLog.userId = req.body.userId;
  newLog.apiEndPoint = "/login";
  newLog.ipAddress = req.body.ipAddress;
  let newLogModel = new LogInfo(newLog);
  await newLogModel.save();
  res.send("Login Logged");
});

module.exports = router;
