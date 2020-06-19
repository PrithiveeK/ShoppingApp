const router = require('express').Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {userfav:UserFav, usercart: UserCart, products: Products} = require('../models');

const FILENAME = 'productImg';
const PATH = path.join(__dirname, '..', 'public', 'images');
let imgFolder = ''

let photoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        imgFolder = req.header('Folder') ? req.header('Folder') : ('Product_' + Date.now());
        const imgPath = path.join(PATH, imgFolder);
        if(!fs.existsSync(imgPath))
            fs.mkdirSync(imgPath)
       cb(null, imgPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


let singleFileUpload = () => {
    return multer({
        storage : photoStorage
    }).single(FILENAME);
}

router.post('/img', singleFileUpload(), async (req, res) => {
    res.send(imgFolder);
});

router.get('/file/:folder/:filename', async (req, res) => {
    res.sendFile(path.join(PATH, req.params.folder, req.params.filename));
});

router.get('/', async (req, res, next)=>{
    const token = req.header('hahaha-token');
    jwt.verify(token, "simplecodehahaha", (err, decode)=>{
        if(err){
            res.send({trust: false});
        }else{
            if(decode.id === 1){
                res.send({trust: true})
            }else{
                res.send({trust: false});
            }
        }
    });
});

router.get('/mics/:id', async (req, res) => {
    try{
        const isFav = await UserFav.findAll({where: {prod_id: +req.params.id, user_id: +req.header('client')}});
        const isCart = await UserCart.findAll({where: {prod_id: +req.params.id, user_id: +req.header('client')}});
        res.send({status: true, trust: true,
            isFav: isFav.length, isCart: isCart.length});
    }catch(err){
        console.log(err);
        res.send({status: false,trust: false, message: 'sorry, something went wrong'});
    }
});

router.get('/:folder/files', async (req, res) => {
    fs.readdir(path.join(PATH, req.params.folder), (err, files) => {
        if(err)
            res.send({status: false,trust: false, message: 'sorry, something went wrong'});
        else{
            res.send({status: true, trust: true, files});
        }
    });
});

router.post('/add', async (req, res) => {
    try{
        const token = req.header('hahaha-token');
        jwt.verify(token, "simplecodehahaha", (err, decode)=>{
            if(err || decode.id !== 1){
                res.send({trust: false});
            }
        }); 
        const {productTitle, productDesc, folder} = req.body;
        await Products.create({
            product_title: productTitle,
            product_desc: productDesc,
            img_folder: folder
        });
        res.send({status: true,trust: true, message: 'added Product!'});
    }catch(err){
        console.log(err);
        res.send({status: false,trust: false, message: 'sorry, something went wrong'});
    }
});

router.get('/all', async (req, res)=>{
    try{
        const products = await Products.findAll({});
        res.send({status: true, data: products});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

module.exports = router;