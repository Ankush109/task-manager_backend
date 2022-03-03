const Mongoose = require("mongoose")
const validator = require("validator")
const bcrpyt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const task = require("./task")
const userschema = Mongoose.Schema(
    {
        name:{
         type:String,
         required:true
        },
        email:{
         type:String,
         unique:true,
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
        },
        avatar:{
            type:Buffer
        } ,
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }],
      
    },{

        timestamps:true

     }

)


userschema.virtual("tasks",{
    ref:"Subscribe",
    localField:"_id",
    foreignField:"owner"
})






userschema.methods.toJSON = function(){
    const user =this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    delete userobject.avatar
    
    return userobject
}

userschema.methods.generatetokens =async function(){
    const user =this
    const token = jwt.sign({ _id:user._id.toString()  },"thisismynewcourse")

    user.tokens= user.tokens.concat({token})
    await user.save()



    return token
}

userschema.statics.findbycredentials =async (email,password)=>{
    const user =await User.findOne({email})
    if(!user){
        throw new Error("unable to login")
    }
    const ismatch =await bcrpyt.compare(password,user.password)
    if(!ismatch){
        throw new Error ("unable to login")
    }
    return user
}
//hash the plain text password before saving 
userschema.pre("save",async function(next){
 const user= this
 if(user.isModified("password")){
     user.password =await bcrpyt.hash(user.password,8)
 }
 

 

 next()
})
//deletes user task when user is removed:-
userschema.pre("remove",async function(next){
    const user =  this
await task.deleteMany({owner:user._id})


    next()
})
const User = Mongoose.model("User",userschema)
 module.exports = User