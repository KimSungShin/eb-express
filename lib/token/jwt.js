/**
 * Created by i99208 on 2016. 11. 15..
 */


var jwt = require('jsonwebtoken');


var EXPIRES = 60 * 24; // 1 day

// JWT 토큰 생성 함수
/*
function signToken(key,value,exp) {
    var expIn = exp || EXPIRES ;
    return signTokenByJson({key:value},expIn);
}
*/

function signToken(obj, exp) {
    return jwt.sign(obj, SECRET ,{
        algorithm : 'HS256', //"HS256",qw12ER#$ "HS384", "HS512", "RS256", "RS384", "RS512" default SHA256
        expiresIn : exp //expires in 24 hours
    });
}

/*
function verifyToken(token){
    var decoded;
    //동기처리
    try {
        decoded = jwt.verify(token,SECRET);
        //console.log("sync : ", decoded);
    } catch(err){
        //console.log(err);
        return err;
    }
    return decoded;
}
*/

function verifyToken(token, decoded) {
    jwt.verify(token,SECRET,function(err,decoded){
        if(err){
            done(err,decoded);
        }
        else{
            done(null,decoded);
        }
    });
}

function expiresIn(numDays) {
    var dateObj = new Date();
    console.log(dateObj.setDate(dateObj.getDate() + numDays));
    return dateObj.setDate(dateObj.getDate() + numDays);
}

exports.generate =  signToken;

exports.verify = verifyToken;


/*
var tt = signToken('email','test1@test.com',null);
console.log( tt );
verifyToken(tt) ;
*/

//expiresIn(3);