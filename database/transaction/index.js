/**
 * Created by CYK on 2016-11-28.
 */
//process.env.NODE_CONFIG_DIR='../../config';
const config = require('config');
const start =  config.get('Sequelize.mysql.TRANSACTION');
module.exports = start;


//console.log(start);