import React,{useState} from "react";
import axios from "axios";

const SignIn=(props)=>{

    //they could actually share state i guess
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const signIn=async()=>{
        if(!username||!password){
            return
        }
        console.log('sending')
        const status=await axios.post('http://localhost:7000/auth/signin',{
            username:username,password:password
        })
        console.log('status',status)
        if(status.data._id){
            props.signedIn(status.data._id)
            return
        }else{
            console.log('other error')
        }
    }


    const update=(val,target)=>{
        if(target==='u'){
            setUsername(val.toLowerCase())
        }
        if(target==='p'){
            setPassword(val)
        }
    }


    return(
        <form style={{marginTop:10}} onSubmit={(e)=>{e.preventDefault();signIn()}} >
            <div>
                <label style={{marginLeft:-220}}>Username</label>
                <div className="field">
                    <input style={{width:300}} className="input is-danger" id="startpoint" type="text" value={username} onChange={(e)=>{update(e.target.value,'u')}} name="username" placeholder="Username"/>
                </div>
            </div>
            <br/>
            <div>
                <label style={{marginLeft:-220}}>Password</label>
                <div className="field">
                    <input type="password" style={{width:300}} className="input is-danger" id="endpoint" value={password} onChange={(e)=>{update(e.target.value,'p')}} name="password" placeholder="Password"/>
                </div>
            </div>
            <br/>
            <input className="button is-primary" type="submit" value="Sign In" />
        </form>
    )
}

export default SignIn