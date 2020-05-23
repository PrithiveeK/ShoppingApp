import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Product from './Product';
import Header from './Header';
import style from '../cssModules/shoppingList.module.css';

class ShoppingList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: JSON.parse(localStorage.getItem('loggedInUser')),
            ProductDetails: JSON.parse(localStorage.getItem('products')) || []
        }
    }

    componentWillUnmount(){
        const users = JSON.parse(localStorage.getItem('users'));
        users[this.state.loggedUser.userEmail] = JSON.parse(localStorage.getItem('loggedInUser'));
        localStorage.setItem('users', JSON.stringify(users));
    }
    updateLoggedUser = (updatedUser)=>{
        localStorage.setItem('loggedInUser',JSON.stringify(updatedUser));
        this.setState({
            ...this.state,
            loggedUser: updatedUser
        });
    }
    addFav = (pdId) => {
        let updatedUser = this.state.loggedUser;
        updatedUser.fav.push(this.state.ProductDetails[pdId]);
        this.updateLoggedUser(updatedUser);
    }
    removeFav = (pdId) => {
        const i = this.state.loggedUser.fav.findIndex(p=>p._id === this.state.ProductDetails[pdId]._id);
        let updatedUser = this.state.loggedUser;
        updatedUser.fav.splice(i,1);
        this.updateLoggedUser(updatedUser);
    }
    addCart = (pdId) => {
        let updatedUser = this.state.loggedUser;
        updatedUser.cart.push(this.state.ProductDetails[pdId]);
        this.updateLoggedUser(updatedUser);
    }
    render() {
        return !this.state.loggedUser ? <Redirect to="/" /> : (
            <React.Fragment>
                <Header user={this.state.loggedUser}/>
                <div className={`d_flex ${style['shopping-list']}`}>
                    {this.state.ProductDetails.map(pd=> 
                    <Product key={pd._id} product={pd} 
                    FavCartAdder={[this.addFav, this.removeFav, this.addCart]}/>)}
                </div>
            </React.Fragment>
        );
    }
}
export default ShoppingList;