/**
 * Created by i99208 on 2016. 11. 9..
 */

const Sequelize = require('sequelize');
const db = require('../../database');
module.exports = db.define( 'users',{
	id:      { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: Sequelize.STRING },

})
