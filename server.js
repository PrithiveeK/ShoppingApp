const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apis = require('./server/api');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded('utf8'));
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'build')));
    
    app.get('/', (req, res)=>{
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.use('/api/account/user',apis.user);
app.use('/api/account/login',apis.login);
app.use('/api/account/signup',apis.signup);
app.use('/api/fav',apis.fav);
app.use('/api/cart',apis.cart);
app.use('/api/product',apis.product);


app.listen(5000, ()=>console.log('server started'));