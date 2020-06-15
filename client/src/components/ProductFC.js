import React, { Component } from 'react';
import ImgFile from './ImgFile';
import FullImgFile from './FullImgFile';
import style from '../cssModules/product.module.css';

class ProductFC extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: 0,
            folder: '',
            src: []
        };
        this.imgRef = React.createRef();
    }
    componentDidMount(){
        this.getProductImg();
        this.imgRef.current.style.display = "none";
    }

    getProductImg(){
        fetch(`http://localhost:5000/api/product/mics/${this.props.product._id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'client': JSON.parse(localStorage.getItem('loggedInUser'))._id
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.status){
                this.setState({
                    cart: this.props.acart ? this.props.acart : 0,
                    folder: data.folder,
                    src: data.files
                });
            }
        }).catch(err=>alert("error!"));
    }
    removeItem = () => {
        this.props.remove(this.props.product._id);
    }
    render() {
        const {producttitle, productdesc} = this.props.product;
        return (
            <React.Fragment>
                <div className={`br_8 p_rel bs_small ${style.product}`}>
                    {!!this.state.src.length && 
                    <div className={`${style['img-container']}`} onClick={()=>this.imgRef.current.style.display="flex"}>
                    <ImgFile folder={this.state.folder} src={this.state.src} />
                    </div>}
                    <div className={`w_100 br_8 ${style['product-description']}`} >
                        <h1 className={`fs_24`}>{producttitle || "No Title"}</h1>
                        <p className={`w_100 br_8 ${style['desc-data']}`}>{productdesc || "No Description"}</p>
                        <div className={`d_flex fd_col ${style['btn-container']}`}>
                            <button className={`flex_1 ${style['purchase-btn']}`}>Buy Now
                                {this.props.acart && ` X ${this.props.acart}`}
                            </button>
                            <button className={`flex_1 ${style['remove-btn']}`}
                            onClick={this.removeItem}>Remove</button>
                        </div>
                    </div>
                </div>
                <div className={`${style['view-full']} w_100 body_h`} ref={this.imgRef}>
                    {!!this.state.src.length && 
                    <FullImgFile folder={this.state.folder} 
                    src={this.state.src} 
                    imgRef={this.imgRef}/>}
                </div>
            </React.Fragment>
        );
    }
}

export default ProductFC;
