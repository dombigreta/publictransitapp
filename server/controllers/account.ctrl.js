let express = require('express');
let router = express.Router();
let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('user');


router.post('/loginWithPassword', function(req, res, next) {

    const {username, password} = req.body;
    
    //TODO better validation
    if(!username){
        return res.status(422).json({errors:{username:'username must be filled'}});
    }

    if(!password){
        return res.status(422).json({erros:{password:'password must be filled'}});
    }

    passport.authenticate('local', {session:false}, (err, user, info) => {
        if(err){
            next(err);
        }

        if(user){
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJson()})
        }
        else{
            return res.status(422).json(info);
        }

    })(req,res,next);
});

router.post('/createUser', function(req,res,next){
    //TODO validation 
    const {username, password, email} =  req.body;
    console.log(`${username} - ${password} - ${email}`)
    let user = new User();

    user.username = username;
    user.password = password;
    user.email = email;
    console.log(user);
    user.save().then(() => {
        return res.json({user: user.toAuthJson()});
    }).catch(err => res.json(err));
})

module.exports = router;