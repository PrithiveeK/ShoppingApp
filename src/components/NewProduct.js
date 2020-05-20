import React, { Component } from 'react';
import style from '../cssModules/newProduct.module.css';

class NewProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: 0,
            productTitle: '',
            productDesc: ''
        }; 
    }
    componentDidMount(){
        let len = JSON.parse(localStorage.getItem('products'));
        this.setState({
            ...this.state,
            _id: len == null ? 0 : len.length
        });
    }
    changeTitle = (event) => {
        this.setState({
            ...this.state,
            productTitle: event.target.value
        });
    }
    changeDesc = (event) => {
        this.setState({
            ...this.state,
            productDesc: event.target.value
        });
    }
    addProduct = () =>{
        let produstDetails = JSON.parse(localStorage.getItem('products')) || [];
        produstDetails.push(this.state);
        localStorage.setItem(`products`,JSON.stringify(produstDetails));
        this.setState({
            ...this.state,
            _id: this.state._id+1
        });
    }
    render() {
        return (
            <div className={`w_100 d_flex body_h`}>
                <form className={`d_flex fd_col m_auto br_8 bs_small ${style['add-item']}`} onSubmit={this.addProduct}>
                    <label className={`fs_24`}>Product Title</label>
                    <input type="text" value={this.state.productTitle} className={`fs_24 ${style['input-field']}`}
                    onChange={this.changeTitle} />
                    <label className={`fs_24`}>Product Description</label>
                    <textarea rows="10" cols="50" value={this.state.productDesc} 
                    onChange={this.changeDesc}/>
                    <button type='submit' className={`br_8 fs_24 ${style['item-submitter']}`}>Add Product</button>
                </form>
            </div>
        );
    }
}

export default NewProduct;