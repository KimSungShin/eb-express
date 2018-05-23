/**
 * Created by i99208 on 2016. 11. 15..
 */

const jwt = require('jsonwebtoken');
const config = require('config');
const error = require('../../lib/error');

const SEC = config.get('Token.share.key');
const OPT = config.get('Token.share.options');



function signToken( obj ) {
    return jwt.sign( obj, SEC , OPT );
}

function verifyToken( tok, done ) {

    jwt.verify( tok, SEC, function(err,decoded){

        //console.log('lib/token/mailPassword verifyToken');

        if(err){
            console.log(err);

            if( err.name === 'TokenExpiredError' ){
                // 이메이 토큰 검증 내부 오류
                done(error(503),null);
            }
            else{
                done(error(502),null);
            }
        }

        //console.log('decoded=%j',decoded);

        done(null,decoded);


        /*
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



        }
        */
    });
}

exports.generate =  signToken;
exports.verify = verifyToken;
