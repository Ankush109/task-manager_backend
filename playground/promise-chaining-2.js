require('../src/db/mongoose')
const task = require("../src/models/task")
//62138f0f20f989396733373d
task.findByIdAndDelete("621401e0fdb8606f977b2128",{age:1}).then((tasks)=>{
console.log(tasks);
return task.countDocuments({completed:false})
}).then((results)=>{
    console.log(results);
}).catch((e)=>{
    console.log(e);
})