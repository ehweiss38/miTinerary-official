import React from "react";

const Sidebar=(props)=>{
    const places=props.trip.map((stop,i)=>{
        console.log(i,props.selected)
        const styling=props.selected===i?{color:"red",marginLeft:1.25,marginTop:5,width:455,shadow:5}:{marginTop:5,width:455,marginLeft:1.25}
        const explore=props.selected===i?<button style={{marginLeft:225,marginTop:-15}} onClick={(e)=>props.go(true,e)}>Explore!</button>:""
        const next=props.disDur&&props.disDur[i]?<p>Next stop:  {props.disDur[i][0]} away ({props.disDur[i][1]})</p>:""
        return(
            <div style={styling}onClick={props.selected!==i?()=>props.highlight(i):()=>props.highlight(null)} className="card">
                <div style={{fontSize:20,fontWeight:7}}className="card-content align">
                    <h1 style={{marginTop:-15}}>{i+1}. {stop.name}</h1> {explore}
                </div>
                <div style={{marginLeft:45,marginBottom:5,marginTop:-5}}className="content">
                    <div style={{marginTop:8,marginBottom:5}}>
                        <p>Country: {stop.code}</p>
                        <p>Population: {stop.population}</p>
                        <p>{next}</p>
                        <br></br>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <div>
            <div className="card" style={{width:457.5,backgroundColor:'lightGrey',height:550,overflow:"auto"}}>
                {places}
            </div>
        </div>
    )
}
export default Sidebar