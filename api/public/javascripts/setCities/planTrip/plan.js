const nearbyCities=require("../../options/nearbyCities")
const calcDistance=require("../../distance/calcDistance")
const compare=require('../compare')
const axios=require('axios')
const valPrep=require("./helpers/valPrep")


module.exports=async(outline,mode)=>{
    //potential chance nodeList wont modify in place. In that case, make and return a copy

    //the issue is that the api can only search within a radius of 500(km?). The solution is to find the city closest to 500 km with smallest detour,
    //and search again from there 

    //mediary gets there but never switches to selection
    console.log("FROM THE TOP")
    let node=outline.start
    let index=0
    let mediary=null
    let mediaryDistance=null
    let runningDistance=null
    let largest=mode==="lg"?true:false
    while(node.next){
        if(node.val.distStops){
            let minPop=null
            console.log("THIS IS THE NODE:",node)
            let possibleStops=null
            let selected=null
            let sorted
            let mode='selection'
            let idealDistance
            let detour=null
            let use=null
            let useDistance=null
            if(mediary){
                useDistance=mediaryDistance
                //removed ideal distance set
                use=mediary
                console.log("USE SET", use)
                mediary=mediaryDistance=null
                console.log('mediary/ideal',idealDistance)
            }
            //ideal never resets relative to mediary
            console.log(node.val.name,node.val.distanceNext,node.val.distStops,idealDistance)
            idealDistance=node.val.distanceNext/(parseInt(node.val.distStops)+1)
            console.log("IDEAL",idealDistance)
            if(use){
            console.log('distance from',idealDistance-calcDistance([{latitude:node.val.latitude,longitude:node.val.longitude},{latitude:use.latitude,longitude:use.longitude}]))
            }
            if(use&&idealDistance-calcDistance([{latitude:node.val.latitude,longitude:node.val.longitude},{latitude:use.latitude,longitude:use.longitude}])<500){
                //ideal distance never changes right now
                //Idealdistance-distance(mediary,start)>500
                console.log('ideal pre',idealDistance)
                idealDistance=Math.abs(idealDistance-calcDistance([{latitude:node.val.latitude,longitude:node.val.longitude},{latitude:use.latitude,longitude:use.longitude}]))
                console.log('ideal post',idealDistance)
                console.log("Mediary broken")
            }else if(idealDistance>500){
                mode='mediary'
                if(!runningDistance) runningDistance=node.val.distanceNext
                console.log('running')
            }
            while(!selected&&!mediary){
                console.log('new search')
                if(minPop===null){
                    minPop=125000
                }else if(minPop>25000){
                    minPop*=.8
                }else{
                    return "Couldnt find valid city"
                }
                console.log('minPop',minPop)
                console.log("Ideal Distance:", idealDistance)
                //add max pop so it doesnt fill up with same cities

                //idk if this is 
                console.log("mode",mode)
                console.log("USE Check", use)
                if(!use){
                    use=node.val
                }

                //

                let data=await axios.request(nearbyCities(use.latitude,use.longitude,idealDistance,minPop))
                console.log('coords used', use.latitude,use.longitude)
                console.log("number of results",data.data.total_cities)
                possibleStops=data.data.cities
                sorted=possibleStops.sort((a,b)=>{
                    return b.population-a.population
                })  //potentially need variable to catch this
                //console.log("Sorted:",sorted)
                let j=0
                let smallest=null
                let smallestD=null
                let sDetour=null
                while(!selected&&j<sorted.length){
                    let tempDistance=calcDistance([{latitude:use.latitude,longitude:use.longitude},{latitude:sorted[j].latitude,longitude:sorted[j].longitude}])
                    detour=calcDistance([{latitude:sorted[j].latitude,longitude:sorted[j].longitude},{latitude:node.next.val.latitude,longitude:node.next.val.longitude}])
                    //would prefer to have this at .75 but need backtracking code if i want to be so selective
                    if(mode==="selection"&&tempDistance>.75*idealDistance&&detour<1.35*(node.val.distanceNext-tempDistance)){
                        //using temp distance privileges distance away over how well it follows
                        //switching to detour .85 couldnt even get one stop, will come back later
                        //*above line based on incorrect assumption that detour should equal temp distance, need to account fo rnumber of stops
                        console.log('selection route')
                        mediary=null
                        mediaryDistance=null
                        smallest=null
                        smallestD=null
                        sDetour=null
                        runningDistance=null
                        if(!useDistance) useDistance=node.val.distanceNext
                        if(compare(useDistance,tempDistance,detour)) selected=sorted[j]
                    }
                    //redundancy rather than using if else
                    if(mode==='mediary'){
                        console.log('Mediary Route')
                        //it is not taking the distance already travewlled into consideration
                        /*
                        let smallest
                        let smallestD
                        */

                        //add use selector to allow it to accomodate successive mediaries
                        console.log(runningDistance,detour)
                        //has to do with running distance
                        if(!smallest&&detour<runningDistance){
                            //issue with running distance, not necessarilly linear in remote cases
                            //
                            smallest=j
                            smallestD=Math.abs(tempDistance+detour-node.val.distanceNext)
                            sDetour=detour
                            console.log("INIT SMALLEST",sorted[j])
                            //not getting any matches for smallest; probably some stuff here that can go
                        }else if(Math.abs(tempDistance+detour-node.val.distanceNext)<smallestD&&detour<runningDistance&&detour<sDetour&&sorted[j].name!==node.val.name){
                            smallest=j
                            smallestD=Math.abs(tempDistance+detour-node.val.distanceNext)
                            sDetour=detour
                            console.log("New smallest",sorted[smallest])
                        }
                        if(j===sorted.length-1){
                            console.log('last j')
                            mediary=sorted[smallest]
                            if(sDetour){
                                mediaryDistance=sDetour
                                runningDistance=sDetour
                            }
                        }
                    }
                    j++
                }
            }
            if(selected){
                console.log("SELECTED:",selected)
                let larger
                if(largest){
                    larger=await axios.request(nearbyCities(selected.latitude,selected.longitude,150,75000))
                    larger=larger.data.cities.sort((a,b)=>{
                        return b.population-a.population
                    })
                    for(let i=0;i<larger.length;i++){
                        /*if(sameCountry){
                            //if(larger[i].country!==useCountry)
                            continuexf
                        }*/
                        if(selected.population>larger[i].population)break
                        selected=larger[i]
                        break
                    }
                    console.log('selected',selected,'node.next',node.next)
                    detour=calcDistance([{latitude:selected.latitude,longitude:selected.longitude},{latitude:node.next.val.latitude,longitude:node.next.val.longitude}])
                }
                let valObj=valPrep(selected.geonameid,selected.country.code,selected.name,selected.population,selected.latitude,selected.longitude)
                console.log('INDEX:',outline.length,index)
                outline.insert(index+1,valObj)
                index++
                let prev= node
                node=node.next
                node.val.distStops=prev.val.distStops-1
                node.val.distanceNext=detour
            }
        }else{
            node=node.next
            index++
        }
    }
    console.log('TRIP:')
    let disp=outline.start
    let ct=1
    while(disp){
        console.log(ct,disp.val.name,disp.val.distanceNext,disp.val.distStops)
        ct++
        disp=disp.next
    }
    return outline
}