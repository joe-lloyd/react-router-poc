var morgan = require('morgan');
var express = require('express');

module.exports = function(app){
	
	app.use(morgan('combined'));
	app.use(express.static('public'));
	app.set('views', './views');
	app.set('view engine', 'ejs');

};