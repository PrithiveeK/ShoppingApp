import React, { Component } from 'react';
import style from '../cssModules/newProduct.module.css';

class NewProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: JSON.parse(localStorage.getItem('products'))?.length || 0 ,
            productTitle: '',
            productDesc: ''
        }; 
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
    addProduct = (event) =>{
        let produstDetails = JSON.parse(localStorage.getItem('products')) || [];
        produstDetails.push(this.state);
        localStorage.setItem(`products`,JSON.stringify(produstDetails));
        fetch('http://localhost:5000/api/product/add',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res=>res.json())
        .then(data=>alert(data.message))
        .catch(err=>alert('error!'));
        this.setState({
            ...this.state,
            _id: this.state._id+1
        });
        event.preventDefault();
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