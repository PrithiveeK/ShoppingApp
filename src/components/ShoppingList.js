import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Product from './Product';
import Header from './Header';
import style from '../cssModules/shoppingList.module.css';

class ShoppingList extends Component {
    constructor(props){
        super(props);
        this.state = {
            ProductDetails: [],
            loggedUser: {}
        }
    }
    componentDidMount(){
        this.setState({
            loggedUser: JSON.parse(localStorage.getItem('loggedInUser')),
            ProductDetails: JSON.parse(localStorage.getItem('products')) || []
        });
    }
    componentWillUnmount(){
        const users = JSON.parse(localStorage.getItem('users'));
        users[this.state.loggedUser.userEmail] = JSON.parse(localStorage.getItem('loggedInUser'));
        localStorage.setItem('users', JSON.stringify(users));
    }
    render() {
        return !this.state.loggedUser ? <Redirect to="/" /> : (
            <React.Fragment>
                <Header userName={this.state.loggedUser.userName}/>
                <div className={`d_flex ${style['shopping-list']}`}>
                    {this.state.ProductDetails.map(pd=> 
                    <Product key={pd._id} product={pd} favs={this.state.loggedUser.fav}/>)}
                </div>
            </React.Fragment>
        );
    }
}
export default ShoppingList;