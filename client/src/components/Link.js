import React from "react";

const Link=({href,children})=>{
    const changeURL=(e)=>{
        e.preventDefault()
        window.history.pushState({},'',href)
        window.dispatchEvent(new Event('popstate'))
        return
    }

    return(
        <a className="navbar-item is-size-4" href={href} onClick={changeURL}>
            {children}
        </a>
    )
}

export default Link