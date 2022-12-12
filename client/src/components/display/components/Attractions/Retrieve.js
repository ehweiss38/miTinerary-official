import React,{useEffect,useState} from "react";
import axios from "axios";
import Hotels from "./Specific/Hotels";
import Restaurants from "./Specific/Restaurants";
import Attractions from "./Specific/Attractions";

const Retrieve=(props)=>{
    const[list,setList]=useState(null)
    console.log('render',props.type)
    useEffect(()=>{
        let controller=new AbortController();
        (async()=>{
            console.log('running')
            const qs=props.loc['latitude']+"_"+props.loc['longitude']
            console.log('search')
            const response=await axios.get((`http://localhost:7000/attractions/${props.type}/${qs}`))
            console.log('response')
            controller=null
            setList(response.data)
        })()
        return()=>{
            controller?.abort()
        }
    },[])
    
    useEffect(()=>{
        if(!list){
            return
        }
        props.loadedTracker()
        return

    },[list])
    
    let comp
    if(!list){
        comp=""
    }
    else if(props.type==='hotels'){
        comp=<Hotels hotels={list} add={props.add} remove={props.remove} attractions={props.attractions}/>
    }else if(props.type==='restaurants'){
        comp=<Restaurants restaurants={list} add={props.add} remove={props.remove} attractions={props.attractions}/>
    }else if(props.type==='attractions'){
        comp=<Attractions sites={list} add={props.add} remove={props.remove} attractions={props.attractions}/>
    }
    return(
        <React.Fragment>
            {comp}
        </React.Fragment>
    )
}
export default Retrieve