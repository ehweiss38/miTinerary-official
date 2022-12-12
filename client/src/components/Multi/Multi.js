import React,{useEffect,useState} from "react";
import axios from "axios";

const Multi=(props)=>{
    const[savedTrips,setSaved]=useState([])
    useEffect(()=>{
        if(!props.signIn){
            return
        }
        let controller=new AbortController();
        (async()=>{
            console.log('running')
            const saved=await axios.get((`http://localhost:7000/saved/trips/${props.signIn}`))
            console.log('multi response',saved.data)
            controller=null
            setSaved(saved.data)
        })()
        return()=>{
            controller?.abort()
        }
    },[props.signIn])
    let content
    if(savedTrips.length>1){
        console.log('length')
        const trips=savedTrips.map((trip)=>{
            return(
                <div className="card" onClick={()=>{props.receiveTrip(trip)}}>
                    <div style={{fontSize:20,fontWeight:7}}className="card-content align">
                        <h1 style={{marginTop:-15}}>{trip.name}</h1> 
                    </div>
                    <div style={{marginLeft:45,marginBottom:5,marginTop:-5}}className="content">
                        <div className="align" style={{marginTop:8,marginBottom:5}}>
                            <p>Start: {trip.trip[0].name}</p>
                            <span style={{width:50}}></span>
                            <p>End: {trip.trip[trip.trip.length-1].name}</p>
                            <span style={{width:50}}></span>
                            <p>Length:{trip.length} Stops</p>
                            <br></br>
                        </div>
                    </div>
                </div>
            )
        })
        content=(
        <div className="card" style={{backgroundColor:'lightGrey',height:550,marginLeft:20,marginRight:20}}>
            {trips}
        </div>
        )
    }else{
        console.log('no trips path')
        content=(
            <div className="card center" style={{backgroundColor:'lightGrey',height:550,marginLeft:20,marginRight:20}}>
                <div style={{marginTop:20,width:930,marginLeft:16,height:400}}className="card center">
                    <h1>{props.signIn?'You do not have any saved trips':'Please sign in or create account'}</h1>
                </div>
            </div>
    
        )
    }

    return(
        <div className="card" style={{marginTop:60,marginLeft:220,width:1000,height:550}}>
            {content}
        </div>
    )
}

export default Multi