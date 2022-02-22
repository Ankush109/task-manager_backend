require('../src/db/mongoose')
const User = require("../src/models/user")
//62138f0f20f989396733373d
// User.findByIdAndUpdate("6213905803c66819dac55e75",{ age:1}).then((user)=>{
// console.log(user);
// return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
// console.log(e);
// })


const updateageandcount =async(id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count =await User.countDocuments({age})
    return count
}   
updateageandcount("62138f0f20f989396733373d",2).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})