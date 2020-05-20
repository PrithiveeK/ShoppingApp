import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
            accNExist: false,
            logIn: false
        };
    }
    changeDetail = (event) => {
        let ut = event.target;
        this.setState({
            ...this.state,
            [ut.name]: ut.value
        });
    }
    validateLogin = (event) => {
        event.preventDefault();
        let user = this.props.userData[this.state.userEmail];
        if(!user || user.userPassword !== this.state.userPassword){
            this.setState({
                ...this.state,
                accNExist: true
            });
        }
        else{
            localStorage.setItem("loggedInUser",JSON.stringify(user));
            this.setState({
                ...this.state,
                logIn: true
            });
        }
    }
    render() {
        const {userEmail, userPassword, accNExist, logIn} = this.state;
        return logIn ? <Redirect to="/home" /> : (
            <React.Fragment>
                <h1>Log In</h1>
                <form className={`d_flex fd_col fs_24`} onSubmit={this.validateLogin}>
                    <label htmlFor="userEmail" className={`input-label`}>Email</label>
                    <input type="email" name="userEmail" className={`inputter fs_24`} 
                    value={userEmail} onChange={this.changeDetail}/>
                    <label htmlFor="userPassword" className={`input-label`}>Password</label>
                    <input type="password" name="userPassword" className={`inputter fs_24`} 
                    value={userPassword} onChange={this.changeDetail}/>
                    <button type="submit" className={`submit-btn fs_24`}>Log In</button>
                </form>
               {accNExist && <p className={`error`}>Invalid Email or Password</p>}
            </React.Fragment>
        );
    }
}

export default Login;