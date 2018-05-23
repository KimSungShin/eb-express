/**
 * Created by CYK on 2016-11-25.
 */


//const errorMessage = require('../../config/defaultMessage.json');
const errorMessage = require('../../config/errorMessage.json');



const get = ( codeStr, message )=>{
    const code = parseInt(codeStr);
    //console.log(code);

    if( !codeStr ){
        return {message: { code:'000', name: '정상처리', message: '정상처리' }};
    }

    if(message){
        return {message: { code:code, name: errorMessage[code].name, message: message }};
    }
    else{
        return {message: { code:code, name: errorMessage[code].name, message: errorMessage[code].message }};
    }
};

module.exports = get;