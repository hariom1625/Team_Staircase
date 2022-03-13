const mongoose = require("mongoose");

const CaseInfo =  new mongoose.Schema({
    case_id: {
        type : String,
        required : true
    },
    domain:{
        type : String,
    },
    chargSheetDate:{
        type : Date,
    },
    section:[{
        name : String,
    }],
    prevoiusDates:[{
        dates:Date,
    }],
    lastDate:{
        type : Date,
    },
    accusedStatus:{
        type :Number,
    }



});
