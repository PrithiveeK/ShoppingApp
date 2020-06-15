import React, { Component } from 'react';
import FavCart from './FavCart';
import ImgFile from './ImgFile';
import FullImgFile from './FullImgFile';
import style from '../cssModules/product.module.css';

class Product extends Component {
    constructor(props){
        super(props);
        this.state ={
            folder: '',
            imgSrc: [],
            isAFav: 0,
            isInCart: 0
        };
        this.imgRef = React.createRef();
    }

    componentDidMount(){
        this.imgRef.current.style.display = "none";
        fetch(`http://localhost:5000/api/product/mics/${this.props.product._id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'client': JSON.parse(localStorage.getItem('loggedInUser'))._id
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.status){
                this.setState({
                    folder: data.folder,
                    imgSrc: data.files,
                    isAFav: data.isFav,
                    isInCart: data.isCart
                });
            }else{
                alert("error!");
            }
        }).catch(err => alert('error!'));
    }

    render() {
        const {producttitle, productdesc} = this.props.product;
        return (
            <React.Fragment>
                <div className={`br_8 p_rel bs_small ${style.product}`}>
                    {!!this.state.imgSrc.length && 
                    <div className={`${style['img-container']}`}
                    onClick={()=>this.imgRef.current.style.display = "flex"}>
                        <ImgFile folder={this.state.folder} src={this.state.imgSrc} />
                    </div>}
                    <div className={`w_100 br_8 ${style['product-description']}`} >
                        <h1 className={`fs_24`}>{producttitle || "No Title"}</h1>
                        <p className={`${style['desc-data']}`}>{productdesc || "No Description"}</p>
                        <div className={`d_flex fd_col ${style['button-container']}`}>
                            <button className={`${style['purchase-btn']}`}>Buy Now</button>
                            <FavCart productId={this.props.product._id}
                            fav={this.state.isAFav} cart={this.state.isInCart} 
                            addFav={this.props.FavCartAdder[0]} 
                            removeFav={this.props.FavCartAdder[1]} 
                            addCart={this.props.FavCartAdder[2]}
                            removeCart={this.props.FavCartAdder[3]}/>
                        </div>
                    </div>
                </div>
                <div className={`${style['view-full']} w_100 body_h`} ref={this.imgRef}>
                    {!!this.state.imgSrc.length && 
                    <FullImgFile folder={this.state.folder} 
                    src={this.state.imgSrc} 
                    imgRef={this.imgRef}/>}
                </div>
            </React.Fragment>
        );
    }
}

export default Product;