const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('user');

router.param('username',(req, res, next, username) => {
    user.findOne({username: username}).then((user) => {
        if(!user){
            return res.sendStatus(404);
        }
        req.profile = user;
        return next();
    }).catch(err => next(err));

});

router.get('/:username', (req, res, next) => {
   return res.json({profile: req.profile.toProfileJSON()});
})


module.exports = router;