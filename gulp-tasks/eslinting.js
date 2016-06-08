var eslint = require('gulp-eslint');

module.exports = {
    eslint: function (gulp, COMP_DIR) {

        return gulp
            .src(COMP_DIR + '/**/*.js')
            .pipe(eslint({
                configFile: __dirname + "/../eslint.json"
            }))
            .pipe(eslint.format())
            .pipe(eslint.failOnError());

    },

    eslintdev: function (gulp, COMP_DIR) {

        return gulp
            .src(COMP_DIR + '/**/*.js')
            .pipe(eslint({
                configFile: __dirname + "/../eslint.json"
            }))
            .pipe(eslint.format());

    }
};