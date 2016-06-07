var path = require('path');
var express = require('express');

var app = express();

require('./modules/server_config')(app);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
	res.send('Not Found', 404);
});

app.listen(3000, function(){
	console.log('Server is running');
});