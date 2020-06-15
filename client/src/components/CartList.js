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
    getUserCart = () => {
        fetch(`http://localhost:5000/api/cart/all`,{
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
    removeCart = (prodId) => {
        fetch(`http://localhost:5000/api/cart/${prodId}/delete`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'client': this.state.loggedUser._id
            },
            body: JSON.stringify({prodId})
        }).then(res=>res.json())
        .then(data=>{
            if(!data.status)
                alert("error!")
            else
                this.getUserCart();
        }).catch(err=>alert("error!"));
    }
    render() {
        return (
            <React.Fragment>
                <Header user={this.state.loggedUser} show={false}/>
                <div className={`d_flex product-list`}>
                    {this.state.cartList.length ? (this.state.cartList.map( cart => 
                        <ProductFC key={cart._id} product={cart}
                        remove={this.removeCart} acart={true}/>    
                    )) : (
                        <div className={`alert-display d_flex w_100 body_h`}>
                            <h1 className={`m_auto`}>Empty</h1>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default CartList;
