import React from "react";
//const photos=require("../../../helpers/photos");

const Cities=(props)=>{

    let obj=props.data
    console.log("OBJ",obj)

    let citiesArr=[]
    for(let key in obj){
        
        //await photos(key)
        citiesArr.push(
        <div className="column is-one-third" style={{marginLeft:10,marginRight:10}}>
            <div class="card cityCon">
                <div class="card-content center">
                    <div class="content">
                        <h2>{key+","}</h2><h3>{obj[key]['country']}</h3>
                        <h4> Population:{obj[key]['population']}</h4>
                    </div>
                </div>
            </div>
        </div>
        )
    }
        /*
        const response=await unsplash.get('/search/photos',{
            params:{
                query:obj[key].name },
        })
        <div class="card-image">
                    <figure class="image is-2by2">
                        <img src={response.data.results[0].urls.regular} alt="Placeholder image"/>
                    </figure>
                </div>
        */
        
    return(
        <React.Fragment>
            {citiesArr[0]}
            {citiesArr[1]}
        </React.Fragment>
    )  
}
export default Cities