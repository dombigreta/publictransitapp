let jwt = require('express-jwt');
let secret = process.env.SECRET;

function getTokenFromHeader(req){
    if(req.headers.authorization){
        let authInfo = req.headers.authorization.split(' ');
        if(authInfo[0] === 'Token' || authInfo[0] === 'Bearer'){
            return authInfo[1];
        }
    }
    return null;
}

let auth = {
    required:jwt({
        secret:secret,
        userProperty:'payload',
        getToken:getTokenFromHeader
    }),
    optional:jwt({
        secret:secret,
        userProperty:'payload',
        getToken:getTokenFromHeader,
        credentialsRequired:false
    })
}

module.exports = auth;
