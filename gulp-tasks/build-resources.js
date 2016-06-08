var babel = require('gulp-babel');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
//var streamify = require('gulp-streamify');
//var uglify = require('gulp-uglify');
var browserify = require("browserify");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var babelify = require("babelify");

module.exports = {

	dist: function(gulp, CLIENT_DIR, DIST_DIR, NODE_DIR) {

		return browserify({
				debug: true,
		  		entries: [`${NODE_DIR}/js-polyfills/es5.js`, `${NODE_DIR}/js-polyfills/es6.js`, CLIENT_DIR + '/index.js']
			})
			.transform(babelify.configure({
				sourceMapRelative: CLIENT_DIR,
				presets: ['react', 'es2015', 'stage-0']
			}))
			.bundle()
			.on('error', function(e){
				gutil.log(e);
			})
			.pipe(source('bundle.js'))
			.pipe(rename('bundle.min.js'))
			//.pipe(streamify(uglify()))
			.pipe(gulp.dest(DIST_DIR));

	},

	sass: function(gulp, COMP_DIR, DIST_DIR) {

		return gulp
			.src(COMP_DIR + '/App.scss')
			.pipe(sassGlob())
			.pipe(sass({
				outputStyle: 'compressed',
				errLogToConsole: true,
				includePaths: [
	        		'./bower_components/normalize-scss/',
	        		'./bower_components/bourbon/app/assets/stylesheets/'
	      		]}).on('error', sass.logError))
			.pipe(concat('bundle.min.css'))
			.pipe(gulp.dest(DIST_DIR));

	}
}
