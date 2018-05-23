/**
 * Created by i99208 on 2016. 11. 16..
 */

const jwt = require('jsonwebtoken');
const config = require('config');

const SEC = config.get('Token.auth.key');
const OPT = config.get('Token.auth.options');



function signToken( obj, exp ) {
    return jwt.sign( obj, SEC , OPT );
}


function verifyToken( tok, done ) {
    jwt.verify( tok, SEC, function(err,decoded){
        if(err){
            done(err,decoded);
        }
        else{

            var now = Date.now() / 1000;
            if (decoded.exp <= now) {
                done({"status": 400,"message": "Token Expired"},decoded);
            }

            done(null,decoded);
        }
    });
}

const decode = ( t ) =>{
    return jwt.decode( t );
}

exports.generate =  signToken;
exports.verify = verifyToken;
exports.decode = decode;
