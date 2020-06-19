const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../models').users;

router.post('/', async (req, res) => {
    const {userEmail, userPassword} = req.body;
    Users.findOne({where: {email: userEmail}})
        .then(async (user)=>{
            if(user){
                const validation = await bcrypt.compare(userPassword, user.password);
                if(validation)
                res.send({status: true, success: true, data: {_id: user.id, username: user.username}});
                else
                res.send({status: true, success: false, message: 'Invalid Email or Password'});
            }else
            res.send({status: true, success: false, message: 'Invalid Email or Password'});
        }).catch(err=>res.send({status: false, message: 'sorry, something went wrong!'}));
});

module.exports = router;