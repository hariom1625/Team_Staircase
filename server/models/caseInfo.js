const mongoose = require("mongoose");

const caseInfo = new mongoose.Schema({
  case_id: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
  },
  chargesheetDate: {
    type: Date,
  },
  section: [
    {
      name: String,
    },
  ],
  prevDates: [
    {
      type: Date,
    },
  ],
  lastDate: {
    type: Date,
  },
  accusedStatus: {
    type: Number,
  },
});

const CaseInfo = new mongoose.model("caseInfo", caseInfo);
module.exports = CaseInfo;
