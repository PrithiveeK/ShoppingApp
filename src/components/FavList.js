import React, { Component } from 'react';
import ProductFC from './ProductFC';
import Header from './Header';

class FavList extends Component {
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
    removeFav = (pdId) => {
        let favL = this.state.loggedUser.fav; 
        const i = favL.findIndex(p=>p._id === pdId);
        let updatedUser = this.state.loggedUser;
        updatedUser.fav.splice(i,1);
        this.updateLoggedUser(updatedUser);
        console.log(updatedUser);
    }
    render() {
        return (
            <React.Fragment>
                <Header user={this.state.loggedUser} show={false}/>
                <div className={`d_flex product-list`}>
                    {this.state.loggedUser.fav.map(fav => 
                        <ProductFC key={fav._id} product={fav}
                        remove={this.removeFav}/>    
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default FavList;