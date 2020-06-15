import React, { Component } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import style from '../cssModules/newProduct.module.css';
import { Link } from 'react-router-dom';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class NewProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            trust: false,
            productTitle: '',
            productDesc: '',
            files: [],
            folder: ''
        };
        this.addedRef = React.createRef(); 
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/product',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'hahaha-token': localStorage.getItem('token')
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
        fetch('http://localhost:5000/api/product/add',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'hahaha-token': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        }).then(res=>res.json())
        .then(data=>{
            if(data.trust){
                this.addedRef.current.style.display= "flex";
                setTimeout(()=>
                this.addedRef.current.style.display= "none"
                ,2000);
                this.setState({
                    trust: true,
                    productTitle: '',
                    productDesc: '',
                    files: [],
                    folder: ''
                });
            }else{
                this.setState({...this.state,trust:false});
            }
        }).catch(err=>alert('error!'));
        event.preventDefault();
    }
    render() {
        return !this.state.trust ? 
            (<div className={`alert-display d_flex fd_col w_100 body_h`}>
                <div className={`m_auto ${style['container']}`}>
                    <h1>Access Denied</h1>
                    <Link to='/home'>Switch to User mode</Link>
                </div>
            </div>) : (
            <React.Fragment>
                <div className={`${style['header-container']} d_flex fd_col`}>
                    <h1>Shopping</h1>
                    <Link to='/home'>Switch to User mode</Link>
                </div>
                <div className={`w_100 d_flex`}>
                    <form className={`d_flex fd_col m_auto br_8 bs_small ${style['add-item']}`} onSubmit={this.addProduct}>
                        <label className={`fs_24`}>Product Title</label>
                        <input type="text" value={this.state.productTitle} className={`fs_24 ${style['input-field']}`}
                        onChange={this.changeTitle} />
                        <label className={`fs_24`}>Product Description</label>
                        <textarea rows="10" cols="50" value={this.state.productDesc} 
                        onChange={this.changeDesc}/>
                        <label className={`fs_24`}>Product Images</label>
                        <FilePond ref={ref => this.pond = ref}
                            name="productImg"
                            files={this.state.files}
                            allowMultiple={true}
                            server={{
                                url: "http://localhost:5000/api/product",
                                process: {
                                url: '/img',
                                method: 'POST',
                                headers: {'Folder': this.state.folder},
                                onload: (res)=>{
                                    this.setState({...this.state, folder: res})
                                },
                                onerror: (err)=>console.log(err),
                                },
                                revert: null
                            }}
                            onupdatefiles={(fileItems) => {
                                this.setState({
                                    ...this.state,
                                    files: fileItems.map(fileItem => fileItem.file)
                                });
                            }}>
                        </FilePond>
                        <button type='submit' className={`br_8 fs_24 ${style['item-submitter']}`}>Add Product</button>
                    </form>
                    <div className={`${style['adding']}`} ref={this.addedRef}>
                        <div className={`${style['done']}`}>
                            Added new Product
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NewProduct;