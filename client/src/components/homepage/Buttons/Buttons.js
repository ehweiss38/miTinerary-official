import React from "react";

const Buttons=(props)=>{
    const changeURL=(e)=>{
        e.preventDefault()
        window.history.pushState({},'','/algo')
        return
    }
    return(
        <div>
            <button onClick={changeURL}style={{padding:15, marginRight:40}}className="button is-danger is-inverted is-outlined">Let's go!</button>
        </div>
    )

}
export default Buttons

//onClick={()=>props.setAlgo()

//<button style={{padding:15}} className="button is-danger is-inverted is-outlined">How does it work?</button>