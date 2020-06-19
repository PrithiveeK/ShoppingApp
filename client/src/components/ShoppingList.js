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

    addFav = (prodId) => {
        fetch(`http://localhost:5000/api/fav/${prodId}/update`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client': this.state.loggedUser._id
            }
        }).then(res=>res.json())
        .then(data=>{
            if(!data.status)
                alert("error!")
        }).catch(err=>alert("error!"));
    }
    removeFav = (prodId) => {
        fetch(`http://localhost:5000/api/fav/${prodId}/delete`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'client': this.state.loggedUser._id
            }
        }).then(res=>res.json())
        .then(data=>{
            if(!data.status)
                alert("error!")
        }).catch(err=>alert("error!"));
    }
    addCart = (prodId) => {
        fetch(`http://localhost:5000/api/cart/${prodId}/update`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'client': this.state.loggedUser._id
            }
        }).then(res=>res.json())
        .then(data=>{
            if(!data.status)
                alert("error!")
        }).catch(err=>alert("error!"));
    }
    removeCart = (prodId) => {
        fetch(`http://localhost:5000/api/cart/${prodId}/delete`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'client': this.state.loggedUser._id
            }
        }).then(res=>res.json())
        .then(data=>{
            if(!data.status)
                alert("error!")
        }).catch(err=>alert("error!"));
    }
    render() {
        return !this.state.loggedUser ? <Redirect to="/" /> : (
            <React.Fragment>
                <Header user={this.state.loggedUser} show={true}/>
                {this.state.ProductDetails.length ? (<div className={`d_flex product-list`}>
                    {this.state.ProductDetails.map(pd=> 
                    <Product key={pd.id} product={pd} 
                    FavCartAdder={[this.addFav, this.removeFav, this.addCart, this.removeCart]}/>)}
                </div>) : (
                    <div className={`alert-display d_flex w_100 body_h`}>
                        <h1 className={`m_auto`}>Empty</h1>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
export default ShoppingList;