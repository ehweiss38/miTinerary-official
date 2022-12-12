const express=require('express');
const axios=require("axios")

const attractionsOptions=require("../../public/javascripts/options/attractionsOptions")

let hotels=null
let restaurants=null
let attractions=null


const router=express.Router()

router.get('/:type/:coords',async(req,res)=>{
    const type=req.params.type
    const qs=req.params.coords
    console.log(qs)
    const coords=qs.split('_')
    console.log(coords)
    const listing=await axios.request(attractionsOptions(type,coords))
    console.log(listing)
    if(type==='hotels'){
        hotels=listing.data.result
        res.send(listing.data.result)
    }else if(type==='restaurants'||'attractions'){
        if(type==='restaurants'){
            restaurants=listing.data.data
        }else{
            attractions=listing.data.data
        }
        res.send(listing.data.data)
    }
    return
})

router.get('/share',(req,res)=>{
    console.log(Array.isArray(hotels),Array.isArray(attractions),Array.isArray(restaurants))
    console.log('share called')
    console.log(hotels.length,restaurants.length,attractions.length)
    res.send([hotels,restaurants,attractions])
})


module.exports=router