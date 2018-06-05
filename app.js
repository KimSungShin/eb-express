var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var router = require('./lib/router')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
//app.use('/users', usersRouter);

let originsWhitelist = [ 'http://localhost:8100' ]

console.log(` originsWhitelist=${JSON.stringify(originsWhitelist)} `)


var corsOptions = {
	origin: function(origin, callback){

		var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;

		console.log('!!!! originsWhitelist===>'+JSON.stringify(originsWhitelist))
		console.log('!!!! origin===>'+origin)
		console.log('!!!! isWhitelisted===>'+isWhitelisted)

		callback(null, isWhitelisted);
	},
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	credentials:true
}

app.use( cors(corsOptions) );

router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
