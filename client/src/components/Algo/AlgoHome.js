import React from "react";
import axios from "axios"
import AlgoSearchHome from "./Search/AlgoSearchHome";

class AlgoHome extends React.Component{
    //what does the stops state do? Backup I guess
    state={mid:null,data:null,bad:null,outline:null,stops:0,mode:'eq',missing:false}
    setValues=async(stops,valPairs)=>{
        console.log('submitted')
        console.log(valPairs)
        const req=await axios.get(`https://mitinerary-js.herokuapp.com/home/${valPairs}/confirm`)
        console.log(req)
        if(typeof req.data==="string"||typeof req.data[0]==="string"){
            console.log("bad",req)
            this.setState({bad:req.data[0]?req.data[0]:req.data})
            return
        }else{
            const data=req.data
            console.log(typeof data)
            //need error handling here
            //some redundancy with start/stop & data, but trouble otherwise
            this.setState({stops:parseInt(stops),data:data[0],distance:data[1],bad:null, outline:null})
        }
    }

    setMode=(mode)=>{
        this.setState({mode:mode})
    }
    launchAlgo=async()=>{
        const trip=await axios.get(`https://mitinerary-js.herokuapp.com/home/${this.state.mode}/algoPlan`,{withCredentials: true })
        console.log("this heres the trip",trip.data[0])
        this.props.receiveTrip(trip.data)
        return
    }

    extraStops=async(arr)=>{
        console.log('extrastops called', arr)
        //note: doimg this would eliminate need to check distances for all, hugely reducing runtime but much more likely to cause rejection
        //adjust validity accordingly
        let qs=""
        for(let m of arr){
            qs+=('_'+m.index)
        }
        console.log(qs)
        if(!qs){
            qs+="_"
        }
        //want to set this to app component
        //is ordered even needed?Maybe as back up
        const ordered=await axios.get(`https://mitinerary-js.herokuapp.com/home/${qs}/order`,{withCredentials: true })
        //have to plan first implement as function rather than req 
        console.log("ordered",ordered)
        const trip=await axios.get(`https://mitinerary-js.herokuapp.com/home/plan`,{withCredentials: true })
        //here is the issue: ordered returns the full list

        //have to set up DLL here instead of in other doc

        //const outline=await axios.get()
        this.setState({mid:arr,outline:trip})

        //!!!!: The qs wont be the cities themselves, but rather relative order based on order added
        //Also keeps track of any that were removed


        //checks distance from starting city to each added city
        //orders based on distance
        //checks validity assuming rest of stops are valid
        //if stop is invalid, removes, recalculates validity based on new number of stops
        //once list is calculated, compares total stops to stops used, assigns midpoints accordingly
    }

    clearState=()=>{
        this.setState({mid:null,data:null,distance:null,bad:null})
    }
    render(){
        return(
            <div>
                <AlgoSearchHome launch={this.launchAlgo} mode={this.state.mode} setMode={this.setMode} outline={this.state.outline} data={this.state.data} distance={this.state.distance} setValues={this.setValues} clearState={this.clearState} extraStops={this.extraStops} bad={this.state.bad}/>
            </div>
        )
    }
}
export default AlgoHome