var gulp = require('gulp');

gulp.task('watch', ['default', 'www:connect'], function() {
  gulp.watch(['./src/**/*.jade'], ['www:stylus']);
  gulp.watch(['./src/**/*.styl'], ['www:stylus']);
  gulp.watch(['./src/**/*.js'], ['www:js']);
  gulp.watch(['./src/images/*'], ['www:images']);
});
