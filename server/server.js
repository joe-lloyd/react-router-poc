var express = require('express');
var React = require('react');
var reactrouter = require('react-router');
var routes = require('./generated/routes');
var server = require('react-dom/server');

var app = express();

require('./modules/server_config')(app);


app.get('*', function(req, res){

	reactrouter.match({ routes:routes.default, location:req.url}, function(error, redirectLocation, renderProps){

		if (error) {
			res.status(500).send(error.message);
		} else if(redirectLocation) {
			console.log('redirectLocation');
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			console.log('renderProps');
			res.status(200).send((0, server.renderToString)(React.createElement(reactrouter.RouterContext, renderProps)));
		} else {
			res.status(404).send('Not found')
		}

	});

});

app.listen(3000, function(){
	console.log('Server is running');
});