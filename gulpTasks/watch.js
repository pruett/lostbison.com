var gulp = require('gulp');

gulp.task('www:watch', ['www', 'www:connect'], function() {
  gulp.watch(['./src/www/**/*.jade'], ['www:stylus']);
  gulp.watch(['./src/www/**/*.styl'], ['www:stylus']);
  gulp.watch(['./src/www/**/*.js'], ['www:js']);
  gulp.watch(['./src/www/images/*'], ['www:images']);
});

gulp.task('blog:watch', ['blog', 'blog:connect'], function() {
  gulp.watch(['./src/blog/**/*.jade'], ['blog:stylus']);
  gulp.watch(['./src/blog/**/*.styl'], ['blog:stylus']);
  gulp.watch(['./src/blog/**/*.js'], ['blog:js']);
  gulp.watch(['./src/blog/images/*'], ['blog:images']);
});
