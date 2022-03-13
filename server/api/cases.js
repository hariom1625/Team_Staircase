const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();
const CaseInfo = require("../models/caseInfo");
// const Answer = require("../db/Answer");
router.post("/newCase", async (req, res) => {
  try {
    const newCase = new CaseInfo();
    console.log(req.body);
    newCase.case_id = req.body.case_id;
    newCase.domain = req.body.domain;
    newCase.section = req.body.section;
    newCase.prevDates = req.body.prevDates;
    newCase.lastDate = req.body.lastDate;
    newCase.accusedStatus = req.body.accusedStatus;

    let newCaseModel = new CaseInfo(newCase);
    await newCaseModel.save();
    res.send("New Case Added");
  } catch (error) {
    console.log(error);
  }
});

// for getting all cases
router.get("/getCase", async (req, res) => {
  try {
    const caseInfo = await CaseInfo.find({});
    console.log(caseInfo);
    res.status(200).send({data: caseInfo});
  } catch (error) {
    console.log(error);
    res.status(400).send({error: error});
  
  }
  });

  // for updating all the cases



module.exports = router;
