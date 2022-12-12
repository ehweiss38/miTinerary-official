const {check}=require('express-validator')
const User=require('../../../schema/users')
const crypto=require('crypto')
const util=require('util')
const scrypt=util.promisify(crypto.scrypt)

module.exports={
    //used Stephen Grider's validators from Modern JS Bootcamp as reference
    requireUsername:check('username')
        .trim()
        .isLength({min:4,max:15})
        .withMessage('Must be between 4 and 15 characters')
        .custom(async(user)=>{
            console.log('requireUsername')
            const existingUser=await(User.findOne({username:user}))
            if(existingUser){
                console.log('requireUsername error')
                throw new Error("Username already in use")
            }
        }
    ),
    requirePassword:check('password')
        .trim()
        .isLength({min:4,max:15})
        .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation:check('passwordConfirmation')
        .trim() 
        .isLength({min:4, max:15})
        .withMessage('Must be between 4 and 15 characters')
        .custom(async(passwordConfirmation, {req})=>{
            if(passwordConfirmation !== req.body.password){
                throw new Error("Passwords must match")
            }
        }),
    checkUsername:check('username')
        .trim()
        .custom(async(user)=>{
            console.log('Username')
            const existingUser=await(User.findOne({username:user}))
            if(!existingUser){
                console.log('username error')
                throw new Error("Username not found")
            }
        }),
    checkPassword:check('password')
        .trim()
        .custom(async(supplied, {req})=>{
            const existingUser=await(User.findOne({username:req.body.username}))
            const[salt, hashed]=existingUser.password.split('.')
            console.log('hashed')
            console.log('supplied',supplied)
            console.log('salt', salt)
            const newHash=await scrypt(supplied, salt, 64)
            console.log(newHash,hashed)
            if(newHash.toString('hex')!==hashed){
                console.log('password error')
                throw new Error('Passwords do not match')
            }
            
            /*
            const user=await(users.findOne({username: req.body.username}))
            //redundant with above
            if(!user){
                throw new Error('User')
            }
            //how am I going to salt and hash
            const validPassword= await usersRepo.comparePasswords(
                user.password,
                password
            );
            if (!validPassword){
                throw new Error("Invalid Password")
            }
            */
        })

}