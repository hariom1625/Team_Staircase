const mongoose = require("mongoose");

const logInfo = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    apiEndPoint: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timeStamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Logs = new mongoose.model("logInfo", logInfo);
module.exports = Logs;
