/**
 * Created by CYK on 2016-12-09.
 */



const code = require('../../../config/commonCode.json');


const getUpdateFields = ( table, body )=>{

    let update = {};

    if( !body ){
        return update;
    }

    if( !code[table] || !code[table].update ){
        return null;
    }

    let fields = code[table].update.fields;
    let bodyKeys = Object.keys(body);



    if( !bodyKeys || bodyKeys.length===0){
        return null;
    }

    bodyKeys.forEach( (key)=>{

        if( contains(fields,key) ){
            update[key] = body[key];
        }

    })
    return update;
}

const verifyUpdateFields = ( table, body, cb )=>{

    let update;
    let except;

    if( !body ){
        return update;
    }

    if( !code[table] || !code[table].update ){
        return null;
    }

    let fields = code[table].update.fields;
    let bodyKeys = Object.keys(body);



    if( !bodyKeys || bodyKeys.length===0){
        return null;
    }

    bodyKeys.forEach( (key)=>{

        if( contains(fields,key) ){
            if(!update){
                update = {};
            }
            update[key] = body[key];
        }
        else{
            if(!except){
                except = [];
            }
            except.push(key);
        }
    })

    return cb( except, update );
}

const contains = ( arr, val )=>{
    let ret = false;
    arr.forEach( v=>{
        if(val===v) {
            ret= true;
        }
    })
    return ret;
}

/*
let testBody = {
    openYn: false,
}

console.dir( getUpdateFields( 'Snap', testBody ) );
*/

module.exports.get = getUpdateFields;
module.exports.verify = verifyUpdateFields;

