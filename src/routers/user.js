const express = require("express")
const User  =require("../models/user")
const router = new express.Router()
router.get("/users", async(req,res)=>{
    try{
const users = await User.find({})
res.send(users)

    }catch(e){
res.status(500).send(e)
    }
    User.find({}).then((users)=>{
res.send(users)
    }).catch((e)=>{

    })
})
router.post("/users",async(req,res)=>{
    const userop = new Usero(req.body)
    try{
        await userop.save()
        res.status(201).send(userop)
    }catch(e){
    res.status(400).send(e)
    }
     
    })
    router.get("/users/:id", async(req,res)=>{
        const _id =req.params.id
        try{
            const user =await User.findById(_id)
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
        }catch(e){
        res.status(500).send(e)
        }
        
        })
        router.patch("/users/:id",async(req,res)=>{
            const updates = Object.keys(req.body)
            const allowedupdates=["name","email","password","age"]
            const isvalidoperation = updates.every((update)=>allowedupdates.includes(update))
                if(!isvalidoperation){
                    return res.status(400).send({eror:"invalid updates"})
                }
            
            try{
        const user =await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
            }catch(e){
                res.status(400).send()
            }
        })
router.delete("/users/:id",async(req,res)=>{

    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)


    }catch(e){
        res.status(500).send(e)
    }







})
module.exports = router