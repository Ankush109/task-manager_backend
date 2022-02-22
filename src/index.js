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
