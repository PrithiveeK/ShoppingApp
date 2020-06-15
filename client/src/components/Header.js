import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FavCart from './FavCart';
import style from '../cssModules/header.module.css';

class Header extends Component {
    render() {
        return (
            <header className={`d_flex ${style['header-container']}`}>
                {!this.props.show && 
                <Link to='/home'><div className={style['back-arrow']}></div></Link>}
                <div className={`d_flex fd_col`}>
                    <h1 className={`flex_1 ${style['header-title']}`}>Shopping</h1>
                    <Link to='/admin'>Switch to admin</Link>
                </div>
                <div className={`d_flex ${style['user-container']}`}>
                    <div className={`d_flex fd_col ${style.user}`}>{this.props.user.username}<Link to="/">Logout</Link></div>
                    {this.props.show && <FavCart fill={"red"} />}
                </div>
            </header>
        );
    }
}

export default Header;  