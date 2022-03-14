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
      date: Date,
    },
  ],
  lastDate: {
    type: Date,
  },
  accusedStatus: {
    type: Number,
  },
  nextHearingDate: {
    type: Date,
  },
  acceptedCount: {
    type: Number,
  },
  proposedDate: {
    type: Date,
  },
  hearingDates: [
    {
      proposed: Date,
      accepted: Date,
    },
  ],
});

const CaseInfo = new mongoose.model("caseInfo", caseInfo);
module.exports = CaseInfo;
