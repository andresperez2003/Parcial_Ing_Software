const mongoose = require('mongoose')

const Userschema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniqued:true
    },
    active:{
        type:Boolean,
        default:false
    },
    current_password:{
        type:String,
        required:true
    },
    phone:{
      type:String,
      required:true  
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})
const User = mongoose.model("User", Userschema)
module.exports = User

