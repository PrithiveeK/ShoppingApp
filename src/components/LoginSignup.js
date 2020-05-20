import React, { Component } from 'react';
import '../cssModules/loginSignup.css';
import Login from './Login';
import Signup from './Signup';
import style from '../cssModules/loginSignup.module.css';

class LoginSignup extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {}
        }
    }
    componentDidMount(){
        localStorage.removeItem('loggedInUser');
        this.setState({
            userData: JSON.parse(localStorage.getItem('users')) || {}
        })
    }
    render() {
        return (
            <div className={`d_flex body_h ${style['ls-container']}`}>
                <div className={`padd_20 br_8 bs_small ${style['form-container']}`}>
                <Login userData={this.state.userData}/>
                </div>
                <div className={`padd_20 br_8 bs_small ${style['form-container']}`}>
                <Signup userData={this.state.userData}/>
                </div>
            </div>
        );
    }
}
export default LoginSignup;