import React, { Component } from 'react';
import FavCart from './FavCart';
import style from '../cssModules/product.module.css';

class Product extends Component {
    constructor(props){
        super(props);
        this.state ={
            isAFav: (this.props.favs.findIndex(p=>p._id===this.props.product._id) !== -1)
        }
    }
    render() {
        const {_id, productTitle, productDesc} = this.props.product;
        return (
            <div className={`br_8 p_rel bs_small ${style.product}`}>
                <img src="//unsplash.it/300/350" alt="" className={`w_100 br_8 ${style['product-img']}`}/>
                <div className={`w_100 br_8 d_flex fd_col ${style['product-description']}`} >
                    <h1 className={`fs_24`}>{productTitle || "No Title"}</h1>
                    <div className={`d_flex`}>
                        <button className={`flex_1 ${style['purchase-btn']}`}>Buy Now</button>
                        <FavCart product={this.props.product} fav={this.state.isAFav}/>
                    </div>
                </div>
                <p className={`p_abs w_100 br_8 ${style['desc-data']}`}>{productDesc || "No Description"}</p>
            </div>
        );
    }
}

export default Product;