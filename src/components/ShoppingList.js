import React, { Component } from 'react';
import Product from './Product';
import style from '../cssModules/shoppingList.module.css';

class ShoppingList extends Component {
    constructor(props){
        super(props);
        this.state = {
            ProductDetails: []
        }
    }
    componentDidMount(){
        let proDet = [];
        for(let key of Object.keys(localStorage)){
            if(key.match(/product-.*/)){
                proDet.push(JSON.parse(localStorage.getItem(key)));
            }
        }
        this.setState({
            ProductDetails: proDet
        });
    }
    render() {
        return (
            <div className={`d_flex ${style['shopping-list']}`}>
                {this.state.ProductDetails.map(pd=> 
                <Product key={pd._id} title={pd.productTitle} desc={pd.productDesc}/>)}
            </div>
        );
    }
}
export default ShoppingList;