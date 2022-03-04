const Mongoose = require("mongoose")

Mongoose.connect(process.env.MONGODB_URL,{


})
// const User = Mongoose.model("User",{
//    name:{
//     type:String,
//     required:true
//    },
//    email:{
//     type:String,
//     required:true,
//     validate(value){
//         if(!validator.isEmail(value)){
//             throw Error ("invalid email")
//         }
//     }
//    },
//    password:{
//     type:String,
//     required:true,
//     minlength:7,
//     trim:true
//    },
//    age:{
// type:Number,
// validate(value){
//     if(value<0){
//         throw new Error ("age must be a positive number")
//     }
// }
//    } 
// })
// const me = new User({
// name:"arnab",
// email:"mike@gmail.com",
// password:"kyamatlabmainchuityahoon"
// })
// me.save().then(()=>{
// console.log(me);
// }).catch((error)=>{ 
// console.log("error",error);
// })
// const Subscribe =Mongoose.model("Subscribe",{
//     description:{
//         type:String,
//         required:true
//     },
//     Completed:{
//         type:Boolean
//     }
// })
// const op = new Subscribe({
//     description:" get to watch hd quality movies",
//     Completed : true
// })
// op.save().then(()=>{
//     console.log(op);
// }).catch((error)=>{
//     console.log("error",error);
// })