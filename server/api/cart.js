const router = require('express').Router();
const {usercart: UserCart, products: Products, sequelize} = require('../models');

router.use(require('../util/middleware'));

router.get('/all', async (req, res)=>{
    try{
        Products.findAll({
            attributes: ['id','product_title','product_desc',[sequelize.fn("COUNT", sequelize.col("usercarts.productId")), "count"]],
            include: [{
                model: UserCart,
                where: {"userId": +req.header('client')},
                attributes: []
            }],
            group: ["products.id"]
        }).then(data=>{
            data = data.map(d=>d.dataValues)
            res.send({status: true, data});
        });
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
