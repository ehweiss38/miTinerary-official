import React from "react";
import CityDisp from "./CityDisp";
import axios from "axios"

class ExtraCities extends React.Component{
    //annoying to convert obj to arr. I think now the most straightforward approach
    state={stopsSelected:[], cityText:"", countryText:"",stateText:""}

    

    updateText=(val,loc)=>{
        if(loc==='city'){
            this.setState({cityText:val})
        }
        if(loc==="country"){
            this.setState({countryText:val})
        }
    }

    //add variable for constant spacing relative to max number of stops

    addStop=async(e)=>{
        console.log('called',this.state.stopsSelected.length)
        e.preventDefault()
        if(this.state.stopsSelected.length===parseInt(this.props.stops)){
            return
            //add error no more cities
        }
        const found=await this.confirm([this.state.cityText,this.state.countryText,this.state.stopsSelected.length])
        //still have to be validated
        //wont work rn

        //confirm sends back index as string
        if(typeof found==="object"){
            //issue needing to know city name
            //could change whole thing, although some other instances of iterating use key name, although that is changable
            this.setState({stopsSelected:[...this.state.stopsSelected,found.data],cityText:'',countryText:''})
        }
        //add error handling message
        
    }
    shuffle=(i,dir)=>{
        //why isnt this working
        //wtf is up && up1
        console.log('shuffle',dir)
        let copy=this.state.stopsSelected
        //improve edge cases
        console.log(copy)
        if(dir==='up'){
            console.log('up')
            [copy[i],copy[i-1]]=[copy[i-1],copy[i]]
        }else{
            [copy[i],copy[i+1]]=[copy[i+1],copy[i]]
        }
        console.log(copy)
        this.setState({stopsSelected:copy})
    }
    
    //const eState=eState!==null?<input style={{marginLeft:10,width:75}} className="input is-danger" id="startState" type="text" value={props.locations.eState} onChange={(e)=>{props.setSearch(e.target.value,'eState')}} name="endState" placeholder="State"/>:""


    async confirm(valPairs){
        let info
        let qs=valPairs[0].trim()+'_'+valPairs[1].trim()+"_"+valPairs[2]
        try{
           info=await axios.get(`http://localhost:7000/${qs}/extra`)
           console.log('received', info)
        }catch(err){
            info=null
        }
        if(typeof info.data!=='object'){
            info=null
        }
        console.log(info)
        return info
    }
    //will add Search to validate
    //text can extend out
    render(){
        return(
        <div className="card extraBox">
            <div style={{height:150}} className="center">
                <h1 style={{fontSize:25}}>Any specific places you want to stop?</h1>
                <br/>
                <h2 style={{fontSize:23}}>You can add up to <span style={{fontWeight:"bold"}}>{parseInt(this.props.stops)-this.state.stopsSelected.length}</span> stops.</h2>
            </div>
            <br/>
            <CityDisp shuffle={this.shuffle} cities={this.state.stopsSelected}/>
            <div className="center">
                <form action="/" onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="field" style={{marginLeft:-26}}>
                        <label>City</label>
                        <input style={{width:240}} className="input is-danger" id="startpoint" type="text" value={this.state.cityText} onChange={(e)=>{this.updateText(e.target.value,'city')}} name="city" placeholder="City"/>
                        <span style={{padding:5}}></span>
                        <input style={{width:240}} size="50" className="input is-danger" id="startCountry" type="text" value={this.state.countryText} onChange={(e)=>{this.updateText(e.target.value,'country')}} name="country" placeholder="Country"/>
                    </div>
                    <div style={{marginLeft:1}}>
                        <input style={{width:110}}className="button is-primary" type="submit" value="Add to trip" onClick={(e)=>{this.addStop(e)}}/>
                        <span style={{padding:5}}></span>
                        <input style={{width:110}} className="button is-danger" type="submit" value="Confirm trip" onClick={()=>{this.props.extraStops(this.state.stopsSelected)}}/>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}








export default ExtraCities

/*
<div>
        <h2>Your trip will take you ${distance} miles, start to finish!</h2
        <br>
        <br>
        <form method='POST' action="/plan">
            <h3>Before we depart, are there any specific places you want to stop along the way?</h3>
            <input id="startpoint" type="text" value="" name="stopCity"/>
            <input id="startCountry" type="text" value="" name="stopCountry"/>
            <input type="submit" value="Add to itinerary"/>
            <br>
            <h4>Note: Destination must be reasonable in order to be added to itinerary. (Ex. If trip is from Japan to China, stopping in Brazil will not be possible)</h4>
        </form>
    </div>
    */