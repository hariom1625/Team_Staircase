const express = require("express");

const mongoose = require("mongoose");
const router = express.Router();
const CaseInfo = require("../models/caseInfo");
// const Answer = require("../db/Answer");
var mp = new Map([
  [3, 2],
  [1, 2],
]);
router.post("/newCase", async (req, res) => {
  try {
    const newCase = new CaseInfo();
    console.log(req.body);
    console.log(mp.get(3));
    newCase.case_id = req.body.case_id;
    newCase.domain = req.body.domain;
   
    let temp=[]
    req.body.section.split(',').map(item => temp.push({name:item}))
    newCase.section = temp;
    // console.log(req.body.section,typeof req.body.section.split(','),req.body.section.split(','),newCase.section)
    // newCase.prevDates = req.body.prevDates ||  "";
    newCase.lastDate = req.body.lastDate;
    newCase.accusedStatus = req.body.accusedStatus || "";
    newCase.nextHearingDate = req.body.nextHearingDate || "";
    newCase.proposedDate = req.body.proposedDate || "";
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
    res.status(200).send({ data: caseInfo });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});


// for updating all the cases

module.exports = router;
