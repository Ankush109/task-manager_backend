require('../src/db/mongoose')
const User = require("../src/models/user")
//62138f0f20f989396733373d
User.findByIdAndUpdate("6213905803c66819dac55e75",{ age:1}).then((user)=>{
console.log(user);
return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
console.log(e);
})