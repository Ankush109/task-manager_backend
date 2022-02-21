const Mongoose = require("mongoose")
const validator = require("validator")
const Subscribe =Mongoose.model("Subscribe",{
        description:{
            type:String,
            required:true
        },
        Completed:{
            type:Boolean,
            default:false
        }
    })
    module.exports = Subscribe