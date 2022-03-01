const express =require("express")
require("./db/mongoose")

const userrouter  = require("./routers/user")
const taskrouter =require("./routers/tasks")
const app =express()
const port =process.env.PORT || 3000

app.use(express.json())
app.use(userrouter)
app.use(taskrouter)


app.listen(port,()=>{
    console.log("server is running on port " + port );
})
const Task = require("./models/task")
const User = require("./models/user")
// const main = async ()=>{
// const task = await Task.findById("6219fd1bc580703ef841aad1")
// await task.populate([{path:"owner"}])
// console.log(task.owner);


// const user =await User.findById("6219fcd4c580703ef841aac5")
// await user.populate([{path:"tasks"}])
// console.log(user.tasks);

// }
// main()