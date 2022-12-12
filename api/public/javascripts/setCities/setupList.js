const { DLL, Node } = require("./supportClasses/linkedList")

module.exports=(start,stop,distance,stops,mid=null,startMid=null,midEnd=null)=>{
    
    //mid not reciving full info, only coords

    let trip= new DLL()
    trip.push(start)
    trip.push(stop)
    console.log("Trip pre:", trip)
    if(mid){
        trip.insert(1,mid)
    }
    let remainingStops
    if(mid&&stops===0){
        remainingStops=0
    }else if(mid&&stops>=1){
        remainingStops=stops-1
    }else{
        remainingStops=stops
    }
    let curr=trip.start
    if(mid){
        curr.distNext=startMid
        if(remainingStops===1&&startMid>midEnd){
            curr.distStops=0
        }else if(remainingStops===1&&startMid<midEnd){
            curr.distStops=1
            remainingStops=0
        }else{
            curr.distStops=Math.floor(remainingStops/2)
            remainingStops-=curr.distStops
        }
        curr=curr.next
        curr.distNext=midEnd
        curr.distStops=remainingStops
    }else{
        curr.distNext=distance
        curr.distStops=remainingStops
    }
    console.log('trip post:',trip)
    return trip
}