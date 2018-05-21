var express = require('express');
var morgan = require('morgan');
var app = express();
const bodyParser = require('body-parser');



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use( '/users', require('./api/users'))

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

module.exports = app;