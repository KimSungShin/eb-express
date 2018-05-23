/**
 * Created by CYK on 2016-11-30.
 */

const error = require('./index');
const messageConf = require('../../config/errorMessage.json');

function BizMessage (code, name, message)  {
    this.code = code;

    if(name){
        this.name = name;
    }
    else{
        //const codeStr = parseInt(code);
        this.name = messageConf[parseInt(code)].name;
    }

    if(message){
        this.message = message;
    }
    else{
        //const code = parseInt(parseInt(code));
        this.message = messageConf[parseInt(code)].message;
    }
}

BizMessage.prototype = new Object();
BizMessage.prototype.constructor = BizMessage;

BizMessage.prototype.json = function(){

    const code = parseInt(codeStr);

    const result = { code: this.code }


    if(this.name){
        result['name'] = this.name;
    }

    if(this.message){
        return {message: { code:code, name: message[code].name, message: message }};
    }
    else{
        return {message: { code:code, name: message[code].name, message: message[code].message }};
    }

    return { message: { code: this.code, name: this.name, message: this.message  }  }

};

BizMessage.prototype.print = function(){
    console.log( 'code=[%d] name=[%s] message=[%s]',this.code,this.name,this.message );
};


//const er = new BizError(500);
/*
try{
    throw new BizError(500);
}catch(err){
    console.log(err);
}
*/

module.exports = BizMessage;

