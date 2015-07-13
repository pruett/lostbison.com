var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('www:connect', function() {
  connect.server({
    root: 'build/www',
    port: 1234,
    livereload: true
  });
});

gulp.task('blog:connect', function() {
  connect.server({
    root: 'build/blog',
    port: 5678,
    livereload: true
  });
});
