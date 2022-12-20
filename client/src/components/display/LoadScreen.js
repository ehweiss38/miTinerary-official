import React,{useEffect,useState} from "react";

const LoadScreen=()=>{
    const [message, setMessage]=useState('Loading...')
    useEffect(()=>{
        const none=setTimeout(()=>{
            setMessage(('Plase create a trip in order to view'))
        })
        return()=>clearInterval(none)
    },5000)
}

export default LoadScreen