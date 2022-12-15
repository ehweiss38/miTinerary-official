import React from "react";

const Buttons=(props)=>{
    return(
        <div>
            <button style={{padding:15, marginRight:40}}className="button is-danger is-inverted is-outlined"onClick={()=>props.setAlgo()}>Let's go!</button>
        </div>
    )

}
export default Buttons

//<button style={{padding:15}} className="button is-danger is-inverted is-outlined">How does it work?</button>