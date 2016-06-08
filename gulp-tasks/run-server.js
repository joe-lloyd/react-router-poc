var nodemon = require('gulp-nodemon');

module.exports = function(gulp, cb) {

	return nodemon({
		script: 'app/server/index.js'
	}).once('start', cb);

}