const express = require("express")
const User  =require("../models/user")
const auth =require("../middleware/auth")
const router = new express.Router()
router.get("/users/me",auth, async(req,res)=>{
res.send(req.user)
})
router.post("/users/login",async(req,res)=>{
try{
const user =await User.findbycredentials(req.body.email,req.body.password)
const token = await user.generatetokens()
res.send({user,token})
}catch(e){
res.status(400).send(e)
}
})
router.post("/users/logout",auth, async (req,res)=>{
  try{
 req.user.tokens = req.user.tokens.filter((token)=>{
return token.token !== req.token


 })
 await req.user.save()
 res.send()
  }catch(e){
res.status(500).send()
  }



})

router.post("/users/logoutall",auth,async(req,res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()
    }catch(e){
res.status(500).send()
    }
})





router.post("/users",async(req,res)=>{
    const userop = new User(req.body)
    try{
        await userop.save()
        const token = await userop.generatetokens()
        
        res.status(201).send({userop,token})
    }catch(e){
    res.status(400).send(e)
    }
     
    })
 
        router.patch("/users/me",auth,async(req,res)=>{
            const updates = Object.keys(req.body)
            const allowedupdates=["name","email","password","age"]
            const isvalidoperation = updates.every((update)=>allowedupdates.includes(update))
                if(!isvalidoperation){
                    return res.status(400).send({eror:"invalid updates"})
                }
            
            try{

               updates.forEach((update)=>{
                   req.user[update] =req.body[update]
                
               })
               await req.user.save()
   
       
        res.send(req.user)
            }catch(e){
                res.status(400).send()
            }
        })
router.delete("/users/me",auth,async(req,res)=>{

    try{
      
        await req.user.remove()
        res.send(req.user)

    }catch(e){
        res.status(500).send(e)
    } 







})
module.exports = router