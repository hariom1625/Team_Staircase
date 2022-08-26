const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();
const UserInfo = require("../models/userInfo");
const LogInfo = require("../models/logs");
// for logging login log
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

// for logging incorrect login log
router.post("/incorrectCredentials", async (req, res) => {
  const newLog = new LogInfo();
  newLog.userId = req.body.userName;
  newLog.apiEndPoint = "/incorrectCredentials";
  newLog.ipAddress = req.body.ipAddress;
  newLog.statement = "Unauthorized access attempted";
  let newLogModel = new LogInfo(newLog);
  await newLogModel.save();
  res.send("Unauthorized access attempted");
});

router.post("/checkCredential", async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({
      userName: req.body.userName,
      password: req.body.password,
      userType: req.body.userType, 
      // 0 for registrar and 1 for judge 
    });
    if (userInfo != null) res.status(200).send({ data: true });
    else res.send({ data: false });
  } catch (error) {
    console.log("Incorrect Credential");
    res.send(400);
  }
});

module.exports = router;
