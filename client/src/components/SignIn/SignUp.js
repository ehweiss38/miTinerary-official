import axios from "axios";
import React from "react";

class SignUp extends React.Component{
    state={username:'',password:'',passwordConfirmation:''}

    async create(){
        if(this.state.password!==this.state.passwordConfirmation){
            return
        }
        console.log('sending')
        const status=await axios.post('https://mitinerary-js.herokuapp.com/auth/signup',{
            username:this.state.username,password:this.state.password
        })
        if(status.data._id){
            this.props.signedIn(status.data._id)
            return
        }else{
            console.log('other error')
        }
    }

    update(val,target){
        if(target==='u'){
            this.setState({username:val.toLowerCase()})
        }
        if(target==='p'){
            this.setState({password:val})
        }
        if(target==='pc'){
            this.setState({passwordConfirmation:val})
        }
    }

    render(){
        const message=this.state.password!==this.state.passwordConfirmation&&this.state.passwordConfirmation?
            <h3 style={{color:'red'}}>Passwords must match</h3>:''
        return(
            <form style={{marginTop:10}} action="/" onSubmit={(e)=>{e.preventDefault();this.create()}}>
                <div>
                    <label style={{marginLeft:-220}}>Username</label>
                    <div className="field">
                        <input style={{width:300}} className="input is-danger" id="startpoint" type="text" value={this.state.username} onChange={(e)=>{this.update(e.target.value,'u')}} name="username" placeholder="Username"/>
                    </div>
                </div>
                <br/>
                <div>
                    <label style={{marginLeft:-220}}>Password</label>
                    <div className="field">
                        <input type="password" style={{width:300}} className="input is-danger" id="endpoint" value={this.update.password} onChange={(e)=>{this.update(e.target.value,'p')}} name="password" placeholder="Password"/>
                    </div>
                </div>
                <br/>
                <div>
                    <label style={{marginLeft:-120}}>Password Confirmation</label>
                    <div className="field">
                        <input type="password" style={{width:300}} className="input is-danger" id="endpoint" value={this.state.passwordConfirmation} onChange={(e)=>{this.update(e.target.value,'pc')}} name="passwordConfirmation" placeholder="Password Confirmation"/>
                        {message}
                    </div>
                </div>
                <br/>
                <input className="button is-primary" type="submit" value="Create Account"/>

            </form>
        )
    }
}

export default SignUp