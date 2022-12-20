import React from "react";

const Link=({href,children})=>{
    changeURL=(e)=>{
        e.preventDefault()
        window.history.pushState({},'',href)
        return
    }

    return(
        <a href={href}>
            {children}
        </a>
    )
}

export default Link