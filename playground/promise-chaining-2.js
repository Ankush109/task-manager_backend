require('../src/db/mongoose')
const task = require("../src/models/task")
//62138f0f20f989396733373d
// task.findByIdAndDelete("621401e0fdb8606f977b2128",{age:1}).then((tasks)=>{
// console.log(tasks);
// return task.countDocuments({completed:false})
// }).then((results)=>{
//     console.log(results);
// }).catch((e)=>{
//     console.log(e);
// })
const deletetaskandcount =async (id)=>{
    const taskop = await task.findByIdAndDelete(id)
    const count =await task.countDocuments({completed: false})
    return count
}
deletetaskandcount("6213905803c66819dac55e75").then((Count)=>{
    console.log(Count);
}).catch((e)=>{
    console.log(e);
})