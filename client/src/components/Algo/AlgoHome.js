import React from "react";
import axios from "axios"
import AlgoSearchHome from "./Search/AlgoSearchHome";

//This is main component for algorithm related components, controlling user input components so as to collect necessaary info

class AlgoHome extends React.Component{
    //what does the stops state do? Backup I guess
    state={mid:null,data:null,bad:null,outline:null,stops:0,mode:'eq',missing:false}

    //When user submits endpoints, it sends a request to REST api to ensure submitted cities are real places

    //valpairs refers to query string (ex. city1_country1_city2_country2) created in algo search home, however it is submitted here to have data centralized in main component
    setValues=async(stops,valPairs)=>{
        console.log('submitted')
        console.log(valPairs)
        const req=await axios.get(`https://mitinerary-js.herokuapp.com/home/home/${valPairs}/confirm`, {withCredentials:true,credentials: 'include'})
        console.log(req)
        //If it runs correctly, it sends back an array of objects. If error, it sends back city that produced error as string
        if(typeof req.data==="string"||typeof req.data[0]==="string"){
            console.log("bad",req)
            //uses location of error to determine which city produced error
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

    //mode refers to option to generate cities according to distance or according to size
    setMode=(mode)=>{
        this.setState({mode:mode})
    }
    //sends go ahead to run algo on backend. Backend has copy of trip which it uses, so dont have to send
    launchAlgo=async()=>{
        const trip=await axios.get(`https://mitinerary-js.herokuapp.com/home/${this.state.mode}/algoPlan`,{withCredentials: true,credentials: 'include'})
        console.log("this heres the trip",trip.data[0])
        this.props.receiveTrip(trip.data)
        return
    }

    //Users can predetermine as many stops as they wish, up to the whole trip
    //This function takes those added stops and inserts them between existing stops
    extraStops=async(arr)=>{
        console.log('extrastops called', arr)
        let qs=""
        for(let m of arr){
            qs+=('_'+m.index)
        }
        console.log(qs)
        if(!qs){
            qs+="_"
        }
        //Rearranges stops in the event user changed their order. Informs backend of order on front end
        const ordered=await axios.get(`https://mitinerary-js.herokuapp.com/home/${qs}/order`,{withCredentials: true,credentials: 'include'})
        //have to plan first implement as function rather than req 
        console.log("ordered",ordered)
        //Tells back end to create a doubly linked list, each node containing info on how far until next pre-determined stop, and how many stops it will make before then
        const trip=await axios.get(`https://mitinerary-js.herokuapp.com/home/plan`,{withCredentials: true,credentials: 'include'})

        /*BASIC OUTLINE OF PLAN:
            checks distance from starting city to each added city
            orders based on distance
            once list is calculated, compares total stops to stops used, assigns midpoints accordingly*/

        //Resets the mid arr to reflect updated order, outline serves as sketch of stops so far
        this.setState({mid:arr,outline:trip})

        //!!!!: The qs wont be the cities themselves, but rather relative order based on order added
        //Also keeps track of any that were removed

    }

    //Going back reinitializes component
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