import React, { Component } from 'react';
import FavCart from './FavCart';
import style from '../cssModules/product.module.css';

class Product extends Component {
    render() {
        return (
            <div className={`br_8 p_rel bs_small ${style.product}`}>
                <img src="//unsplash.it/300/350" alt="" className={`w_100 br_8 ${style['product-img']}`}/>
                {/* <div className={`w_100 br_8 ${style['product-img']}`} /> */}
                <div className={`w_100 br_8 d_flex fd_col ${style['product-description']}`} >
                    <h1 className={`fs_24`}>{this.props.title || "No Title"}</h1>
                    <div className={`d_flex`}>
                        <button className={`flex_1 ${style['purchase-btn']}`}>Buy Now</button>
                        <FavCart />
                    </div>
                </div>
                <p className={`p_abs w_100 br_8 ${style['desc-data']}`}>{this.props.desc || "No Description"}</p>
            </div>
        );
    }
}

export default Product;