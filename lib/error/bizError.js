/**
 * Created by CYK on 2016-11-30.
 */

const error = require('./index.js');

function BizError (code,message)  {
    this.code = code;
    this.error = error( this.code, message );
}

BizError.prototype = new Error();
BizError.prototype.constructor = BizError;

BizError.prototype.json = function(){
    return this.error;
};

BizError.prototype.print = function(){
    console.log( 'code=[%d] name=[%s]',this.code,this.name );
};

BizError.prototype.getError = function(){
    return this.error;
};

BizError.prototype.getMessage = function(){
    return this.error;
};




//const er = new BizError(500);
/*
try{
    throw new BizError(500);
}catch(err){
    console.log(err);
}
*/

module.exports = BizError;