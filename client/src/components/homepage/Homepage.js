import React from "react";
import Buttons from "./Buttons/Buttons";

class Homepage extends React.Component{
    render(){
        return(
            <section className="hero is-danger">
                <div className="hero-body">
                    <div style={{marginTop:-15}} className="align">
                    <p className="title">
                    miTinerary
                    </p>
                    <p style={{marginTop:8,marginLeft:25}} className="subtitle">
                    Travel off the beaten path
                    </p>
                    </div>
                    <Buttons setAlgo={this.props.setAlgo}/>
                </div>
            </section>

        )
    }
}

export default Homepage