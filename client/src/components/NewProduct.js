import React, { Component } from 'react';
import style from '../cssModules/newProduct.module.css';

class NewProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            trust: false,
            productTitle: '',
            productDesc: ''
        }; 
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/product',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'hahaha-token': process.env.AUTH_TOKEN
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.trust){
                this.setState({...this.state,trust:true});
            }else{
                this.setState({...this.state,trust:false});
            }
        }).catch(err=>{console.log(err);alert("error")});
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
                'Content-Type': 'application/json',
                'hahaha-token': process.env.AUTH_TOKEN
            },
            body: JSON.stringify(this.state)
        }).then(res=>res.json())
        .then(data=>{
            if(data.trust){
                this.setState({...this.state,trust:true});
            }else{
                this.setState({...this.state,trust:false});
            }
        }).catch(err=>alert('error!'));
        event.preventDefault();
    }
    render() {
        return !this.state.trust ? <h1>Access Denied</h1> : (
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