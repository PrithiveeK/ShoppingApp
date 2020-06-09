import React, { Component } from 'react';
import FavCart from './FavCart';
import style from '../cssModules/product.module.css';

class Product extends Component {
    constructor(props){
        super(props);
        this.state ={
            isAFav: this.updateState('fav'),
            isInCart: this.updateState('cart')
        }
    }
    updateState(favOrCart){
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        return (user[favOrCart].findIndex(p=>p===this.props.product._id) !== -1);
    }

    render() {
        const {producttitle, productdesc} = this.props.product;
        return (
            <div className={`br_8 p_rel bs_small ${style.product}`}>
                <img src="//unsplash.it/300/350" alt="" className={`w_100 br_8 ${style['product-img']}`}/>
                <div className={`w_100 br_8 d_flex fd_col ${style['product-description']}`} >
                    <h1 className={`fs_24`}>{producttitle || "No Title"}</h1>
                    <div className={`d_flex`}>
                        <button className={`flex_1 ${style['purchase-btn']}`}>Buy Now</button>
                        <FavCart productId={this.props.product._id}
                        fav={this.state.isAFav} cart={this.state.isInCart} 
                        addFav={this.props.FavCartAdder[0]} 
                        removeFav={this.props.FavCartAdder[1]} 
                        addCart={this.props.FavCartAdder[2]}/>
                    </div>
                </div>
                <p className={`p_abs w_100 br_8 ${style['desc-data']}`}>{productdesc || "No Description"}</p>
            </div>
        );
    }
}

export default Product;