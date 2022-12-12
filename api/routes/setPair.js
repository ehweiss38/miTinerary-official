module.exports=([ids,list],hotels)=>{
    console.log('set called')
    console.log(list.length,hotels)
    let obj={}
    let l=0
    let r=0
    while(l<ids.length){
        console.log('l',l)
        console.log('r',r)
        if(hotels){
            if(parseInt(ids[l])===list[r].hotel_id){
                obj[list[r].hotel_name]=list[r]
                l++
            }
        }else{
            if(ids[l]===list[r].location_id){
                obj[list[r].name]=list[r]
                l++
            }
        }
        r++
        if(r===list.length&&l<ids.length){
            l++
            r=0
        }
    }
    console.log('found')
    return obj
}