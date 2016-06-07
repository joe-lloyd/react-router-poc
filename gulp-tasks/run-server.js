var nodemon = require('gulp-nodemon');

module.exports = function(gulp, cb) {

	return nodemon({
		script: 'server/server.js'
	}).once('start', cb);

}