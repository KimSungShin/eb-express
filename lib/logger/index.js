/**
 * Created by i99208 on 2016. 11. 16..
 */


const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const config = require('config');
const moment = require('moment');

const winstonConsole = winston.transports.Console;

const timeStampFormat = function () {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2016-05-01 20:14:28.500 +0900'
};

const twd = config.get('Logger.transports.winston-daily');
const twc = config.get('Logger.transports.winston-console');
const ewd = config.get('Logger.exceptionHandlers.winston-daily');
const ewc = config.get('Logger.exceptionHandlers.winston-console');

twd.timestamp = timeStampFormat;
twc.timestamp = timeStampFormat;
ewd.timestamp = timeStampFormat;
ewc.timestamp = timeStampFormat;

const logger = new (winston.Logger)({
           transports: [ new winstonDaily( twd ), new winstonConsole( twc ) ],
    exceptionHandlers: [ new winstonDaily( ewd ), new winstonConsole( ewc ) ]  });

module.exports = logger;
