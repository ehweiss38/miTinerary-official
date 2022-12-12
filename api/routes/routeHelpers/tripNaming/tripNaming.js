const Trip=require('../../../schema/trip')

module.exports=async(name,userID)=>{
    let clear=false
    let newName=name
    while(!clear){
        const found=await Trip.findOne({userId:userID,name:name})
        if(found){
            if(parseInt(found.name[found.name.length-1])){
                newName=newName.slice(0,-1)+(parseInt(found.name[found.name.length-1])+1)
            }else{
                newName=newName+=" #2"
            }
        }else{
            clear=true
        }
    }
    return newName
}