const express=require('express');
const errorCatch=require('./errorCatch')

const axios=require("axios")
const {DLL,Node}=require('../../public/javascripts/setCities/supportClasses/linkedList')

const index=require('../../public/javascripts/index')
const coordify=require('../../public/javascripts/distance/coordify')
const calcDistance=require('../../public/javascripts/distance/calcDistance')
const compare=require('../../public/javascripts/setCities/compare')
const setupList=require('../../public/javascripts/setCities/setupList')
const plan=require('../../public/javascripts/setCities/planTrip/plan');
const setPair=require('../setPair')
const tripNaming=require('../routeHelpers/tripNaming/tripNaming')


const User=require('../../schema/users')
const Trip=require('../../schema/trip')

const router=express.Router()

//some redundancy here methinks
let foundCities
let miles
let stops
let coords
let start
let end
let startObj
let endObj
let distanceUse
let tripN
let ordered=[]
let mid=[]
let ready=[]

router.get("/", (req, res)=>{
    console.log('howdy')
    res.send('finally')
    return
})
router.get("/:vals/:states/confirm",async(req,res)=>{
    mid=[]
    ordered=[]
    ready=[]
    console.log(mid,ordered)
    console.log('confirm is running')
    console.log(req.params.vals)
    const queryString=req.params.vals
    let queryArr=queryString.split("_")
    let startCity=queryArr[0]
    let startCountry=queryArr[1]
    let endCity=queryArr[2]
    let endCountry=queryArr[3]
    let stopsReq=queryArr[4]
    let sState=null
    let eState=null
    console.log('queryArr',queryArr)
    if(queryArr[5]){
        console.log('que')
        if(queryArr[5]!=="0"){
            sState=queryArr[5]
        }
        if(queryArr[6]){
            eState=queryArr[6]
        }
    }
    let start=startCity
    let sC=errorCatch(startCountry)
    console.log(sC)
    //add cap check to error check
    end=endCity
    let eC=errorCatch(endCountry)
    if(stopsReq){
        stops=stopsReq //save to database
    }else{
        stops=0
    }
    //onsole.log(sC,eC)
    foundCities=await index([sC,eC],[start,end],[sState,eState]) 
    console.log('start:',start,"end:",end)   
    console.log('found',foundCities)
    if(typeof foundCities==='number'){
        res.send(""+foundCities)
        return
    }
    console.log(foundCities[start],foundCities[end])
    startObj=foundCities[start]
    endObj=foundCities[end]
    console.log(startObj,endObj)
    console.log('post IDX')
    distanceUse=advInfo(foundCities)
    console.log('adv complete')
    res.send(
        [foundCities,distanceUse]
    )
})
router.get("/:extraCities/extra",async(req,res)=>{
    //could be written as reuable but idk if it is even worth it
    console.log('extraaaa',req.params.extraCities)
    const queryString=req.params.extraCities
    //need to account for multiword countries
    let queryArr=queryString.split("_")
    let city=queryArr[0]
    let country=errorCatch(queryArr[1])
    let id=queryArr[2]
    let eState=null
    if(queryArr[3]){
        eState=queryArr[3]
    }
    if(!city||!country){
        return
    }
    let info=await index([country],[city],[eState],id)
    mid.push(info)
    console.log('here is info',info)
    console.log('mid',mid)
    res.send(
        info
    )
})

const advInfo=(foundCities)=>{
    console.log(foundCities)
    coords=coordify(foundCities)
    km=calcDistance(coords)
    return km
}
router.get("/calc/:foundCities",async(req,res)=>{
    const foundCities=req.params.foundCities
    coords=coordify(foundCities)
    //data goes into database as node list
    return miles=calcDistance(coords)
    //console.log(miles)
    //res.send(distance(miles))
})


//to work with multiple cities, has to sort by distance from first city. Also, has to adjust validity measures accordingly

router.get("/:qs/order", async(req,res)=>{
    const qs=req.params.qs
    console.log('received extra stops')
    console.log('mid',mid)
    console.log(qs,qs.length)
    let i=0
    let curr=""
    let pos=[]
    while(i<qs.length){
        console.log(qs[i])
        while(qs[i]!=="_"&&qs[i]){
            curr+=qs[i]
            i++
        }
        if(curr.length){
            pos.push(parseInt(curr))
            curr=""
        }
        i++
    }
    console.log('pos',pos)
    ordered.push(startObj)
    //start is undefined, idk why. WIll push objects instead, but i still want to know
    console.log('ordered',ordered)
    for(let p of pos){
        console.log(p)
        ordered.push(mid[p])
    }
    ordered.push(endObj)
    console.log("ordered:",ordered)
    res.send(ordered)
})


router.get("/plan",async(req,res)=>{
    
    //console.log('plan started')

    //takes mid arr, arranges based on qs
    //iterates through and coordifies, places in order in  middle of coords arr


    //logic is outdated, everything already checked

    //decent place for a heap
    let avStops=stops-(ordered.length-2)
    tripN=new DLL()
    const prepped=[]

    let assignStops=[]

    for(let i=0;i<ordered.length-1;i++){
        const coords=coordify({1:ordered[i],2:ordered[i+1]})
        console.log(coords)
        let stopDistance=calcDistance([coords[0],coords[1]])
        console.log(stopDistance)
        ordered[i].distanceNext=stopDistance
        prepped.push(ordered[i])
        //distance,index,stops
        assignStops.push([stopDistance,i,0])
    }
    prepped.push(ordered[ordered.length-1])
    assignStops.sort((a,b)=>{
        return b[0]-a[0]
    })
    console.log('avStops',avStops)
    console.log('assignStops',assignStops)
    let i=0
    if(assignStops.length===1){
        assignStops[i][2]=avStops
        avStops=0
    }
    while(avStops){
        let curr=assignStops[i]
        let tempDistance=curr[0]
        let assigned=0
        let it=1
        let nI=i===assignStops.length-1?0:i+1
        let nextDist=assignStops[nI][0]
        //This seems most correct
        //Slight error in that by only comparing to next one, might be underassigning
        //worth looking into, maybe compare to shortest dist instead
        while(assigned===0||(tempDistance*(it/(it+1))>=nextDist/2&&avStops)){
            console.log('in math')
            curr.distStops?curr.distStops++:curr.distStops=1
            avStops--
            tempDistance*=(it/(it+1))
            assigned++
        }
        console.log('replacement',assignStops[i][2],assigned)
        assignStops[i][2]=assigned

        if(!avStops){
            break
        }
        i=nI
    }
    console.log('assign stops',assignStops)
    for(let stop of assignStops){
        prepped[stop[1]].distStops=stop[2]
    }
    //possible redundancy
    for(let stop of prepped){
        tripN.push(stop)
    }
    console.log(prepped,tripN)

    //because slice returns a shallow copy, it will not update accordingly 
    //have it provide vinstructions about where to allocatr stops, then update

    /*
    for(let stop of prepped){
        trip.push(stop)
    }
    console.log(trip)
*/
    console.log('sending')
    res.send(prepped)
})


//no longer nodes!!!
router.get("/:mode/algoPlan",async (req,res)=>{
    const mode=req.params.mode
    console.log("using:",tripN, mode)
    const trip=await plan(tripN,mode)
    console.log("trip prepared:", trip)
    let node=trip.start
    while(node){
        console.log(node)
        ready.push(node.val)
        node=node.next
    }
    console.log(ready)
    res.send(ready)

})

router.get('/sync/:index/:qs',async(req,res)=>{
    //this can be done much faster
    console.log('sync called')
    const index=parseInt(req.params.index)
    const qs=req.params.qs
    const arr=qs.split('_')
    let hotelsArr=[]
    let restaurantsArr=[]
    let attractionsArr=[]
    let curr=null
    for(let i=0;i<arr.length;i++){
        if(!parseInt(arr[i])){
            curr=arr[i]
            continue
        }
        if(curr==='hotels'){
            hotelsArr.push(arr[i])
        }else if(curr==="restaurants"){
            restaurantsArr.push(arr[i])
        }else if(curr==='attractions'){
            attractionsArr.push(arr[i])
        }
    }
    console.log(hotelsArr)
    for(let arr of [hotelsArr,restaurantsArr,attractionsArr]){
        arr.sort((a,b)=>{
            return a-b
        })
    }
    const active=ready[index]
    const retrieved=await axios.get('http://localhost:7000/attractions/share')
    console.log('retrieved',retrieved.data.length)
    //need to iprove fault tolerance

    //potentially faster to not sort(would need to change add implementation)
    const rHotels=retrieved.data[0]?retrieved.data[0].sort((a,b)=>{
        return a.hotel_id-b.hotel_id
    }):null
    const rRestaurants=retrieved.data[1]?retrieved.data[1].sort((a,b)=>{
        return a.location_id-b.location_id
    }):null
    const rAttractions=retrieved.data[2]?retrieved.data[2].sort((a,b)=>{
        return a.location_id-b.location_id
    }):null
    let sets=[['hotels',[hotelsArr,rHotels]],['restaurants',[restaurantsArr,rRestaurants]],
        ['attractions',[attractionsArr,rAttractions]]]
    console.log('boutta set')

    //corner case error where hotel can dissapear from suggested list
    //in that case,it should be removed from trip plan

    for(let set of sets){
        let type=set[0]
        let pair=set[1]
        if(!pair[0].length||!pair[1]){
            continue
        }
        active[type]=setPair(pair,type==='hotels')
    }
    console.log(active)
    console.log(ready.length)
    res.send(ready)

})

router.get("/tripSave/:id/:tripId",async(req,res)=>{
    console.log('trip save')
    const userID=req.params.id
    const tripId=req.params.tripId
    console.log(userID,tripId)
    if(tripId==='0'){
        console.log('new path')
        let name=ready[0].name+" -> "+ready[ready.length-1].name

        name=await tripNaming(name,userID)

        console.log('name generated')
        //conTrip.findOne({name:name,userId:userID})

        const newTrip=new Trip({
            name: name,
            length:ready.length,
            trip:ready,
            userId:userID
        })
        await newTrip.save()
        const created=await Trip.findOne({name:name,userId:userID})
        console.log(created._id)
        res.send(created._id)
    }else{
        console.log('update path')
        await Trip.updateOne({_id:tripId},{trip:ready})
        const updated=await Trip.findOne({_id:tripId})
        console.log(updated.trip)
        res.send(tripId)
    }
    return

})

router.get('/select/:id',async(req,res)=>{
    console.log("Trip find")
    const tripId=req.params.id
    const trip=await Trip.findOne({_id:tripId})
    console.log('trip',trip)
    ready=trip.trip
    console.log('ready',ready,"should match")
    res.send(true)
    return
})



module.exports=router



/*if(req.body.stopCity){
        const stopCity=req.body.stopCity
        const stopCountry=req.body.stopCountry
        let stopCheck=await index([stopCountry],[stopCity])
        const stopCoords=coordify(stopCheck,stopCity)
        let stopDistance=calcDistance([coords[0],stopCoords[0]])
        //console.log(stopCoords)
        //needs if logic
        //stopCoords[0] is temporary solution





        //idea: iterate through, change start mid, keep
        let startMid=calcDistance([coords[0],stopCoords[0]])
        let midEnd=calcDistance([stopCoords[0],coords[1]])
        //console.log(startMid,midEnd)
        let valid=compare(miles,startMid,midEnd)
        if(valid){
            //have to edit slightly if denesting objects
            tripOutline=setupList(foundCities[start],foundCities[end],miles,stops,stopCheck[stopCity],startMid,midEnd)
        }
    }else{
        tripOutline=setupList(foundCities[start],foundCities[end],miles,stops)
    }
    */