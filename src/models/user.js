const Mongoose = require("mongoose")
const validator = require("validator")

const User = Mongoose.model("User",{
    name:{
     type:String,
     required:true
    },
    email:{
     type:String,
     required:true,
     validate(value){
         if(!validator.isEmail(value)){
             throw Error ("invalid email")
         }
     }
    },
    password:{
     type:String,
     required:true,
     minlength:7,
     trim:true
    },
    age:{
 type:Number,
 default:69,
 validate(value){
     if(value<0){
         throw new Error ("age must be a positive number")
     }
 }
    } 
 })
 module.exports = User