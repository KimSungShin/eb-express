
var User = require('../../database/model/user')

const create = (req,res) =>{
    let nUser = {name: req.body.name }

    return User.create(nUser)
    .then(result =>{
        return res.json(result)
    })
}

const list = (req,res) =>{

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

const modify = (req,res) =>{
	var id = req.params.id

	let body = req.body

    let options = {
	    where: {
	        id
	    },
        returning: true
    }

    return User.update(body,options)

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
	modify,
    list,
    del
}