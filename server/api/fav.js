const router = require('express').Router();
const {userfav: UserFav, products: Products, Sequelize} = require('../models');
const $in = Sequelize.Op.in;

router.use(require('../util/middleware'));

router.get('/all', async (req, res)=>{
    try{
        const favs = await UserFav.findAll({
            attributes: ['prod_id'], 
            where: {user_id: +req.header('client')}
        });
        if(favs.length){
            const favIds = favs.map(fav=>fav.prod_id);
            const favProducts = await Products.findAll({where: {id: {[$in]: favIds}}});
            res.send({status: true, data: favProducts});
        }
        else
        res.send({status: true, data: []});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

router.post('/:id/update', async (req,res) =>{
    try{
        await UserFav.create({prod_id: +req.params.id, user_id: +req.header('client')});
        res.send({status: true, message: 'updated fav!'});
    }catch(err){
        console.log(err);
        res.send({status: false, message: 'Sorry!, something went wrong'});
    }
});

router.delete('/:id/delete', async (req, res) => {
    try{
        await UserFav.destroy({where: {prod_id: +req.params.id, user_id: +req.header('client')}});
        res.send({status: true});
    }catch(err){
        console.log(err);
        res.send({status: false});
    }
});

module.exports = router;