let express = require('express');
let router = express.Router();
let passport = require('passport');


router.post('/loginWithPassword', function(req, res, next) {

    const {username, password} = req.body;
    
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

module.exports = router;