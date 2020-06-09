module.exports = function (req, res, next){
    if(req.header('client')){
        next();
    }
    else{
        res.send({message: 'Access Denied'});
    }
}