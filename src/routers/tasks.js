const express = require("express")
const Subscribe = require("../models/task")
const router= new express.Router()
router.post("/tasks",async(req,res)=>{
    const subscribe = new Subscribe(req.body)
    try{
        await subscribe.save()
        res.status(201).send(subscribe)

    }catch(e){
res.status(500).send()
    }

})

router.delete("/tasks/:id",async(req,res)=>{
    try{
const task = await Subscribe.findByIdAndDelete(req.params.id)
if(!task){
    res.status(404).send()
}
res.status(201).send(task)
    }catch(e){
res.status(500).send(e)
    }

})

router.get("/tasks",async(req,res)=>{
    try{
const subs =  await Subscribe.find({})
res.status(201).send(subs)
    }catch(e){
res.status(404).send(e)
    }
 
})
router.get("/tasks/:id",async (req,res)=>{
    const _id=req.params.id
    try{
const subs = await Subscribe.findById(_id)
res.status(201).send(subs)
    }catch(e){
res.status(404).send(e)
    }

})

router.patch("/tasks/:id",async(req,res)=>{
const tasks =Object.keys(req.body)
const allowedtasks =["description","completed"]
const isvalidtask = tasks.every((task)=>allowedtasks.includes(task))
if(!isvalidtask){
    return res.status(400).send({error:"invalid tasks"})
}
try{
    const task =await Subscribe.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!task){
        return res.status(404).send()
    }
    res.status(201).send(task)
}catch(e){
res.status(500).send(e)
}
})
module.exports = router