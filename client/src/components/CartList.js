import React, { Component } from 'react';
import Header from './Header';
import ProductFC from './ProductFC';

class CartList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: JSON.parse(localStorage.getItem('loggedInUser')),
            cartList: []
        }
    }
    componentDidMount(){
        this.getUserCart();
    }
    componentWillUnmount(){
        const currUser = JSON.parse(localStorage.getItem('loggedInUser'));
        this.updateCart(currUser);
    }
    getUserCart = () => {
        fetch(`http://localhost:5000/api/cart/${this.state.loggedUser._id}/all`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json','client': this.state.loggedUser._id}
        }).then(res=>res.json())
        .then(data=>{
            if(data.status)
            this.setState({
                ...this.state,
                cartList: data.data
            });
        });
    }
    updateCart = (currUser) =>{
        fetch(`http://localhost:5000/api/cart/${this.state.loggedUser._id}/update`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'client': this.state.loggedUser._id
            },
            body: JSON.stringify({cartList: currUser.cart})
        }).catch(err=>alert("error!"));
    }
    updateLoggedUser = (updatedUser)=>{
        localStorage.setItem('loggedInUser',JSON.stringify(updatedUser));
        this.setState({
            loggedUser: updatedUser
        });
    }
    removeCart = (pdId) => {
        let cartL = this.state.loggedUser.cart;
        const i = cartL.findIndex(p=>p === pdId);
        let updatedUser = this.state.loggedUser;
        updatedUser.cart.splice(i,1);
        this.updateLoggedUser(updatedUser);
    }
    render() {
        return (
            <React.Fragment>
                <Header user={this.state.loggedUser} show={false}/>
                <div className={`d_flex product-list`}>
                    {this.state.cartList.map( cart => 
                        <ProductFC key={cart._id} product={cart}
                        remove={this.removeCart}/>    
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default CartList;