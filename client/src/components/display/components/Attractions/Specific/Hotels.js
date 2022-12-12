import React,{useState} from "react";

const Hotels=(props)=>{
    console.log('hotels',props.hotels)
    //const[hotels,setHotels]=useState({})
    //could maybe be shared between categories
    const filtered=props.hotels.filter((place)=>{
        return place.hotel_id&& place.main_photo_url
    })
    const display=filtered.map((place)=>{
        //needs to update for cat
        console.log('props.attraction',props.attractions)
        //if i switch to saving w/id, have to change here as well
        const button=props.attractions['hotels'][place.hotel_name]?
            <button className="plus-minus" onClick={()=>{props.remove(place,'hotels')}}><i style={{fontSize:23}}className="fa-solid fa-minus has-text-danger"></i></button>:
            <button className="plus-minus" onClick={()=>{props.add(place,'hotels')}}><i style={{fontSize:23}}className="fa-solid fa-plus has-text-danger"></i></button>
        return(
            <div style={{width:400,height:200,margin:5,position:'relative'}}className="card">
                <div className="card-content" style={{marginTop:2}}>
                    <h1 style={{fontSize:15}}>{place.hotel_name}</h1>
                </div>
                <div style={{marginLeft:20,marginBottom:15,position:'absolute'}}className="content align">
                    <div className="card-image">
                        <img style={{height:75,width:75}}src={place.main_photo_url}></img>
                    </div>
                    <div className="align">
                        <div style={{marginLeft:10,marginTop:7}}>
                            <p>Starting at <h3>${place.price_breakdown.gross_price}</h3></p>
                        </div>
                        <div style={{marginLeft:25,marginTop:8}}>
                            <p>City: {place.city_trans}{place.district?`  (${place.district})`:""}</p>
                            <p>Class: {place.class} Stars</p>
                        </div>
                    </div>
                </div>
                <div  style={{marginLeft:350,marginTop:95}}className="align">
                    <a href={place.url} target="new"><i  class="fa-solid fa-globe"></i></a>
                    {button}
                </div>
            </div>
        )
    })
    console.log('display',display)
    return(
        <React.Fragment>
            {display}
        </React.Fragment>
    )
}
export default Hotels