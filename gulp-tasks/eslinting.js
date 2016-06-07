var eslint = require('gulp-eslint');

module.exports = {
    eslint: function (gulp, CLIENT_COMP_DIR) {

        return gulp
            .src(CLIENT_COMP_DIR + '/**/*.js')
            .pipe(eslint({
                configFile: __dirname + "/../eslint.json"
            }))
            .pipe(eslint.format())
            .pipe(eslint.failOnError());

    },

    eslintdev: function (gulp, CLIENT_COMP_DIR) {

        return gulp
            .src(CLIENT_COMP_DIR + '/**/*.js')
            .pipe(eslint({
                configFile: __dirname + "/../eslint.json"
            }))
            .pipe(eslint.format());

    }
};