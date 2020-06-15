import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import style from '../cssModules/product.module.css';

class ImgFile extends Component {

    render() {
        const uri = "http://localhost:5000/api/product/file";
        return (
            <Slider arrows={false} autoplay={true} pauseOnHover={false}>
                {this.props.src.map((src => 
                    <img key={src} src={`${uri}/${this.props.folder}/${src}`} 
                    alt="" className={`w_100 br_8 ${style['product-img']}`} />
                ))}
            </Slider>
        );
    }
}

export default ImgFile;