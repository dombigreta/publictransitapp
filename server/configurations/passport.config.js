let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let user = mongoose.model('user');

let strategyOptions = {
    usernameField:'user[username]',
    passwordField:'user[password]'
};

passport.use(new LocalStrategy({
    strategyOptions
}, (username, password, done) => {
    user.findOne({username:username}).then((user) => {
        if(!user || !user.validatePassword(password)){
            return done(null,false,{errors:{'username or password': 'is incorrect'}});
        }
        return done(null,user);
    }).catch((err) => done(err));
}));