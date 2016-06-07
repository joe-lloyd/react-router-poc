'use strict';

var gulp = require('gulp'),
		path = require('path'),
		babelify = require('babelify'),
		browserify = require('browserify'),
  	uglify = require('gulp-uglify');


const CLIENT_DIR = path.resolve(__dirname, 'client');
const CLIENT_COMP_DIR = path.resolve(__dirname, 'client/components');
const SERVER_DIR = path.resolve(__dirname, 'server');
const SERVER_GEN_DIR = path.resolve(__dirname, 'server/generated');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const NPM_DIR = path.resolve(__dirname, 'node_modules');

// Runs the server
gulp.task('start', function (cb) {
	return require('./gulp-tasks/run-server.js')(gulp, cb);
});


//linting
gulp.task('eslint', function() {
	return require('./gulp-tasks/eslinting.js').eslint(gulp, CLIENT_COMP_DIR);
});

gulp.task('eslint-dev', function() {
	return require('./gulp-tasks/eslinting.js').eslintdev(gulp, CLIENT_COMP_DIR);
});


// builds the components serverside
gulp.task('buildComponentsServer', function() {
	return require('./gulp-tasks/build-resources.js').server(gulp, CLIENT_COMP_DIR, SERVER_GEN_DIR);
});

// builds the client minified files
gulp.task('buildComponentsClient', function(){
	return require('./gulp-tasks/build-resources.js').client(gulp, CLIENT_DIR, PUBLIC_DIR, NPM_DIR);
});

// builds sass files
gulp.task('sass', function () {
	return require('./gulp-tasks/build-resources.js').sass(gulp, CLIENT_COMP_DIR, PUBLIC_DIR);
});

gulp.task('build', ['eslint', 'buildComponentsServer', 'buildComponentsClient', 'sass']);

gulp.task('watch', function() {
	gulp.watch(CLIENT_COMP_DIR + '/**/*.scss', ['sass']);
	gulp.watch(CLIENT_DIR + '/**/*.js', ['eslint-dev', 'buildComponentsClient']);
	gulp.watch([SERVER_DIR + '/**/*.js', '!' + SERVER_GEN_DIR + '/**/*.js'], ['eslint-dev', 'buildComponentsServer']);
});

gulp.task('default', [ 'start', 'watch' ]);