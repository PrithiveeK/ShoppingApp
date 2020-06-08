const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../config/database');

router.post('/', async (req, res) => {
    try{
        const {userEmail, userPassword} = req.body;
        const loginUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [userEmail]
        );
        const validation = await bcrypt.compare(userPassword, loginUser.rows[0].password);
        if(validation)
        res.send({status: true, success: true, data: loginUser.rows[0]});
        else
        res.send({status: true, success: false, message: 'Invalid Email or Password'});
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'sorry, something went wrong'});
    }
});

module.exports = router;