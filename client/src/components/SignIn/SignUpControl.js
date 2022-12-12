import React,{useState}from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const SignUpControl=(props)=>{
    const[screen,setScreen]=useState('in')// takes current button coordinates

    const switchScreen=()=>{
        screen==='in'?setScreen('up'):setScreen('in')
    }

    const selected=screen==='in'?<SignIn signedIn={props.signedIn} xOut={props.xOut}/>:<SignUp signedIn={props.signedIn} xOut={props.xOut}/>
    
    const message=screen==='in'?'Not a member? Create an account...':"I have an account..."

    return(
        <div className="card cardS signIn" >
            <div className="card-content card-contentS center">
            <a onClick={()=>{props.xOut()}}style={{marginLeft:365,marginRight:45,position:"absolute"}}><i class="fa-solid fa-x"></i></a>
                {selected}
            </div>
            <a className="center" onClick={()=>{switchScreen()}}>{message}</a>
        </div>
    )
}

export default SignUpControl