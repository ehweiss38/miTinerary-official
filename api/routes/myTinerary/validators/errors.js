const {validationResult}=require('express-validator')

//adapted from Stephen grider

module.exports={
    errorHandling(){
        return async(req,res,next)=>{
            console.log('error handling')
            const errors=validationResult(req);

            if (!errors.isEmpty()){
                console.log('error found')
            return res.send(errors.array())
            }

            next();
        }
    }
}