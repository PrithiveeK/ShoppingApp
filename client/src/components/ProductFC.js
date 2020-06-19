import React, { Component } from 'react';
import ImgFile from './ImgFile';
import FullImgFile from './FullImgFile';
import style from '../cssModules/product.module.css';

class ProductFC extends Component {
    constructor(props){
        super(props);
        this.state = {
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
                    src: data.files
                });
                else
                alert("error");
            }).catch(err=>alert("error"));
    }
    removeItem = () => {
        this.props.remove(this.props.product.id);
    }
    render() {
        const {product_title, product_desc, img_folder} = this.props.product;
        return (
            <React.Fragment>
                <div className={`br_8 p_rel bs_small ${style.product}`}>
                    {!!this.state.src.length && 
                    <div className={`${style['img-container']}`} onClick={()=>this.imgRef.current.style.display="flex"}>
                    <ImgFile folder={img_folder} src={this.state.src}/>
                    </div>}
                    <div className={`w_100 br_8 ${style['product-description']}`} >
                        <h1 className={`fs_24`}>{product_title || "No Title"}</h1>
                        <p className={`w_100 br_8 ${style['desc-data']}`}>{product_desc || "No Description"}</p>
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
                    <FullImgFile folder={img_folder} src={this.state.src} imgRef={this.imgRef}/>}
                </div>
            </React.Fragment>
        );
    }
}

export default ProductFC;
