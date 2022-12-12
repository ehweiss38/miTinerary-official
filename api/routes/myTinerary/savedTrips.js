const express=require('express')
const Trip=require('../../schema/trip')

const router=express.Router()

router.get('/trips/:user',async(req,res)=>{
    const id=req.params.user
    const saved=await Trip.find({userId:id},null,{limit:10})
    console.log('saved',saved)
    res.send(saved)
})


module.exports=router