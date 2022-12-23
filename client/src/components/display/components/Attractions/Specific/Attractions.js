import React from "react";

//Produces Attraction info card

const Attractions=(props)=>{
    console.log('Sites',props.attractions)
    //Removes items that are missing info needed for card
    const filtered=props.sites.filter((place)=>{
        return place.photo&&place.name&&place.subtype[0]&&place.location_id
    })
    //Card has button to add to trip/map, and button to fetch trip advisor page
    const display=filtered.map((place)=>{
        const button=props.attractions['attractions'][place.name]?
            <button onClick={()=>{props.remove(place,'attractions')}} className="plus-minus"><i style={{fontSize:23}}className="fa-solid fa-minus has-text-success"></i></button>:
            <button onClick={()=>{props.add(place,'attractions')}} className="plus-minus"><i style={{fontSize:23}}className="fa-solid fa-plus has-text-success"></i></button>
        return(
            <div style={{width:400,height:200,margin:5,position:'relative'}}className="card">
                <div style={{marginTop:2}}className="card-content">
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
                            <p>{place.address_obj.street1+', '+place.address_obj.city}</p>
                            <p>Category:{place.subcategory[0].name}</p>
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

export default Attractions