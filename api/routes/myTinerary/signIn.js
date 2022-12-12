const express=require('express')
const crypto=require('crypto')
const {check}=require('express-validator')
const {requireUsername,requirePassword,checkUsername,checkPassword}=require('./validators/validators')
const User=require('../../schema/users');
const util = require('util');
const scrypt=util.promisify(crypto.scrypt);
const {errorHandling}=require('./validators/errors')
const router=express.Router()


let signIn=null

//stephen grider for encryption reference
router.post('/signup',[requireUsername,requirePassword],errorHandling(),
    async(req,res)=>{
        console.log('processing request')
        const username=req.body.username
        const password=req.body.password
        const salt=crypto.randomBytes(8).toString('hex')
        console.log('password',password)
        console.log('salt',salt)
        const hashed=await scrypt(password, salt, 64)
        let newUser=new User({
            username:username,
            password:salt+"."+hashed.toString('hex')
        })
        await newUser.save()
        try{
            const found=await User.findOne({username:username})
            if(found){
                console.log(found)
                console.log("New user created")
                signIn=found
                res.send(found)
                return
            }
        }catch(err){
            console.log(Error,'dberror')
            res.send('db error')
            return
        }
    }
)
router.post('/signin',[checkUsername,checkPassword],errorHandling(),
    async(req,res)=>{
        //potential redundancy
        console.log('processing request')
        try{
            const found=await User.findOne({username:req.body.username})
            if(found){
                //might have to check for pw too, we'll see...
                console.log(`${found.username} signing in`)
                signIn=found
                res.send(found)
                return
            }else{
                console.log('could not find')
            }
        }catch(err){
            console.log('dberror',error)
            return
        }
    }
)
router.get('/validate',(req,res)=>{
    console.log('processing refresh')
    console.log(signIn)
    if(signIn){
        res.send(signIn)
    }else{
        res.send(null)
    }
    return
})

module.exports=router