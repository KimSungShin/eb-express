
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

    return User.findOne({where: {id}})
    .then(user=>{
        return res.json(user)
    })
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
    .then(user=>{
        return res.json(user)
    })

}

const del = (req,res) =>{
	var id = req.params.id

    return User.destroy({where: {id}, returning:true })
    .then(user=>{
        return res.json(user)
    })


}


module.exports = {
    create,
    get,
	modify,
    list,
    del
}