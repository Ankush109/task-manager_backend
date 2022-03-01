const express = require("express")
const Subscribe = require("../models/task")
const router= new express.Router()
const auth = require("../middleware/auth")
router.post("/tasks",auth,async(req,res)=>{
    // const subscribe = new Subscribe(req.body)
const subscribe =new Subscribe({
    ...req.body,
    owner:req.user._id

})

    try{
        await subscribe.save()
        res.status(201).send(subscribe)

    }catch(e){
res.status(500).send()
    }

})

router.delete("/tasks/:id",auth,async(req,res)=>{
    try{
const task = await Subscribe.findOneAndDelete({_id:req.params.id,owner:req.user._id})
if(!task){
    res.status(404).send()
}
res.status(201).send(task)
    }catch(e){
res.status(500).send(e)
    }

})
//get /tasks?commplete=truen
router.get("/tasks",auth,async(req,res)=>{ 
const match ={}
const sort ={}
if(req.query.completed){
    match.completed =req.query.completed === "true"
}
if(req.query.sortBy){
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1
}
    try{
await req.user.populate([{path:"tasks",match,options:{
    limit: parseInt(req.query.limit),
    skip:parseInt(req.query.skip),
    sort
}
    

}])

res.send(req.user.tasks)
res.status(201).send(subs)
    }catch(e){
res.status(404).send(e)
    }
 
})
router.get("/tasks/:id",auth,async (req,res)=>{
    const _id=req.params.id
    try{
// const subs = await Subscribe.findById(_id)
const task = await Subscribe.findOne({ _id,owner:req.user._id  })




res.status(201).send(task)
    }catch(e){ 
res.status(404).send(e)
    }

})

router.patch("/tasks/:id",auth,async(req,res)=>{
const tasks =Object.keys(req.body)
const allowedtasks =["description","completed"]
const isvalidtask = tasks.every((task)=>allowedtasks.includes(task))
if(!isvalidtask){
    return res.status(400).send({error:"invalid tasks"})
}
try{

    const task = await Subscribe.findOne({_id:req.params.id,owner:req.user._id})
    
   // const task =await Subscribe.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!task){
        return res.status(404).send()
    }
    tasks.forEach((taskop)=>{
        task[taskop]=req.body[taskop]
    })
    await task.save()
    res.status(201).send(task)
}catch(e){
res.status(500).send(e)
}
})
module.exports = router