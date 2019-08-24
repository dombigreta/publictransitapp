require('dotenv/config');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const user = require('./models/user');
const mongoose = require('mongoose');
const passport = require('./configurations/passport.config');
const accountCtrl = require('./controllers/account.ctrl');
const userCtrl = require('./controllers/user.ctrl');



app.listen(process.env.PORT, () => {
    console.log(` app listens on ${process.env.PORT}`);
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/account', accountCtrl);
app.use('/user',userCtrl);

mongoose.connect(`${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.DATABASE_NAME}`)
.then(() => {
    console.log('mongo was connected')
});
