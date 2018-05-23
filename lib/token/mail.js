/**
 * Created by i99208 on 2016. 11. 15..
 */

const jwt = require('jsonwebtoken');
const config = require('config');
const error = require('../../lib/error');

const SEC = config.get('Token.mail.key');
const OPT = config.get('Token.mail.options');



function signToken( obj, exp ) {
    return jwt.sign( obj, SEC , OPT );
}

function verifyToken( tok, done ) {

    jwt.verify( tok, SEC, function(err,decoded){

        console.log('lib/token/mail verifyToken');

        if(err){
            //console.log(err);
            // 이메이 토큰 검증 내부 오류
            done(error(502),decoded);
        }
        else {

            //console.log(decoded);

            var now = Date.now() / 1000;

            //console.log(decoded.exp);
            //console.log(now);

            if (decoded.exp) {
                if (decoded.exp <= now) {
                    // 토큰 유효시간 만료
                    done(error(205), decoded);
                }
            }

            done(null,decoded);

        }
    });
}

exports.generate =  signToken;
exports.verify = verifyToken;
