const express = require("express")
const User  =require("../models/user")
const auth =require("../middleware/auth")
const multer =require("multer")
const sharp = require("sharp")
const {sendwelcome,byemail} = require("../emails/account")
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
        sendwelcome(userop.email,userop.name)
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
        byemail(req.user.email,req.user.name)
        res.send(req.user)

    }catch(e){
        res.status(500).send(e)
    } 







})
const upload =multer({
 
    limits:{
        fileSize: 10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb ( new Error("your upload exceeds the size limit of 1mb"))
        }
        cb(undefined,true)
    }
})

router.post("/users/me/avatar",auth,upload.single("avatar"),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
req.user.avatar =  buffer
 
  await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.delete("/users/me/avatar",auth,async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get("/users/:id/avatar",async(req,res)=>{
try{
 const user = await User.findById(req.params.id)
 if(!user|| !user.avatar){
throw new Error()
 }
 res.set("Content-Type","image/png")
 res.send(user.avatar)

 
}catch(e){
    res.status(404).send()
}
})
module.exports = router 