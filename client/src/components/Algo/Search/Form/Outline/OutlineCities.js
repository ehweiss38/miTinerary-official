import React from "react";

const OutlineCities=(arr)=>{
    console.log(arr)
    arr.map=((stop,i)=>{
        return(
        <div className="column is-one-third" style={{marginLeft:10,marginRight:10}}>
            <div class="card cardS">
                <div class="card-content center">
                    <div class="content">
                        <h3>{""+(i+1)+"."}</h3>
                        <h2>{stop['name']+","}</h2><h3>{stop['country']}</h3>
                        <h4> Population:{stop['population']}</h4>
                        <h4> Distance to Next Stop:{stop['distanceNext']}</h4>
                    </div>
                </div>
            </div>
        </div>
        )
    })
}
export default OutlineCities


/*
    <div className="column is-one-third" style={{marginLeft:10,marginRight:10}}>
        <div class="card cardS">
            <div class="card-content center">
                <div class="content">
                    <h2>{key+","}</h2><h3>{obj[key]['country']}</h3>
                    <h4> Population:{obj[key]['population']}</h4>
                </div>
            </div>
        </div>
    </div>
        
*/