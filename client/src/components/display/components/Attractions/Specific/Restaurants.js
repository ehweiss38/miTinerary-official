import React from "react";

const Restaurants=(props)=>{
    console.log('called')
    if(!props.restaurants.length){
        return
    }
    const filtered=props.restaurants.filter((place)=>{
        return place.photo&&place.name&&place.cuisine[0]&&place.location_id
    })
    console.log(filtered)
    const display=filtered.map((place)=>{
        const button=props.attractions['restaurants'][place.name]?
            <button className="plus-minus" onClick={()=>{props.remove(place,'restaurants')}}><i style={{fontSize:23}}className="fa-solid fa-minus has-text-info"></i></button>:
            <button className="plus-minus" onClick={()=>{props.add(place,'restaurants')}}><i style={{fontSize:23}}className="fa-solid fa-plus has-text-info"></i></button>
        return(
            <div style={{width:400,height:200,margin:5,position:'relative'}}className="card">
                <div style={{marginTop:2}} className="card-content">
                    <h1>{place.name}</h1>
                </div>
                <div style={{marginLeft:20,marginBottom:11,position:'absolute'}} className="content align">
                    <div className="card-image" style={{position:'absolute'}}>
                        <img style={{height:75,width:75}} src={place.photo.images.thumbnail.url}></img>
                    </div>
                    <div className="align" style={{marginLeft:85}}>
                        <div style={{marginLeft:10,marginTop:20}}>
                            <h3>{Math.floor(parseFloat(place.rating)*10)/10}</h3>
                        </div>
                        <div style={{marginLeft:75,marginTop:-7,width:150}}>
                            <p style={{fontWeight:400,fontColor:"light-grey"}}>{place.price_level}</p>
                            <p>City: {place.address_obj.city}</p>
                            <p>Cuisine: {place.cuisine[0].name}</p>
                        </div>
                    </div>
                    <div  style={{marginLeft:-25,marginTop:90,style:'absolute'}}className="align">
                        <a href={place.web_url} target="new"><i  class="fa-solid fa-globe"></i></a>
                        {button}
                    </div>
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

export default Restaurants