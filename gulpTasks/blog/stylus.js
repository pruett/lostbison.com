var gulp         = require('gulp'),
    connect      = require('gulp-connect'),
    stylus       = require('gulp-stylus'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    minifyCSS    = require('gulp-minify-css'),
    inlinesource = require('gulp-inline-source'),
    connect      = require('gulp-connect');

gulp.task('blog:stylus:compile:critical', function () {
  return gulp.src(['./src/blog/assets/stylus/critical/*.styl'])
    .pipe(stylus({ 'include css': true }))
    .pipe(gulp.dest('./build/blog/css/critical/'));
});

gulp.task('blog:stylus:compile:pages', function () {
  return gulp.src(['./src/blog/assets/stylus/pages/*.styl'])
    .pipe(stylus({ 'include css': true }))
    .pipe(gulp.dest('./build/blog/css/'));
});

gulp.task('blog:stylus:compile:posts', function () {
  return gulp.src(['./src/blog/assets/stylus/posts/*.styl'])
    .pipe(stylus({ 'include css': true }))
    .pipe(gulp.dest('./build/blog/css/'));
});

gulp.task('blog:css:prefix', ['blog:stylus:compile:critical', 'blog:stylus:compile:pages', 'blog:stylus:compile:posts'], function() {
  return gulp.src('./build/blog/css/**/*.css')
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('./build/blog/css'))
});

gulp.task('blog:css:minify', ['blog:css:prefix'], function() {
  return gulp.src('./build/blog/css/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/blog/css'))
});

gulp.task('blog:css:inline', ['blog:css:minify'], function() {
  return gulp.src('./build/blog/**/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./build/blog'))
    .pipe(connect.reload());
});

gulp.task('blog:stylus', ['blog:jade', 'blog:css:inline']);

