const router = require('express').Router();
const Users = require('../models').users;

router.get('/:id', async (req, res) => {
    Users.findOne({where: {id: +req.params.id}})
        .then(user=>res.send({status:true, data:{id:user.id, username: user.username}}))
        .catch(err=>res.send({status:false}));
});

module.exports = router;