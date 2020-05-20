import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FavCart from './FavCart';
import style from '../cssModules/header.module.css';

class Header extends Component {
    render() {
        return (
            <header className={`d_flex ${style['header-container']}`}>
                <h1 className={`flex_1 ${style['header-title']}`}>Shopping</h1>
                <div className={`d_flex ${style['user-container']}`}>
                    <div className={`d_flex fd_col ${style.user}`}>{this.props.userName}<Link to="/">Logout</Link></div>
                    <FavCart fill={"red"}/>
                </div>
            </header>
        );
    }
}

export default Header;  