import React, { Component } from 'react';
import style from '../cssModules/favCart.module.css';

class FavCart extends Component {
    render() {
        return (
            <div className={`d_flex`}>
                <div className={style.icon}><div className={style['fav-icon']}></div></div>
                <div className={style.icon}></div>
            </div>
        );
    }
}

export default FavCart;