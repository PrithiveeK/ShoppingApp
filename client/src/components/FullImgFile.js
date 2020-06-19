import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import style from '../cssModules/fullImgFile.module.css';

class FullImgFile extends Component {

    render() {
        const uri = "http://localhost:5000/api/product/file";
        return (
            <div className={`${style['body-container']} m_auto br_8 d_flex padd_20 bs_small p_rel`}>
                <div className={`${style['img-carrier']}`}>
                    <Slider pauseOnHover={false} arrows={true}>
                    {this.props.src.map(src=>
                        <img key={src} className={`${style['img-carrier']}`}
                        src={`${uri}/${this.props.folder}/${src}`}
                        alt="" />
                    )}
                    </Slider>
                </div>
                <div className={`${style['close']} p_abs`} 
                onClick={()=>this.props.imgRef.current.style.display = "none"}
                />
            </div>
        );
    }
}

export default FullImgFile;