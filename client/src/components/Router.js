import {useEffect,useState} from "react"

//inspired by Stephen Grider
const Router=({path,children})=>{
    const[currPath,setPath]=useState(window.location.pathname)
    console.log('mount',currPath)
    useEffect(()=>{
        const locationUpdate=()=>{
            console.log('update',window.location.pathname)
            setPath(window.location.pathname)
        }
        window.addEventListener('popstate',locationUpdate)
        console.log('mountin listener')
        return()=>{
            console.log('removing')
            window.removeEventListener('popstate',locationUpdate)
        }
    },[])
    return currPath===path?children:null
}

export default Router