import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Heart from './Heart';
import style from '../cssModules/favCart.module.css';

class FavCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFav: this.props.fav,
            isCart: this.props.cart
        };
        this.btnRef1 = React.createRef();
        this.btnRef2 = React.createRef();
    }
    componentDidUpdate(prevProps){
        if(this.props.fav !== prevProps.fav || this.props.cart !== prevProps.cart){
            this.setState({
                isFav: this.props.fav,
                isCart: this.props.cart
            });
        }
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
        this.props.addCart(this.props.productId);
        this.setState({
            ...this.state,
            isCart: this.state.isCart+1
        });
    }
    removeFromCart = () => {
        this.props.removeCart(this.props.productId);
        this.setState({
            ...this.state,
            isCart: this.state.isCart-1
        });
    }

    render() {
        let colorFill = this.state.isFav ? "red" : "white";
        let cartClass = this.state.isCart ? style.data : style.add;
        if(this.props.fill) 
            return (
                <div className={`d_flex`}>
                <Link to='/fav'>
                <div className={`${style.icon}`}>
                    <Heart stroke={"red"} fill={'red'}/>
                </div>
                </Link>
                <Link to='/cart'>
                <div className={`${style.icon}`}>
                    <div className={style['cart-line-1']} />
                    <div className={style['cart-line-2']} />
                    <div className={style['cart-wheel']} />
                </div>
                </Link>
            </div>       
            );
        else 
            return (
                <div className={`d_flex`}>
                    <div className={`${style.icon} ${style['adder']}`}
                    onClick={this.addToFav}>
                        <Heart stroke={"red"} fill={colorFill}/>
                    </div>
                    <div className={`${style['cart-container']}`}>
                        <button ref={this.bthRef1} disabled={!this.state.isCart}
                        onClick={this.removeFromCart}>-</button>
                        <div className={`${style.icon} ${style['adder']}`}
                        onClick={this.addToCart}>
                            <div className={style['cart-line-1']} />
                            <div className={style['cart-line-2']} />
                            <div className={style['cart-wheel']} />
                            <div className={style.circle}><i className={cartClass}>
                                {!!this.state.isCart && this.state.isCart}    
                            </i></div>
                        </div>
                        <button ref={this.btnRef2} disabled={!this.state.isCart}
                        onClick={this.addToCart}>+</button>
                    </div>
                </div>
            );
    }
}

export default FavCart;