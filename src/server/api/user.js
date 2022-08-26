const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();
// const CaseInfo = require("../models/caseInfo");
const LogInfo = require("../models/logs");

router.post("/login", async (req, res) => {
  const newLog = new LogInfo();
  newLog.userId = req.body.userName;
  newLog.apiEndPoint = "/login";
  newLog.ipAddress = req.body.ipAddress;
  newLog.statement = "User Succesfully loggedIn";
  let newLogModel = new LogInfo(newLog);
  await newLogModel.save();
  res.send("User loggedIn");
});
router.post("/incorrectCredentials", async (req, res) => {
  const newLog = new LogInfo();
  newLog.userId = req.body.userName;
  newLog.apiEndPoint = "/login";
  newLog.ipAddress = req.body.ipAddress;
  newLog.statement = "Unauthorized access attempted";
  let newLogModel = new LogInfo(newLog);
  await newLogModel.save();
  res.send("Unauthorized access attempted");
});

module.exports = router;
