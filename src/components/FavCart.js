import React, { Component } from 'react';
import Heart from './Heart';
import style from '../cssModules/favCart.module.css';

class FavCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFav: this.props.fav
        }
    }
    addFav = () => {
        this.setState({isFav: !this.state.isFav},()=>{
            let user = JSON.parse(localStorage.getItem('loggedInUser'));
            if(this.state.isFav){
                user.fav.push(this.props.product);
            }
            else{
                const i = user.fav.findIndex(id=> id._id===this.props.product._id);
                user.fav.splice(i,1);
            }
            localStorage.setItem('loggedInUser',JSON.stringify(user));
        });
    }
    render() {
        let colorFill = this.state.isFav ? "red" : "white";
        if(this.props.fill){
            colorFill = 'red';
        }
        return (
            <div className={`d_flex`}>
                <div className={`${style.icon} ${style[this.props.fill ? '' : 'add-fav']}`}
                 onClick={this.addFav}><Heart stroke={"red"} fill={colorFill}/></div>
                <div className={style.icon}></div>
            </div>
        );
    }
}

export default FavCart;