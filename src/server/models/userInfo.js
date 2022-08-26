const mongoose = require('mongoose')

const userInfo=new mongoose.Schema({
    userId:{
        type:String,
        
    },
    password:{
        type:String,
    },
    userType:{
        type:Number,
    },
    userName:{
        type:String
    }
})


const UserInfo = new mongoose.model("userInfo", userInfo);
module.exports = UserInfo;