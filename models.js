var Sequelize = require('sequelize')

var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'  
})

var User = sequelize.define('user', {
    name: Sequelize.STRING
})


module.exports = {
    User,
    Sequelize,
    sequelize
}