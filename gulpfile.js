'use strict';

var gulp = require('gulp'),
	path = require('path'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify');


const CLIENT_DIR = path.resolve(__dirname, 'app/client');
const COMP_DIR = path.resolve(__dirname, 'app/shared/components');
const DIST_DIR = path.resolve(__dirname, 'dist');
const NODE_DIR = path.resolve(__dirname, 'node_modules');

// Runs the server
gulp.task('start', function (cb) {
	return require('./gulp-tasks/run-server.js')(gulp, cb);
});


//linting
gulp.task('eslint', function() {
	return require('./gulp-tasks/eslinting.js').eslint(gulp, COMP_DIR);
});

gulp.task('eslint-dev', function() {
	return require('./gulp-tasks/eslinting.js').eslintdev(gulp, COMP_DIR);
});


// builds the client minified files
gulp.task('buildDistJs', function(){
	return require('./gulp-tasks/build-resources.js').dist(gulp, CLIENT_DIR, DIST_DIR, NODE_DIR);
});

// builds sass files
gulp.task('sass', function () {
	return require('./gulp-tasks/build-resources.js').sass(gulp, COMP_DIR, DIST_DIR);
});

gulp.task('build', ['eslint', 'buildDistJs', 'sass']);

gulp.task('watch', function() {
	gulp.watch(COMP_DIR + '/**/*.scss', ['sass']);
	gulp.watch(CLIENT_DIR + '/**/*.js', ['eslint-dev', 'buildDistJs']);
});

gulp.task('default', [ 'start', 'watch' ]);