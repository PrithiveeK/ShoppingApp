import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Product from './Product';
import Header from './Header';

class ShoppingList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: JSON.parse(localStorage.getItem('loggedInUser')),
            ProductDetails: []
        }
    }
    componentDidMount(){
       this.updateState();
    }

    componentWillUnmount(){
        const currUser = JSON.parse(localStorage.getItem('loggedInUser'));
        this.updateFav(currUser);
        this.updateCart(currUser);
    }

    updateState = () => {
        fetch('http://localhost:5000/api/product/all',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res=>res.json())
        .then(data=>{
            if(data.status)
            this.setState({
                ...this.state,
                ProductDetails: data.data
            })
        }).catch(err=>alert('error!'));
    }

    updateFav = (currUser) =>{
        fetch(`http://localhost:5000/api/fav/${1}/update`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({favList: currUser.fav})
        }).catch(err=>alert("error!"));
    }
    updateCart = (currUser) =>{
        fetch(`http://localhost:5000/api/cart/${1}/update`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cartList: currUser.cart})
        }).catch(err=>alert("error!"));
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
        updatedUser.fav.push(pdId);
        this.updateLoggedUser(updatedUser);
    }
    removeFav = (pdId) => {
        const i = this.state.loggedUser.fav.findIndex(p=>p === this.state.ProductDetails[pdId]._id);
        let updatedUser = this.state.loggedUser;
        updatedUser.fav.splice(i,1);
        this.updateLoggedUser(updatedUser);
    }
    addCart = (pdId) => {
        let updatedUser = this.state.loggedUser;
        updatedUser.cart.push(pdId);
        this.updateLoggedUser(updatedUser);
    }
    render() {
        return !this.state.loggedUser ? <Redirect to="/" /> : (
            <React.Fragment>
                <Header user={this.state.loggedUser} show={true}/>
                <div className={`d_flex product-list`}>
                    {this.state.ProductDetails.map(pd=> 
                    <Product key={pd._id} product={pd} 
                    FavCartAdder={[this.addFav, this.removeFav, this.addCart]}/>)}
                </div>
            </React.Fragment>
        );
    }
}
export default ShoppingList;