import React, { Component } from 'react';
import '../cssModules/loginSignup.css';
import Login from './Login';
import Signup from './Signup';
import style from '../cssModules/loginSignup.module.css';

class LoginSignup extends Component {

    componentDidMount(){
        localStorage.clear()
    }
    render() {
        return (
            <div className={`d_flex body_h ${style['ls-container']}`}>
                <div className={`padd_20 br_8 bs_small ${style['form-container']}`}>
                <Login />
                </div>
                <div className={`padd_20 br_8 bs_small ${style['form-container']}`}>
                <Signup />
                </div>
            </div>
        );
    }
}
export default LoginSignup;