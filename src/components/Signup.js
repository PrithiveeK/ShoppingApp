import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo: {
                userName: '',
                userEmail: '',
                userPassword: '',
                confirmPassword: ''
            },
            passMissMatch: false,
            dontlet: true,
            accExists: false,
            signUp: false
        };
    }
    changeDetails = (event) => {
        let ut = event.target;
        let cp = this.state.passMissMatch;
        if(ut.name === 'confirmPassword')
        cp = !(this.state.userInfo.userPassword === ut.value);
        this.setState({
            ...this.state,
            passMissMatch: cp,
            userInfo: {
                ...this.state.userInfo,
                [ut.name]: ut.value
            },
            dontlet: (cp||!this.state.userInfo.userEmail||
                !this.state.userInfo.userName||!this.state.userInfo.userPassword||
                !this.state.userInfo.confirmPassword)
        });
    }
    storeUserInfo = (event) =>{
        event.preventDefault();
        let users = this.props.userData;
        let ui = {...this.state.userInfo};
        if(users.hasOwnProperty(ui.userEmail)){
            this.setState({
                ...this.state,
                accExists: true
            });
        }
        else{
            delete ui.confirmPassword;
            users[this.state.userInfo.userEmail] = {
                ...ui,
                fav: [],
                cart: []
            }
            localStorage.setItem('users',JSON.stringify(users));
            localStorage.setItem('loggedInUser',JSON.stringify({...ui,fav:[],cart:[]}));
            this.setState({
                ...this.state,
                signUp: true
            });
        }
    }
    render() {
        const {userInfo, passMissMatch, dontlet, accExists, signUp} = this.state;
        return signUp ? <Redirect to="/home" /> : (
            <React.Fragment>
                <h1>Sign Up</h1>
                <form className={`d_flex fd_col fs_24`} onSubmit={this.storeUserInfo}>
                    <label htmlFor="userName" className={`input-label`}>User Name</label>
                    <input type="text" name="userName" className={`inputter fs_24`} 
                    value={userInfo.userName} onChange={this.changeDetails}/>
                    <label htmlFor="userEmail" className={`input-label`}>Email</label>
                    <input type="email" name="userEmail" className={`inputter fs_24`} 
                    value={userInfo.userEmail} onChange={this.changeDetails}/>
                    <label htmlFor="userPassword" className={`input-label`}>Password</label>
                    <input type="password" name="userPassword" className={`inputter fs_24`}
                    value={userInfo.userPassword} onChange={this.changeDetails}/>
                    <label htmlFor="confirmPassword" className={`input-label`}>Confirm Password
                        {passMissMatch && <span>*Password donot match</span>}
                    </label>
                    <input type="password" name="confirmPassword" className={`inputter fs_24`}
                    value={userInfo.confirmPassword} onChange={this.changeDetails}/>
                    <button type="submit" className={`submit-btn fs_24`}
                    disabled={dontlet}>Sign Up</button>
                    {accExists && <p className={`error`}>Account already Exists</p>}
                </form>
            </React.Fragment>
        );
    }
}

export default Signup;  