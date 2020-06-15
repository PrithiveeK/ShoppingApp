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
    getUserFav = () => {
        fetch(`http://localhost:5000/api/fav/all`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json','client': this.state.loggedUser._id}
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

    removeFav = (prodId) => {
        fetch(`http://localhost:5000/api/fav/${prodId}/delete`,{
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
                this.getUserFav();
        }).catch(err=>alert("error!"));
    }
    render() {
        return (
            <React.Fragment>
                <Header user={this.state.loggedUser} show={false}/>
                <div className={`d_flex product-list`}>
                    {this.state.FavList.length ? (this.state.favList.map(fav => 
                        <ProductFC key={fav._id} product={fav}
                        remove={this.removeFav}/>    
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

export default FavList;