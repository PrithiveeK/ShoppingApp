const router = require('express').Router();
const pool = require('../config/database');

router.post('/add', async (req, res) => {
    try{
        const {productTitle, productDesc} = req.body;
        const insertUser = await pool.query(
            "INSERT INTO products(productTitle, productDesc) VALUES($1,$2) RETURNING *",
            [productTitle, productDesc]
        );
        res.send({status: true, message: 'added Product!'});
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'sorry, something went wrong'});
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