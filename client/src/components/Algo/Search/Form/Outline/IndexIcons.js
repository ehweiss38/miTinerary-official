import React from "react";

const IndexIcons=(props)=>{
    let dots=[]
    for(let i=0;i<props.outline.length-1;i++){
        let dot
        if(i===props.index){
            dot=<i className="fa-solid fa-circle" style={{color:'darkGrey',marginLeft:2,marginRight:2}}></i>
        }else{
            dot=<i className="fa-regular fa-circle" style={{color:'lightGrey',marginLeft:2,marginRight:2}}></i>
        }
        dots.push(dot)
    }
    return(
        <div style={{marginTop:-30}}className="horizontal">
            {dots}
        </div>
    )
}

export default IndexIcons