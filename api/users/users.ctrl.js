
var User = require('../../models').User

const create = (req,res) =>{
    let nUser = {name: req.body.name }

    return User.create(nUser)
    .then(result =>{
        return res.json(result)
    })
}

const list = (req,res) =>{
    // var limit = req.query.limit || 10;
    // var offset = req.query.offset || 0;
    // if( Number.isNaN( parseInt(limit) ) ){
    //     return res.status(400).end();
    // }
    // if( Number.isNaN( parseInt(offset) ) ){
    //     return res.status(400).end();
    // }
    // var result = users.slice(offset,limit);
    // res.json(result);
    return User.findAll()
    .then(results =>{
        res.json(results);
    })
}

const get = (req,res) =>{
    var id = req.params.id

    var result = users.filter(user=>{
        return user.id == id
    })[0]

    res.json(result);
}

const del = (req,res) =>{
    var id = parseInt(req.params.id)

    users = users.filter(user => user.id !== id )

    var result = users.filter(user=>{
        return user.id == id
    })[0]

    res.status(204).end();
}


module.exports = {
    create,
    get,
    list,
    del
}