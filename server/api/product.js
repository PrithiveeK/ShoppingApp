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
        const products = await Products.findAll({
            attributes: ['id','product_title','product_desc',[sequelize.fn("COUNT", sequelize.col("usercarts.productId")), "count"]],
            include: [{
                model: usercart,
                required: false,
                where: {"userId": +req.header('client')},
                attributes: []
            },{
                model: userfav,
                required: false,
                where: {"userId": +req.header('client')},
                attributes: ['id']
            }],
            group: ["products.id","userfav.id"]
        });
        const data = products.map(p=>p.dataValues);
        res.send({status: true, data});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

module.exports = router;