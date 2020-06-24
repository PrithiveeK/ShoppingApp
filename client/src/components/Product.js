import React, { Component } from 'react';
import FavCart from './FavCart';
import ImgFile from './ImgFile';
import FullImgFile from './FullImgFile';
import style from '../cssModules/product.module.css';

class Product extends Component {
    constructor(props){
        super(props);
        this.state ={
            src: []
        };
        this.imgRef = React.createRef();
    }

    componentDidMount(){
        this.imgRef.current.style.display = "none";
        this.getImgFiles();
    }

    getImgFiles = () => {
        fetch(`http://localhost:5000/api/product/${this.props.product.img_folder}/files`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res=>res.json())
            .then(data=>{
                if(data.status)
                this.setState({
                    ...this.state,
                    src: data.files
                });
                else
                alert("error");
            }).catch(err=>alert("error"));
    }

    render() {
        const {product_title, product_desc, img_folder, count, userfav} = this.props.product;
        isAFav = userfav!=null ? 1: 0;
        isInCart = count;
        return (
            <React.Fragment>
                <div className={`br_8 p_rel bs_small ${style.product}`}>
                    {!!this.state.src.length && 
                    <div className={`${style['img-container']}`}
                    onClick={()=>this.imgRef.current.style.display = "flex"}>
                        <ImgFile folder={img_folder} src={this.state.src}/>
                    </div>}
                    <div className={`w_100 br_8 ${style['product-description']}`} >
                        <h1 className={`fs_24`}>{product_title || "No Title"}</h1>
                        <p className={`${style['desc-data']}`}>{product_desc || "No Description"}</p>
                        <div className={`d_flex fd_col ${style['button-container']}`}>
                            <button className={`${style['purchase-btn']}`}>Buy Now</button>
                            <FavCart productId={this.props.product.id}
                            fav={isAFav} cart={isInCart} 
                            addFav={this.props.FavCartAdder[0]} 
                            removeFav={this.props.FavCartAdder[1]} 
                            addCart={this.props.FavCartAdder[2]}
                            removeCart={this.props.FavCartAdder[3]}/>
                        </div>
                    </div>
                </div>
                <div className={`${style['view-full']} w_100 body_h`} ref={this.imgRef}>
                    {!!this.state.src.length && 
                    <FullImgFile folder={img_folder} src={this.state.src} imgRef={this.imgRef}/>}
                </div>
            </React.Fragment>
        );
    }
}

export default Product;