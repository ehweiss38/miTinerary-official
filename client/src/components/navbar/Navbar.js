import React,{useState,useEffect} from "react";
import Portal from "../Portal";
import SignUpControl from "../SignIn/SignUpControl";

const Navbar=(props)=>{
    const [isOn, setOn] = useState(false);


    useEffect(()=>{
        if(isOn){
            xOut()
        }
    },[props.signIn])

    const turnOn=()=>{
        console.log('turned on')
        setOn(true)
        //setCoords({
          //  left: rect.x + rect.width / 3,
            //top:rect.y + window.scrollY,
    }
    //coords={{coords}}

    const xOut=()=>{
        setOn(false)
    }

    const button=props.signIn?
    <a onClick={()=>{props.signedIn(null)}}className="button is-link">Sign Out</a>:
    <a onClick={()=>{turnOn()}}className="button is-link">Sign In</a>

    const signInPage=isOn?
        <Portal >
            <div style={{marginTop:-600}}>
                <SignUpControl signedIn={props.signedIn} xOut={xOut}/>
            </div>
        </Portal>:""



    return(
        <nav className="navbar">
            {signInPage}
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item is-size-3" onClick={()=>{props.returnHome()}}>
                        miTinerary
                    </a>
                    <span className="navbar-burger" data-target="navbarMenuHeroB">
                    <span></span>
                    <span></span>
                    <span></span>
                    </span>
                </div>
                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-end">
                        <a className="navbar-item is-size-4" onClick={()=>{props.setAlgo()}}>
                        Create Trip
                        </a>
                        <a className="navbar-item is-size-4" onClick={()=>{props.setMulti()}}>
                        My Trips
                        </a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-dark">Github</a>
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar