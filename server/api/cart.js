const router = require('express').Router();
const pool = require('../config/database');

router.use(require('../util/middleware'));

router.get('/all', async (req, res)=>{
    try{
        const cartProducts = await pool.query(
            "SELECT * FROM products WHERE _id IN (SELECT prod_id FROM usercart WHERE user_id = $1)",
            [+req.header('client')]
        );
        const count = await pool.query(
            "SELECT prod_id,Count(*) AS count FROM usercart WHERE user_id = $1 GROUP BY prod_id",
            [+req.header('client')]
        );
        res.send({status: true, data: cartProducts.rows, count: count.rows});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

router.get('/:id/count', async (req, res) => {
    try{
        const cartCount = await pool.query(
            "SELECT * FROM usercart WHERE user_id = $1 AND prod_id = $2",
            [+req.header('client'), +req.params.id]
        );
        res.send({status: true, data: cartCount.rowCount});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

router.post('/:id/update', async (req,res) =>{
    try{
        await pool.query(
            "INSERT INTO usercart(user_id, prod_id) VALUES($1, $2)",
            [+req.header('client'), +req.body.prodId]
        );
        res.send({status: true, message: 'updated cart!'});
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'Sorry!, something went wrong'});
    }
});

router.delete('/:id/delete', async (req, res) => {
    try{
        const delId = await pool.query(
            "SELECT _id FROM usercart WHERE user_id = $1 AND prod_id = $2",
            [+req.header('client'), +req.params.id]
        );
        await pool.query(
            "DELETE FROM usercart WHERE _id = $1",
            [delId.rows[0]._id]
        );
        res.send({status: true});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});


module.exports = router;
