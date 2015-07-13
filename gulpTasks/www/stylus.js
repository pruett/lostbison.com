var gulp         = require('gulp'),
    connect      = require('gulp-connect'),
    stylus       = require('gulp-stylus'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    minifyCSS    = require('gulp-minify-css'),
    inlinesource = require('gulp-inline-source'),
    connect      = require('gulp-connect');

gulp.task('stylus:compile', function () {
  return gulp.src(['./src/assets/stylus/main.styl', './src/assets/stylus/critical.styl'])
    .pipe(stylus({ 'include css': true }))
    .pipe(gulp.dest('./build/www/css/'));
});

gulp.task('css:prefix', ['stylus:compile'], function() {
  return gulp.src('./build/www/css/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('./build/www/css'))
});

gulp.task('css:minify', ['css:prefix'], function() {
  return gulp.src('./build/www/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/www/css'))
});

gulp.task('css:inline', ['css:minify'], function() {
  return gulp.src('./build/www/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./build/www'))
    .pipe(connect.reload());
});

gulp.task('www:stylus', ['www:jade', 'css:inline']);
