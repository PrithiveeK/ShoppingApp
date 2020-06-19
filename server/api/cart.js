const router = require('express').Router();
const {usercart: UserCart, products: Products, sequelize, Sequelize} = require('../models');
const $in = Sequelize.Op.in;

router.use(require('../util/middleware'));

router.get('/all', async (req, res)=>{
    try{
        const count = await UserCart.findAll({
            attributes: ['prod_id', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            where: {user_id: +req.header('client')},
            group: ['prod_id']
        });
        if(count.length){
            const prodIds = count.map(prod=>prod.prod_id);
            const cartProducts = await Products.findAll({where: {id: {[$in]: prodIds}}});
            res.send({status: true, data: cartProducts, count: count});
        }
        res.send({status: true, data: [], count: []});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

router.post('/:id/update', async (req,res) =>{
    try{
        await UserCart.create({prod_id: +req.params.id, user_id: +req.header('client')});
        res.send({status: true, message: 'updated cart!'});
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'Sorry!, something went wrong'});
    }
});

router.delete('/:id/delete', async (req, res) => {
    try{
        const delId = await UserCart.findOne({
            attributes: ['id'],
            where: {prod_id: +req.params.id, user_id: +req.header('client')}
        });
        await UserCart.destroy({where: {id: delId.id}});
        res.send({status: true});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});


module.exports = router;
