import React,{useState} from "react";
import IndexIcons from "./IndexIcons";


const Outline=(props)=>{
    const [index,setIndex]=useState(0)
    const opts=[["Equidistant Cities",'eq'],["Large Cities","lg"]]
    const outlinedArr=props.outline.data.map((stop,i)=>{
        return(
        <div className="column is-one-third" style={{marginLeft:10,marginRight:10}}>
            <div class="card outlineCity" style={{marginLeft:15}}>
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
    console.log('outlinedarr',outlinedArr)
    const scroll=(num)=>{
        console.log(num)
        if((num===1&&index>=outlinedArr.length-2)||(num===-1&&index===0)){
            return
        }
        setIndex(index+num)
    }
    return(
        <div className="card outlineBox center">
            <div style={{marginTop:-100}} className="center">
                <div className="columns outlineCenter">
                    {outlinedArr[index]}
                    <span style={{width:90}}></span>
                    {outlinedArr[index+1]}
                </div>
                <div className="horizontal">
                    <button style={{visibility:index===0?'hidden':'visible'}}onClick={()=>{scroll(-1)}}><i className="fa-solid fa-arrow-left"></i></button>
                    <span style={{width:30}}/>
                    <IndexIcons index={index} outline={outlinedArr}/>
                    <span style={{width:30}}/>
                    <button style={{visibility:index===outlinedArr.length-2?'hidden':'visible'}} onClick={()=>{scroll(1)}}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
                <div style={{marginTop:27}}>
                    <form onSubmit={(e)=>{e.preventDefault();props.launch()}} >
                        <div class="control" style={{marginLeft:20,marginTop:-30}}>
                            <label class="radio">
                                <input type="radio" name="answer" onChange={()=>{props.setMode('eq')}}checked={props.mode==='eq'}/>
                                Equidistant Cities
                            </label>
                            <label class="radio">
                                <input type="radio" name="answer"  onChange={()=>{props.setMode('lg')}} checked={props.mode==='lg'}/>
                                Large Cities
                            </label>
                        </div>
                        <input className="button is-danger" type="submit" value={"Generate my trip"} style={{marginTop:20}}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Outline