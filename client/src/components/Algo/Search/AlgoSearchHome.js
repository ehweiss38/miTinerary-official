import React from "react";
import Endpoints from "./Form/Endpoints";
import Confirmation from "./Form/confirmation/Confirmation";
import ExtraCities from "./Form/ExtraCities/ExtraCities";
import Outline from "./Form/Outline/Outline";

class AlgoSearchHome extends React.Component{
    //forgot to pass to distance to confirmation
    state={display:'endpoints',startCity:"",startCountry:"",endCity:"",endCountry:"", stops:"",sState:null,eState:null,missing:false}
    setSearch=(value,targ)=>{
        if(targ==='startCity'){
            this.setState({startCity:value})
        }
        if(targ==='startCountry'){
            this.setState({startCountry:value})
        }
        if(targ==='endCity'){
            this.setState({endCity:value})
        }
        if(targ==='endCountry'){
            this.setState({endCountry:value})
        }
        if(targ==='stops'){
            this.setState({stops:value,missing:false})
        }
        if(targ==='sState'){
            this.setState({sState:value})
        }
        if(targ==='eState'){
            this.setState({eState:value})
        }
    }
    
    endPointSubmit=(e)=>{
        e.preventDefault()
        if(!parseInt(this.state.stops)){
            this.setState({missing:true})
            return
        }
        //dealing w/ states: Pass as 3rd arg?
        let states=""
        if(this.state.sState||this.state.eState){
            if(this.state.sState){
                states+=this.state.sState
            }else{
                states+="0"
            }
            if(this.state.eState){
                states+="_"+this.state.eState
            }
        }


        //!!!!!!error if spelling mistake returns, con screen with 0
        this.props.setValues(this.state.stops,this.state.startCity.trim()+"_"+this.state.startCountry.trim()+"_"+this.state.endCity.trim()+"_"+this.state.endCountry.trim()+"_"+this.state.stops+"_"+states)
        return
        //?
        //feels redundant with setvalues
        //calls function passed from AlgoHome, which makes API Req
    }

    //Dont want this actually useEffect would be better
    //come back to this
    componentDidUpdate(){
        const murica={'USA':1,"US":1,"United States of America":1,"America":1,"United States":1}
        console.log('hi')
        console.log(!!murica[this.state.startCountry])
        if(this.state.sState===null&&murica[this.state.startCountry]){
            this.setState({sState:""})
        }
        if(this.state.eState===null&&murica[this.state.endCountry]){
            this.setState({eState:""})
        }
        if(!murica[this.state.startCountry]&&this.state.sState!==null){
            this.setState({sState:null})
        }
        if(!murica[this.state.endCountry]&&this.state.eState!==null){
            this.setState({eState:null})
        }
        //console.log('did update',this.state.display,this.props.data)
        //console.log(this.props.bad)
        if(this.props.data&&this.state.display==='endpoints'){
            this.setState({display:'confirmation',missing:false})
        }
        if(this.props.outline&&this.state.display==="extra"){
            console.log('outline set')
            this.setState({display:'outline'})
        }
    }
    //some of these might be redundant
    pointsConfirmed=()=>{
        console.log('extra',this.state)
        this.setState({display:'extra'})
    }

    //maybe better way but doing them seperately doesnt require major overhaul

    //another way is to clear props.data after setting confirmation
    //Might be possible but Id like to have that for future
    reloadEndpoints=()=>{
        this.setState({display:'endpoints'})
    }

    render(){
        if(this.state.display==='endpoints'){
            return(
                <Endpoints locations={this.state} setSearch={this.setSearch} endPointSubmit={this.endPointSubmit} bad={this.props.bad} missing={this.state.missing}/>
            )
        }
        if(this.state.display==='confirmation'){
            return(
                <Confirmation distance={this.props.distance} data={this.props.data} pointsConfirmed={this.pointsConfirmed} clearState={this.props.clearState} reloadEndpoints={this.reloadEndpoints}/>
            )
        }
        if(this.state.display==='extra'){
            return(
                <ExtraCities extraStops={this.props.extraStops}stops={parseInt(this.state.stops)}/>
            )
        }
        if(this.state.display==='outline'){
            console.log('outline', this.props.outline)
            return(
                <Outline  launch={this.props.launch} mode={this.props.mode} setMode={this.props.setMode} outline={this.props.outline}/>
            )
        }
        

    }
}

export default AlgoSearchHome