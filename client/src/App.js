import React,{useState,useEffect} from "react";
import Homepage from "./components/homepage/Homepage";
import AlgoHome from "./components/Algo/AlgoHome";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/display/Main";
import Multi from "./components/Multi/Multi"
import Background from './images/background_map.jpeg'
import axios from "axios";
import Router from "./components/Router";
import './css/style.css'

//This is the main component, managing essential state items

function App() {
  //Trip is used throughout the app, so it it managed in App component
  //display determines which component to display
  //signIn determines whether some features are accessible, as well as display of sign in button

  const [trip,setTrip]=useState(null)
  //maybe should move trip id here
  const [display,setDisplay]=useState('home')
  const [signIn,setSignIn]=useState(null)


  /*
  useEffect(()=>{
    (async()=>{
      console.log('making cookie req')
      let status=await axios.get('https://mitinerary-js.herokuapp.com/')
    })()
  },[])
  */

  //when a new trip is selected, either generated or saved, it triggers the switch to display mode
  //The url is changed and a popstate event is triggered to refresh router components
  //Because the routes are simple in this app, with most of the components being in the trip gen. pipeline, I set routes manually
  useEffect(()=>{
    if(trip){
      console.log('trip received')
      console.log(trip)
      window.history.pushState({},'','/display')
      window.dispatchEvent(new Event('popstate'))
    }else{
      return
    }
  },[trip])


  //various navigation triggers, setting display or values that change display
  const returnHome=()=>{
    setDisplay('home')
  }

  const setAlgo=()=>{
    setDisplay('algo')
  }

  const receiveTrip=(tripPlan)=>{
    setTrip(tripPlan)
  }

  const signedIn=(val)=>{
    setSignIn(val)
  }

  const setMulti=()=>{
    setDisplay('multi')
  }


  let current

  //deprecated navigation system
/*
  if(display==='home'){
    current=<Homepage setAlgo={setAlgo}/>
  }else if(display==='algo'){
    current=<AlgoHome receiveTrip={receiveTrip}/>
  }else if(display==='tripDisplay'){
    current=<Main signIn={signIn} trip={trip} receiveTrip={receiveTrip}/>
  }else if(display==='multi'){
    current=<Multi signIn={signIn} receiveTrip={receiveTrip}/>
  }
  */

  //router component displays component if url matches path prop

  //AlgoHome: Process for generating new trip; Main: Refers to main component of trip display; Multi: Displays multiple saved trips 
  return(
    <div style={{backgroundImage:`url(${Background})`,height:750,backgroundSize:1500,backgroundPositionX:0,backgroundPositionY:-220,marginBottom:-10}}>
      <Navbar signedIn={signedIn} signIn={signIn} setMulti={setMulti} setAlgo={setAlgo} returnHome={returnHome}/>
      <Router path='/'>
        <Homepage setAlgo={setAlgo}/>
      </Router>
      <Router path='/algo'>
        <AlgoHome receiveTrip={receiveTrip}/>
      </Router>
      <Router path='/display'>
        <Main signIn={signIn} trip={trip} receiveTrip={receiveTrip}/>
      </Router>
      <Router path='/saved'>
        <Multi signIn={signIn} receiveTrip={receiveTrip}/>
      </Router>
    </div>
  )
}

export default App;
