/**
 * Created by i99208 on 2016. 11. 9..
 */

const Sequelize = require('sequelize');
const config = require('config');


const sequelize = new Sequelize( config.get('Sequelize.mysql.db'),
                                 config.get('Sequelize.mysql.id'),
                                 config.get('Sequelize.mysql.password'),
                                 config.get('Sequelize.mysql.connection_info')  );


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