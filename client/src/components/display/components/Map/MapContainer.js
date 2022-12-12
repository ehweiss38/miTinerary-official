import React from 'react'
import {useLoadScript} from '@react-google-maps/api';
import Map from './Map';


const MapContainer=(props)=>{

    const{isLoaded}=useLoadScript({googleMapsApiKey:'AIzaSyCbHVClKTILxFe3bJTShVUWJimPKJRqhyE'})
    console.log('Arr',props.tripArr)

    return(
        isLoaded?<Map selected={props.selected} tripArr={props.tripArr} zoom={props.zoom} receiveDirections={props.receiveDirections} directions={props.directions}/>:<div>Loading...</div>   
    )
}

export default MapContainer