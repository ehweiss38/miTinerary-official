import React,{useState,useEffect} from 'react';
import {GoogleMap,MarkerF,DirectionsRenderer} from '@react-google-maps/api';


const Map=(props)=>{
    const[markers,setMarkers]=useState(null)
    const [secondaryMarkers,setSecondary]=useState(null)
    const [mapDirs,setMapDirs]=useState(null)


    useEffect(()=>{
        console.log('called')
        const markersArr=props.tripArr.map((place)=>{
            console.log(place)
            return <MarkerF position={{lat:place.latitude,lng:place.longitude}} icon={{scale:6}}key={place.name}/>
        })
        setMarkers(markersArr)
    },[props.tripArr])

    useEffect(()=>{
        console.log('running sec',props.tripArr[props.selected])
        let secMarkersCollection=[]
        if(props.selected===null){
            setSecondary(null)
            return
        }
        if(props.tripArr[props.selected].hotels){
            console.log('hotel')
            const hMarks=[]
            const list=props.tripArr[props.selected].hotels
            for(let hotel in list){
                hMarks.push(<MarkerF position={{lat:list[hotel].latitude,lng:list[hotel].longitude}} icon={{url:'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'}}label={list[hotel].hotel_name}key={list[hotel].hotel_name}/>)
            }
            secMarkersCollection=secMarkersCollection.concat(hMarks)
        }
        if(props.tripArr[props.selected].restaurants){
            const rMarks=[]
            const list=props.tripArr[props.selected].restaurants
            for(let rest in list){
                rMarks.push(<MarkerF position={{lat:parseFloat(list[rest].latitude),lng:parseFloat(list[rest].longitude)}} icon={{url:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} label={list[rest].name}key={list[rest].name}/>)
            }
            secMarkersCollection=secMarkersCollection.concat(rMarks)
        }
        if(props.tripArr[props.selected].attractions){
            const aMarks=[]
            const list=props.tripArr[props.selected].attractions
            for (let attr in list){
                aMarks.push(<MarkerF position={{lat:parseFloat(list[attr].latitude),lng:parseFloat(list[attr].longitude)}} icon={{url:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}} label={list[attr].name}key={list[attr].name}/>)
            }
            secMarkersCollection=secMarkersCollection.concat(aMarks)
        }
        console.log(secMarkersCollection)
        if(secMarkersCollection.length){
            setSecondary(secMarkersCollection)
        }
        return
    },[props.selected])

    useEffect(()=>{
        console.log('called')
        if(props.selected||props.directions){
            return
        }
        //add abort controller
        (async()=>{
            const dirs=[]
            const disDur=[]
            for(let i=0;i<props.tripArr.length-1;i++){
                const dir= new window.google.maps.DirectionsService()
                const result=await dir.route({
                    origin: {lat:props.tripArr[i].latitude,lng:props.tripArr[i].longitude},
                    destination: {lat:props.tripArr[i+1].latitude,lng:props.tripArr[i+1].longitude},
                    travelMode: window.google.maps.TravelMode.DRIVING
                })
                dirs.push(result)
            }
            if(dirs.length===props.tripArr.length-1){
                console.log('dirs to set',dirs)
                props.receiveDirections(dirs)
            }
            return
        })()
    },[])
    useEffect(()=>{
        if(!props.directions){
            return
        }
        const loadedDirections=props.directions?props.directions.map(dir=>{
            return <DirectionsRenderer directions={dir} polylineOptions={{strokeColor: "red",suppressMarkers:true}}/>
        }):''
        setMapDirs(loadedDirections)
    },[props.directions])

    const loadedMarkers=markers?markers:''

    console.log('props',props.directions)
    const loadedDirections=props.directions?props.directions.map(dir=>{
        return <DirectionsRenderer directions={dir} polylineOptions={{strokeColor: "red",suppressMarkers:true}}/>
    }):''
    console.log('loaded',loadedDirections)
    let current=props.selected||props.selected===0?
        {lat:props.tripArr[props.selected].latitude,lng:props.tripArr[props.selected].longitude,zoom:12}:
        {lat:props.tripArr[Math.floor(props.tripArr.length/2)].latitude,lng:props.tripArr[Math.floor(props.tripArr.length/2)].longitude,zoom:props.zoom}
    return(
        <GoogleMap zoom={current.zoom} center={{lat:current.lat,lng:current.lng}} mapContainerClassName="map-container" options={{fullScreenControl:false}}>
            {loadedMarkers}
            {mapDirs}
            {secondaryMarkers}
        </GoogleMap>
    )
}

export default Map