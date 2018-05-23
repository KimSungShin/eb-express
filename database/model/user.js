/**
 * Created by i99208 on 2016. 11. 9..
 */

const Sequelize = require('sequelize');
const db = require('../../database');
module.exports = db.define( 'user',{
    userId: { type: Sequelize.STRING(20), primaryKey: true },
    type: { type: Sequelize.STRING },
    joinDate: { type: Sequelize.DATE },
},{
    paranoid: true,
});
