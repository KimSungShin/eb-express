/**
 * Created by i99208 on 2016. 11. 9..
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.RDS_DATABASE, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
	host: process.env.RDS_HOSTNAME,
	dialect: 'mysql',
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

});


module.exports = sequelize;

/*
var sequelize = new Sequelize('database', null, null, {
    dialect: 'mysql',
    port: 3306
    replication: {
        read: [
            { host: '8.8.8.8', username: 'another_user_name_than_root', password: 'log_cats!' },
            { host: 'localhost', username: 'root', password: null }
        ],
        write: { host: 'localhost', username: 'root', password: null }
    },
    pool: { // If you want to override the options used for the read pool you can do so here
        maxConnections: 20,
        maxIdleTime: 30000
    },
})
*/