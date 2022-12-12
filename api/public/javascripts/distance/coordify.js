module.exports=(obj)=>{
    let coords=[]
    for(let key in obj){
        coordsObj={}
        coordsObj['latitude']=obj[key]['latitude']
        coordsObj['longitude']=obj[key]['longitude']
        coords.push(coordsObj)
    }    
    return coords
    //need to change because array system is messing up calceDistance
}