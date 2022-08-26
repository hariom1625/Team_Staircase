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
    newCase.case_id = req.body.case_id;
    newCase.domain = req.body.domain;

    let temp = [];
    req.body.section.split(",").map((item) => temp.push({ name: item }));
    newCase.section = temp;
    // console.log(req.body.section,typeof req.body.section.split(','),req.body.section.split(','),newCase.section)
    // newCase.prevDates = req.body.prevDates ||  "";
    newCase.chargesheetDate = req.body.chargesheetDate;
    newCase.lastDate = req.body.lastDate;
    newCase.accusedStatus = req.body.accusedStatus || "";
    newCase.nextHearingDate = req.body.nextHearingDate || "";
    newCase.proposedDate = req.body.proposedDate || "";
    newCase.details = req.body.details;
    console.log("Adding Case", newCase);
    let newCaseModel = new CaseInfo(newCase);
    // console.log(newCase);
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
    res.status(200).send({ data: caseInfo });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

router.get("/sampleInput", async (req, res) => {
  try {
    const caseInfo = await CaseInfo.find({});
    let ans = "";
    ans += caseInfo.length.toString() + " ";
    caseInfo.map((item) => {
      ans += item.case_id.toString() + " ";
      if (!item.accusedStatus) item.accusedStatus = 1;
      ans += item.accusedStatus.toString() + " ";
      if (!item.chargesheetDate) item.chargesheetDate = new Date();
      let epoch =
        (item.chargesheetDate.getTime() -
          item.chargesheetDate.getMilliseconds()) /
        1000;
      ans += epoch.toString() + " ";
      ans += item.section.length.toString() + " ";
      item.section.forEach((sec) => {
        ans += sec.name.toString() + " ";
      });
      if (!item.lastDate) item.lastDate = new Date();
      epoch =
        (item.lastDate.getTime() - item.lastDate.getMilliseconds()) / 1000;
      ans += epoch.toString() + " ";
    });

    res.status(200).send({ data: ans });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

// for updating all the cases

router.post("/saveNextHearingDate", async (req, res) => {
  try {
    const caseInfo = await CaseInfo.findOne({ case_id: req.body.case_id });
    caseInfo.nextHearingDate = req.body.nextHearingDate;
    caseInfo.save();
    console.log(caseInfo);
    res.status(200).send({ data: caseInfo });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

module.exports = router;
