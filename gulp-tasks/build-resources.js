var babel = require('gulp-babel');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require("browserify");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var babelify = require("babelify");

module.exports = {

	server: function(gulp, CLIENT_COMP_DIR, SERVER_GEN_DIR) {

		return gulp
			.src(CLIENT_COMP_DIR + '/**/*.js')
			.pipe(babel({
				presets: ['react', 'es2015', 'stage-0']
			}))
			.pipe(gulp.dest(SERVER_GEN_DIR));

	},

	client: function(gulp, CLIENT_DIR, PUBLIC_DIR, NPM_DIR) {

		return browserify({
				debug: true,
		  		entries: [`${NPM_DIR}/js-polyfills/es5.js`, `${NPM_DIR}/js-polyfills/es6.js`, CLIENT_DIR + '/index.js']
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
			.pipe(gulp.dest(PUBLIC_DIR));

	},

	sass: function(gulp, CLIENT_COMP_DIR, PUBLIC_DIR) {

		return gulp
			.src(CLIENT_COMP_DIR + '/app/App.scss')
			.pipe(sassGlob())
			.pipe(sass({
				outputStyle: 'compressed',
				errLogToConsole: true,
				includePaths: [
	        		'./bower_components/normalize-scss/',
	        		'./bower_components/bourbon/app/assets/stylesheets/'
	      		]}).on('error', sass.logError))
			.pipe(concat('bundle.min.css'))
			.pipe(gulp.dest(PUBLIC_DIR));

	}
}
