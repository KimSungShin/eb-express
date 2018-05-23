/**
 * Created by CYK on 2017-01-12.
 */


const contains = ( arr, val )=>{

    if(!val){
        return false;
    }

    let ret = false;

    arr.forEach( v=>{
        if(val===v) {
            ret= true;
        }
    })
    return ret;
}

module.exports.contains = contains;