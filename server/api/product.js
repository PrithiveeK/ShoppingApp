const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/database');


router.get('/', async (req, res, next)=>{
    const token = req.header('hahaha-token');
    console.log(token);

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

router.post('/add', async (req, res) => {
    try{
        const token = req.header('hahaha-token');
        console.log(token);
        jwt.verify(token, "simplecodehahaha", (err, decode)=>{
            if(err || decode.id !== 1){
                res.send({trust: false});
            }
        }); 
        const {productTitle, productDesc} = req.body;
        const insertUser = await pool.query(
            "INSERT INTO products(productTitle, productDesc) VALUES($1,$2) RETURNING *",
            [productTitle, productDesc]
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
})
module.exports = router;