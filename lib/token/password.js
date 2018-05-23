/**
 * Created by i99208 on 2016. 11. 16..
 */

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');

const token = require('./index');

const ALG = config.get('Token.password.options.algorithm');
const DIG = config.get('Token.password.options.digest');

function signToken( plain , pSalt, callback ) {

    try{
        let salt = pSalt||token('random').generate(12);
        let hash = crypto.createHmac( ALG, salt ).update(plain).digest(DIG);
        callback( null, hash );
    }
    catch(err){
        callback( err, null );
    }
}

function signTokenSync( plain , pSalt ) {
    let salt,hash;
    try{
        salt = pSalt||token('random').generate(12);
        hash = crypto.createHmac( ALG, salt ).update(plain).digest(DIG);
    }
    catch(err){
        return null;
    }
    return hash;
}

function verifyToken( inPassword, inSalt, inHashedPassword, callback ){

    signToken( inPassword, inSalt, function( err, hash ){

        if(!err){

            if( inHashedPassword === hash ){
                callback(null,true);
            }
        }
        else{
            callback(err,false);
        }

    });
}


function verifyTokenSync( inPassword, inSalt, inHashedPassword ){
    let hash = crypto.createHmac( ALG, inSalt ).update(inPassword).digest(DIG);
    return inHashedPassword === hash;
}

exports.generate =  signToken;
exports.generateSync =  signTokenSync;
exports.verify = verifyToken;
exports.verifySync = verifyTokenSync;


