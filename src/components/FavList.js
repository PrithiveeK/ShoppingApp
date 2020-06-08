import React, { Component } from 'react';
import ProductFC from './ProductFC';
import Header from './Header';

class FavList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: JSON.parse(localStorage.getItem('loggedInUser')),
            favList: []
        }
    }
    componentDidMount(){
        this.getUserFav();
    }
    componentWillUnmount(){
        const currUser = JSON.parse(localStorage.getItem('loggedInUser'));
        this.updateFav(currUser);
    }
    getUserFav = () => {
        fetch(`http://localhost:5000/api/fav/${this.state.loggedUser._id}/all`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res=>res.json())
        .then(data=>{
            if(data.status)
            this.setState({
                ...this.state,
                favList: data.data
            });
            else{
                alert('error dono');
            }
        }).catch(err=>alert('error'));
    }
    updateFav = (currUser) =>{
        fetch(`http://localhost:5000/api/fav/${this.state.loggedUser._id}/update`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({favList: currUser.fav})
        }).catch(err=>alert("error!"));
    }

    updateLoggedUser = (updatedUser)=>{
        localStorage.setItem('loggedInUser',JSON.stringify(updatedUser));
        this.setState({
            ...this.state,
            loggedUser: updatedUser
        });
    }
    updateLoggedUser = (updatedUser)=>{
        localStorage.setItem('loggedInUser',JSON.stringify(updatedUser));
        this.setState({
            loggedUser: updatedUser
        });
    }
    removeFav = (pdId) => {
        let favL = this.state.loggedUser.fav; 
        const i = favL.findIndex(p=>p === pdId);
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
                    {this.state.favList.map(fav => 
                        <ProductFC key={fav._id} product={fav}
                        remove={this.removeFav}/>    
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default FavList;