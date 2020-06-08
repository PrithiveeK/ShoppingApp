const router = require('express').Router();
const pool = require('../config/database');

router.get('/:id', async (req, res) => {
    try{
        const userInfo = await pool.query(
            "SELECT * FROM users WHERE _id = $1",
            [+req.params.id]
        );
        if(userInfo.rowCount)
        res.send({status: true, success:true, data: userInfo.rows[0]});
        else
        res.send({status: true, success: false, data: {}})
    }catch(err){
        console.log(err);
        req.send({status: false});
    }
});

module.exports = router;