import React from "react";
import Cities from "./Cities";

const Confirmation=(props)=>{
    //needs a lot of styling work
    const commafy=()=>{

    }
    console.log(props.distance)
    return(
        <div className="card conBox center" >
            <div className="columns confirmation">
                <Cities data={props.data}/>
            </div>
            <h1>Total Distance: {Math.floor(props.distance)} km</h1>
            <div className="container" style={{marginTop:30,marginBottom:30}}>
                <button style={{width:250}}className="button is-primary is-outlined" onClick={()=>{props.pointsConfirmed()}}>Yep, that's right!</button>
                <span style={{padding:20}}></span>
                <button style={{width:250}}className="button is-danger is-outlined" onClick={()=>{props.reloadEndpoints();props.clearState()}}>No, I meant someplace else</button>
            </div>
        </div>
    )
}

export default Confirmation