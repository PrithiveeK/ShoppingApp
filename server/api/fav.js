const router = require('express').Router();
const pool = require('../config/database');

router.use(require('../util/middleware'));

router.get('/all', async (req, res)=>{
    try{
        const favProducts = await pool.query(
            "SELECT * FROM products WHERE _id IN (SELECT prod_id FROM userfav WHERE user_id = $1)",
            [+req.header('client')]
        );
        res.send({status: true, data: favProducts.rows});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

router.post('/:id/update', async (req,res) =>{
    try{
        await pool.query(
            "INSERT INTO userfav(user_id, prod_id) VALUES($1, $2)",
            [+req.header('client'), +req.body.prodId]
        );
        res.send({status: true, message: 'updated fav!'});
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'Sorry!, something went wrong'});
    }
});

router.delete('/:id/delete', async (req, res) => {
    try{
        await pool.query(
            "DELETE FROM userfav WHERE prod_id = $1 AND user_id = $2",
            [+req.params.id, +req.header('client')]
        );
        res.send({status: true});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

module.exports = router;