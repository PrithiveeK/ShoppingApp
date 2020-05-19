import React, { Component } from 'react';
import FavCart from './FavCart';
import style from '../cssModules/header.module.css';

class Header extends Component {
    render() {
        return (
            <header className={`d_flex ${style['header-container']}`}>
                <h1 className={`flex_1 ${style['header-title']}`}>Shopping</h1>
                {<FavCart />}
            </header>
        );
    }
}

export default Header;  