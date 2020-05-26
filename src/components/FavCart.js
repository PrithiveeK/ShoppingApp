import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Heart from './Heart';
import style from '../cssModules/favCart.module.css';

class FavCart extends Component {
    constructor(props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem('loggedInUser'));
        this.state = {
            isFav: this.props.fav,
            isCart: this.props.cart
        };
    }
    addToFav = () => {
        if(!this.state.isFav){
            this.props.addFav(this.props.productId);
        }
        else{
            this.props.removeFav(this.props.productId);
        }
        this.setState({
            ...this.state,
            isFav: !this.state.isFav
        });
    }
    addToCart = () => {
        if(!this.state.isCart){
            this.props.addCart(this.props.productId);
            this.setState({
                ...this.state,
                isCart: true
            });
        }
    }

    render() {
        let colorFill = this.state.isFav ? "red" : "white";
        let cartClass = this.state.isCart ? style.done : style.add;
        if(this.props.fill) 
            return (
                <div className={`d_flex`}>
                <Link to='/fav'>
                <div className={`${style.icon} ${style[this.props.fill ? '' : 'adder']}`}>
                    <Heart stroke={"red"} fill={'red'}/>
                    <div className={style.circle} style={{top: 0,left: '65%'}}>
                        <i className={style.data}>{this.props.favLen}</i>
                    </div>
                </div>
                </Link>
                <Link to='/cart'>
                <div className={`${style.icon} ${style[this.props.fill ? '' : 'adder']}`}>
                    <div className={style['cart-line-1']} />
                    <div className={style['cart-line-2']} />
                    <div className={style['cart-wheel']} />
                    <div className={style.circle}><i className={style.data}>
                    {this.props.cartLen}
                    </i></div>
                </div>
                </Link>
            </div>       
            );
        else 
            return (
                <div className={`d_flex`}>
                    <div className={`${style.icon} ${style[this.props.fill ? '' : 'adder']}`}
                    onClick={this.addToFav}>
                        <Heart stroke={"red"} fill={colorFill}/>
                    </div>
                    <div className={`${style.icon} ${style[this.props.fill ? '' : 'adder']}`}
                    onClick={this.addToCart}>
                        <div className={style['cart-line-1']} />
                        <div className={style['cart-line-2']} />
                        <div className={style['cart-wheel']} />
                        <div className={style.circle}><i className={cartClass}></i></div>
                    </div>
                </div>
            );
    }
}

export default FavCart;