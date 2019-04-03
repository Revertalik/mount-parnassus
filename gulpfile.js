const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');

require('postcss-import');

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('css', () => {
    const config = (file) => ({
        plugins: [
            require('postcss-import')({ root: file.dirname /* => ./src/css */ })
        ]
    });
    return gulp.src('./src/css/main.css')
        .pipe(postcss(config))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./docs/css'));
});

gulp.task('img', () => {
    return gulp.src('./src/img/*.*')
        .pipe(gulp.dest('./docs/img'));
});

