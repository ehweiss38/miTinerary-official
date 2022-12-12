import React from "react"

const CityDisp=(props)=>{
    //need to update if sending obj
    let counter=0
    const cityD=props.cities.map((city,i)=>{
        const iconArr=[<i onClick={()=>{props.shuffle('up')}} class="fa-solid fa-up"></i>,
            <i onClick={()=>{props.shuffle('down')}}class="fa-solid fa-down"></i>]
        let disp
        if(i===0){
            disp=iconArr[1]
        }else if(i===counter){
            disp=iconArr[0]
        }else{
            disp=iconArr
        }
        counter++
        return(
            //would prefer slightly lighter grey
            //come back to this later
            <li style={{color:'light grey',marginLeft:25}}>
                {counter}. {city.name+', '+city.country}
            <span>{disp}</span>
            </li>
        )
    })
    return(
        <div className="extraCityBox box">
            <div style={{height:100,maxHeight:300}}>
                <h3 style={{color:'light grey',marginLeft:2, marginTop:-12}}>Cities:</h3>
                <ul>
                    {cityD}
                </ul>
            </div>
        </div>
    )
}

export default CityDisp