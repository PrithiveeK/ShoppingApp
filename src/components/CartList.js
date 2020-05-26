import React, { Component } from 'react';
import Header from './Header';
import ProductFC from './ProductFC';

class CartList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: JSON.parse(localStorage.getItem('loggedInUser'))
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
            loggedUser: updatedUser
        });
    }
    removeCart = (pdId) => {
        let cartL = this.state.loggedUser.cart;
        const i = cartL.findIndex(p=>p._id === pdId);
        let updatedUser = this.state.loggedUser;
        updatedUser.cart.splice(i,1);
        this.updateLoggedUser(updatedUser);
    }
    render() {
        return (
            <React.Fragment>
                <Header user={this.state.loggedUser} show={false}/>
                <div className={`d_flex product-list`}>
                    {this.state.loggedUser.cart.map( cart => 
                        <ProductFC key={cart._id} product={cart}
                        remove={this.removeCart}/>    
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default CartList;