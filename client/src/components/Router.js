import {useEffect,useState} from "react"

//inspired by Stephen Grider
const Router=({path,children})=>{
    const[currPath,setPath]=useState(window.location.pathname)
    useEffect(()=>{
        const locationUpdate=()=>{
            console.log('update')
            setPath(window.location.pathname)
        }
        window.addEventListener('popstate',locationUpdate)
        return()=>{
            window.removeEventListener('popstate',locationUpdate)
        }
    })
    return currPath===path?children:null
}

export default Router