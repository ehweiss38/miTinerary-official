import React from "react";

const Endpoints=(props)=>{

    const missing=()=>{
        if(props.missing){
            return <h3 style={{color:'red'}}>Please enter a non-zero number</h3>
        }
    }
    const sState=props.locations.sState!==null?<input style={{marginLeft:380,marginTop:8,width:65,position:'absolute'}} className="input is-danger" id="startState" type="text" value={props.locations.sState} onChange={(e)=>{props.setSearch(e.target.value,'sState')}} name="startState" placeholder="State"/>:""
    const eState=props.locations.eState!==null?<input style={{marginLeft:380,marginTop:8,width:65,position:'absolute'}} className="input is-danger" id="startState" type="text" value={props.locations.eState} onChange={(e)=>{props.setSearch(e.target.value,'eState')}} name="endState" placeholder="State"/>:""
    const msg=(val)=>{
        return props.bad&&props.bad===val?<h3 style={{color:'red',marginLeft:-45,marginTop:8}}>Sorry, city not found</h3>:""
    }
    return(
        <React.Fragment>
            <div className="card cardS" >
                <div className="card-content card-contentS">
                    <form action="/" onSubmit={props.endPointSubmit}  style={{marginLeft:17}}>
                        <div className="center" style={{marginLeft:-35, marginBottom:15}}>
                            <h1 className="headedText">Step 1. Enter your Starting and Ending Cities</h1>
                        </div>
                        <label>Starting City   </label>
                        <div className="field endField" style={{height:37}}>
                            <input style={{width:250}} className="input is-danger" id="startpoint" type="text" value={props.locations.startCity} onChange={(e)=>{props.setSearch(e.target.value,'startCity')}} name="startpoint" placeholder="Starting City"/>
                            <span style={{padding:5}}></span>
                            <input style={{width:250}} size="50" className="input is-danger" id="startCountry" type="text" value={props.locations.startCountry} onChange={(e)=>{props.setSearch(e.target.value,'startCountry')}} name="startCountry" placeholder="Starting Country"/>
                            <div className='horizontal'>
                                {msg('0')}
                                {sState}
                            </div>
                        </div>
                        <br/>
                        <label>Ending City</label>
                        <div className="field endField" style={{height:37}}>
                            <input style={{width:250}} className="input is-danger" id="endpoint" type="text" value={props.locations.endCity} onChange={(e)=>{props.setSearch(e.target.value,'endCity')}} name="endpoint" placeholder="Ending City"/>
                            <span style={{padding:5}}></span>
                            <input style={{width:250}} className="input is-danger" id="endCountry" type="text"value={props.locations.endCountry} onChange={(e)=>{props.setSearch(e.target.value,'endCountry')}} name="endCountry" placeholder="Ending Country"/>
                            <div className='horizontal'>
                            {msg('1')}
                            {eState}
                            </div>
                        </div>
                        <br/>
                        <div className="field" style={{width:185}}>
                            <label for="stops">Desired Stops</label>
                            
                            <input style={{width:185}} className="input is-danger"type="text" name="stops" value={props.locations.stops} onChange={(e)=>{props.setSearch(e.target.value,'stops')}}/>
                            {missing()}
                        </div>
                        <br/>
                        <input className="button is-primary center endpointsButton" type="submit" value="Let's Go!" onClick={(e)=>{props.endPointSubmit(e)}} />
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Endpoints
