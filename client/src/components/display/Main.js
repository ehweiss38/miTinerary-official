import React,{useState,useEffect} from "react";
import Sidebar from "./components/Sidebar";
import AttractionsHome from "./components/Attractions/AttractionsHome";
import MapContainer from "./components/Map/MapContainer";
import axios from "axios";
const calcDistance=require('./components/calcDistance/calcDistance')

const Main=(props)=>{

    //Selected: highlighted stop; Visit: whether or not to display individual city page
    //Message: Potential error messages; Active trip: Trip being displayed, by id; TripArr: Corresponding trip to id
    //Directions: Routes for Map; MainDisDur: All distances and durations
    const [selected,setSelected]=useState(null)
    const[visit,setVisit]=useState(false)
    const[message,setMessage]=useState('')
    const[activeTrip,setActiveTrip]=useState(null)
    const[tripArr,setTripArr]=useState([])
    const[directions,setDirections]=useState(null)
    const [mainDisDur,setMain]=useState(null)

    //directions take a few moments to load. This stops updates state when they are ready
    useEffect(()=>{
        if(!directions){
            return
        }
        const arr=[]
        for(let dir of directions){
            arr.push([dir.routes[0].legs[0].distance.text,dir.routes[0].legs[0].duration.text])
        }
        setMain(arr)
        return

    },[directions])

    //set trip upon load. Trip id created upon save
    useEffect(()=>{
        console.log('running',props.trip)
        if(Array.isArray(props.trip)){
            setTripArr(props.trip)
        }else{
            setTripArr(props.trip.trip)
            setActiveTrip(props.trip._id)
        }
    },[props.trip])

    //sets backend to correct trip
    useEffect(()=>{
        if(!activeTrip){
            return
        }
        (async()=>{
            const synced=await(axios.get(`https://mitinerary-js.herokuapp.com/home/select/${activeTrip}`,{withCredentials: true }))
            if(synced){
                console.log('backend synced')
                return
            }else{
                console.log('unable to sync')
                //set up view mode
                return
            }
        })()
    },[activeTrip])

    //erases mesage if user signs in
    useEffect(()=>{
        setMessage('')
    },[props.signIn])

    //centers and zooms in if stop is highlighted
    const custZoom=tripArr.length?calcDistance(tripArr[0].latitude,tripArr[tripArr.length-1].latitude,tripArr[0].longitude,tripArr[tripArr.length-1].longitude):8

    console.log('cZ',custZoom)

    //saves trip to mongoose db
    const save=async ()=>{
        //if not signed in, turns you away, sets message
        if(!props.signIn){
            setMessage('To save your trip, please sign in or create an account')
            return
        }
        //if qs is 0, endpoint creates new entry
        let qsTrip=activeTrip?activeTrip:'0'
        const success=await axios.get(`https://mitinerary-js.herokuapp.com/home/tripSave/${props.signIn}/${qsTrip}`,{withCredentials: true })
        if(success.data){
            console.log('successfully saved')
            setActiveTrip(success.data)
            return 
        }else{
            console.log('saving error')
            return
        }
    }

    const highlight=(index)=>{
        setSelected(index)
    }
    const go=(bool,e=false)=>{
        if(e){
            e.stopPropagation()
        }
        console.log(selected,tripArr)
        setVisit(bool)
    }

    const receiveDisDur=(arr)=>{
        setMain(arr)
    }

    const receiveDirections=(arr)=>{
        setDirections(arr)
    }

    const messageDisp=message?
    <h3 className="messagePos" style={{color:'red'}}>{message}</h3>:''


    if(visit){
        console.log(tripArr,selected)
        return(
            <div className="card" style={{margin:50}}>
                <AttractionsHome go={go} loc={tripArr[selected]} selected={selected} receiveTrip={props.receiveTrip}/>
            </div>
        )
    }
    return(
        <div className="card background" style={{marginLeft:50,marginRight:50,marginBottom:10,marginTop:30}}>
            <div className="columns" style={{opacity:1}}>
                <div className="column is-three-fifths">
                    {!tripArr.length?
                    <div>Loading...</div>:
                    <MapContainer selected={selected} tripArr={tripArr} zoom={custZoom} receiveDirections={receiveDirections} directions={directions}/>
                    }
                </div>
                <div className="column is-two-fifths">
                    <Sidebar go={go} selected={selected} trip={tripArr} highlight={highlight} disDur={mainDisDur}/>
                </div>
            </div>
            <button className="button is-primary buttonPos"onClick={(save)} >Save this trip</button>
            {messageDisp}
        </div>
    )
}

export default Main