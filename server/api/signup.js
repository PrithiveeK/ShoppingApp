const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../models').users;

router.post('/', async (req, res) => {
    let {userName, userEmail, userPassword} = req.body;
    const salt = await bcrypt.genSalt(10);
    userPassword = await bcrypt.hash(userPassword,salt);
    Users.create({
        username: userName,
        email: userEmail,
        password: userPassword
    }).then(newUser=>
        res.send({status: true, success: true, data: {_id:newUser.id, username: newUser.username}})
    ).catch(err=>{console.log(err);res.send({status: true, success: false})});
});

module.exports = router;