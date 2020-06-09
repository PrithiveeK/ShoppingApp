import React, { Component } from 'react';
import style from '../cssModules/product.module.css';

class ProductFC extends Component {
    removeItem = () => {
        this.props.remove(this.props.product._id);
    }
    render() {
        const {producttitle, productdesc} = this.props.product;
        return (
            <div className={`br_8 p_rel bs_small ${style.product}`}>
                <img src="//unsplash.it/300/350" alt="" className={`w_100 br_8 ${style['product-img']}`}/>
                <div className={`w_100 br_8 d_flex fd_col ${style['product-description']}`} >
                    <h1 className={`fs_24`}>{producttitle || "No Title"}</h1>
                    <p className={`w_100 br_8 ${style['desc-data']}`}>{productdesc || "No Description"}</p>
                    <div className={`d_flex fd_col`}>
                        <button className={`flex_1 ${style['purchase-btn']}`}>Buy Now</button>
                        <button className={`flex_1 ${style['remove-btn']}`}
                        onClick={this.removeItem}>Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductFC;