const router = require('express').Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const pool = require('../config/database');
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
        const imgFolder = await pool.query(
            "SELECT name FROM productimg WHERE prod_id = $1",
            [+req.params.id]
        );
        const isFav = await pool.query(
            "SELECT * FROM userfav WHERE user_id = $1 AND prod_id = $2",
            [+req.header('client'), +req.params.id]
        );
        const isCart = await pool.query(
            "SELECT * FROM usercart WHERE user_id = $1 AND prod_id = $2",
            [+req.header('client'), +req.params.id]
        );
        if(imgFolder.rowCount)
        fs.readdir(path.join(PATH, imgFolder.rows[0].name), (err, files) => {
            if(err)
                res.send({status: false,trust: false, message: 'sorry, something went wrong'});
            else{
                res.send({status: true, truth: true, 
                    folder: imgFolder.rows[0].name, files,
                isFav: isFav.rowCount, isCart: isCart.rowCount});      
            }
        });
        else
        res.send({status: true, trust: true,
            folder: '', files: [],
            isFav: isFav.rowCount, isCart: isCart.rowCount});
    }catch(err){
        console.log(err);
        res.send({status: false,trust: false, message: 'sorry, something went wrong'});
    }
});

router.post('/img', singleFileUpload(), async (req, res) => {
    res.send(imgFolder);
});

router.get('/file/:folder/:filename', async (req, res) => {
    res.sendFile(path.join(PATH, req.params.folder, req.params.filename));
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
        const insertUser = await pool.query(
            "INSERT INTO products(productTitle, productDesc) VALUES($1,$2) RETURNING _id",
            [productTitle, productDesc]
        );
        const insertImage = await pool.query(
            "INSERT INTO productimg(name, prod_id) VALUES($1, $2)",
            [folder, +insertUser.rows[0]._id]
        );
        res.send({status: true,trust: true, message: 'added Product!'});
    }catch(err){
        console.log(err);
        res.send({status: false,trust: false, message: 'sorry, something went wrong'});
    }
});
router.get('/all', async (req, res)=>{
    try{
        const products = await pool.query(
            "SELECT * FROM products"
        );
        res.send({status: true, data: products.rows});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});
router.get('/img/:id', async (req, res) => {
    try{
        const findImg = await pool.query(
            "SELECT name from productimg WHERE prod_id = $1",
            [+req.params.id]
        );
        res.sendFile(path.join(__dirname, '..', 'public', 'images', findImg.rows[0].name));
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});
module.exports = router;