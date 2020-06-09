const router = require('express').Router();
const pool = require('../config/database');

router.use(require('../util/middleware'));

router.put('/:id/update', async (req,res) =>{
    try{
        const { cartList } = req.body;
        const updateQuery = await pool.query(
            "UPDATE users SET cart = $1 WHERE _id = $2",
            [`{${[...cartList]}}`, +req.params.id]
        );
        res.send({status: true, message: 'updated cart!'});
    }catch(err){
        console.log(err);
        res.send({ststus: false, message: 'Sorry!, something went wrong'});
    }
});
router.get('/:id/all', async (req, res)=>{
    try{
        const carts = await pool.query(
            "SELECT cart FROM users WHERE _id = $1",
            [+req.params.id]
        );
        if(carts.rows[0].cart === null){
            res.send({status: true, products: []});
        }else{
            const cartProducts = await pool.query(
                "SELECT * FROM products WHERE _id = ANY($1)",
                [`{${[...carts.rows[0].cart]}}`]
            );
            res.send({status: true, data: cartProducts.rows});
        }
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

module.exports = router;
