const Mongoose = require("mongoose")
const validator = require("validator")
const Subscribe =Mongoose.model("Subscribe",{
        description:{
            type:String,
            required:true
        },
        completed:{
            type:Boolean,
            default:false
        }
    })
    module.exports = Subscribe