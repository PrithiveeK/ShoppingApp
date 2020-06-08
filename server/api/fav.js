const router = require('express').Router();
const pool = require('../config/database');

router.put('/:id/update', async (req,res) =>{
    try{
        const { favList } = req.body;
        const updateQuery = await pool.query(
            "UPDATE users SET fav = $1 WHERE _id = $2",
            [`{${[...favList]}}`,+req.params.id]
        );
        res.send({status: true, message: 'updated fav!'});
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'Sorry!, something went wrong'});
    }
});
router.get('/:id/all', async (req, res)=>{
    try{
        const favs = await pool.query(
            "SELECT fav FROM users WHERE _id = $1",
            [+req.params.id]
        );
        if(favs.rows[0].fav === null){
            res.send({status: true, products: []});
        }else{
            const favProducts = await pool.query(
                "SELECT * FROM products WHERE _id = ANY($1)",
                [`{${[...favs.rows[0].fav]}}`]
            );
            res.send({status: true, data: favProducts.rows});
        }
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

module.exports = router;