let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

const iterations = 10000;
const key = 512;
const digest = 'sha512';

const secret = process.env.SECRET;

let UserSchema = new mongoose.Schema({
    username:{  type:String, 
                required:[true, "username field must be filled"]},
    password:String,
    email:{ type:String, 
            required:[true, "email field must be filled"]},
    image:String,
    salt:String
}, {timestamps:true});

// -- setting password for the user before saving
UserSchema.pre('save', function(next){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password,this.salt,iterations,key,digest).toString('hex');
    next();
});

// -- custom methods
UserSchema.methods.validatePassword = function(password){
    let passwordHash = crypto.pbkdf2Sync(password, this.salt, iterations, key, digest).toString('hex');
    return this.password == passwordHash;
}

UserSchema.methods.generateJWT = function(){
    let now = new Date();
    let expired = new Date(now);
    expired.setDate(now.getDate() + 7);

    return jwt.sign({
        id:this._id,
        username:this.username,
        exp: parseInt(expired.getTime() / 1000)
    },secret);
}

UserSchema.methods.toAuthJson = function(){
    return {
        username: this.username,
        email:this.email,
        token: this.generateJWT()
    };
}

UserSchema.methods.toProfileJSON = function(){
    return {
        username: this.username,
        email: this.email,
        image: ''
    };
}

mongoose.model('user', UserSchema);