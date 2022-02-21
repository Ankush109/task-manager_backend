const express =require("express")
require("./db/mongoose")
const Usero = require("./models/user")
const Subscribe = require("./models/task")
const User = require("./models/user")
const app =express()
const port =process.env.PORT || 3000

app.use(express.json())


// app.post("/users",(req,res)=>{
// const userop = new Usero(req.body)
// userop.save().then(()=>{
// res.send(userop)
// }).catch((e)=>{
// res.status(400).send(e)
// })
// })
app.post("/tasks",(req,res)=>{
    const subscribe = new Subscribe(req.body)
    subscribe.save().then(()=>{
        res.send(subscribe)
    }).catch((e)=>{
        res.status(400).send(e)

    })
})
app.get("/users",(req,res)=>{
    User.find({}).then((users)=>{
res.send(users)
    }).catch((e)=>{

    })
})
app.get("/users/:id",(req,res)=>{
const _id =req.params.id
User.findById(_id).then((user)=>{
if(!user){
    return res.status(404).send()
}
res.send(user)
}).catch((e)=>{
res.status(500).send(e)
})
})
app.get("/tasks",(req,res)=>{
    Subscribe.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{

    })
})
app.get("/tasks/:id",(req,res)=>{
    const _id=req.params.id
    Subscribe.findById(_id).then((tasks)=>{
  if(!tasks){
 return res.status(404).send()
  }
  res.send(tasks)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})
app.listen(port,()=>{
    console.log("server is running on port " + port );
})
