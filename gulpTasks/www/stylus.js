var gulp         = require('gulp'),
    connect      = require('gulp-connect'),
    stylus       = require('gulp-stylus'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    minifyCSS    = require('gulp-minify-css'),
    inlinesource = require('gulp-inline-source'),
    connect      = require('gulp-connect');

gulp.task('www:stylus:compile:critical', function () {
  return gulp.src(['./src/www/assets/stylus/critical/*.styl'])
    .pipe(stylus({ 'include css': true }))
    .pipe(gulp.dest('./build/www/css/critical/'));
});

gulp.task('www:stylus:compile:pages', function () {
  return gulp.src(['./src/www/assets/stylus/pages/*.styl'])
    .pipe(stylus({ 'include css': true }))
    .pipe(gulp.dest('./build/www/css/'));
});

gulp.task('www:css:prefix', ['www:stylus:compile:critical', 'www:stylus:compile:pages'], function() {
  return gulp.src('./build/www/css/**/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('./build/www/css'))
});

gulp.task('www:css:minify', ['www:css:prefix'], function() {
  return gulp.src('./build/www/css/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/www/css'))
});

gulp.task('www:css:inline', ['www:css:minify'], function() {
  return gulp.src('./build/www/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./build/www'))
    .pipe(connect.reload());
});

gulp.task('www:stylus', ['www:jade', 'www:css:inline']);
