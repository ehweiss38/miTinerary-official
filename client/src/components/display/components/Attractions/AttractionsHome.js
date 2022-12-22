import axios from "axios";
import React,{useState} from "react";
import Retrieve from "./Retrieve";

const AttractionsHome=(props)=>{
    console.log(props.loc)
    let activeH=props.loc.hotels?props.loc.hotels:{}
    let activeR=props.loc.restaurants?props.loc.restaurants:{}
    let activeA=props.loc.attractions?props.loc.attractions:{}
    console.log('active a',activeA)
    const[attractions,setAttractions]=useState(
        {hotels:activeH,restaurants:activeR,attractions:activeA}
    )
    const[loading,setLoading]=useState(true)

    let loaded=0

    const loadedTracker=()=>{
        loaded++
        console.log('loaded',loaded)
        if(loaded===3){
            setLoading(false)
        }
        return
    }
    //need error handling
    //saving canbe done with each add and remove with mongo, but want to reduce api calls
    const save=async()=>{
        try{
            let qs=""
            for(let key in attractions){
                if(key==='hotels'){
                    qs+='hotels_'
                }else if(key==='restaurants'){
                    qs+="restaurants_"
                }else if(key==='attractions'){
                    qs+='attractions_'
                }
                console.log(attractions[key])
                for(let place in attractions[key]){
                    console.log(attractions[key][place])
                    if(key==='hotels'){
                        qs=qs+attractions[key][place].hotel_id+"_"
                    }else{
                        qs=qs+attractions[key][place].location_id+"_"
                    }
                }
            }
            const updated=await axios.get(`https://mitinerary-js.herokuapp.com/home/sync/${props.selected}/${qs}`,{withCredentials: true })
            console.log('backend saved')
            console.log('updated',updated.data)
            props.receiveTrip(updated.data)
        }catch{
            console.log('error saving')
        }

    }
    const hideLoaded=!loading?{display:'none'}:{}
    const showLoaded=loading?{display:'none'}:{marginLeft:55}
    //could just put ids instead to improve speed above. Want to wait till i have db set up though before deciding
    const add=(place,category)=>{
        console.log('add called')
        let copy=Object.assign({},attractions)
        copy[category][place.name?place.name:place.hotel_name]=place
        console.log(copy)
        setAttractions(copy)
    }
    const remove=(place,category)=>{
        console.log('remove called')
        let copy=Object.assign({},attractions)
        delete copy[category][place.name?place.name:place.hotel_name]
        setAttractions(copy)
    }
    return(
        <div className="card">
            <a onClick={()=>{props.go(false);save()}} ><i class="fa-solid fa-arrow-left has-text-primary" style={{fontSize:20,marginLeft:15,marginTop:15}}></i></a>
            <div style={hideLoaded}>
                <i class="fa-solid fa-spinner"></i>
            </div>
            <div className="columns" style={showLoaded}>
                <div className="column-one-third">
                    <h1 style={{marginLeft:170}}>Hotels</h1>
                    <div className="dispColumn">
                        <Retrieve type={'hotels'}loc={props.loc} add={add} remove={remove} attractions={attractions} loadedTracker={loadedTracker}/>
                    </div>
                </div>
                <div className="column-one-third">
                    <h1 style={{marginLeft:150}}>Restaurants</h1>
                    <div className="dispColumn">
                        <Retrieve type={'restaurants'} loc={props.loc} add={add} remove={remove} attractions={attractions} loadedTracker={loadedTracker}/>
                    </div>
                </div>
                <div className="column-one-third dispColumn">
                    <h1 style={{marginLeft:150}}>Attractions</h1>
                    <div>
                        <Retrieve type={'attractions'} loc={props.loc} add={add} remove={remove} attractions={attractions} loadedTracker={loadedTracker}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
//Note: Attraction is passed as type because it is needed for api, switches to more succinct attr after

export default AttractionsHome