const { default: mongoose } = require("mongoose")
const Mongoose = require("mongoose")
const validator = require("validator")




const taskschema =new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }
},{
    timestamps:true
})
const Subscribe =Mongoose.model("Subscribe",taskschema)
    module.exports = Subscribe