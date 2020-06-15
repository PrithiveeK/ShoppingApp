const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../config/database');

router.post('/', async (req, res) => {
    try{
        let {userName, userEmail, userPassword} = req.body;
        const checkAccount = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [userEmail]
        );
        if(checkAccount.rowCount){
            res.send({status: true, success: false});
        }else{
            const salt = await bcrypt.genSalt(10);
            userPassword = await bcrypt.hash(userPassword,salt);
            const insertUser = await pool.query(
                "INSERT INTO users(username,email,password,fav,cart) VALUES($1,$2,$3) RETURNING *",
                [userName, userEmail, userPassword]
            );
            res.send({status: true, success:true, data: insertUser.rows[0]});
        }
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'sorry, something went wrong'});
    }
});

module.exports = router;