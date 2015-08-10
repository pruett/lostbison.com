var gulp  = require('gulp');

gulp.task('www', [
  'www:stylus', // this task compiles jade first
  'www:js',
  'www:images',
  'www:files'
]);

gulp.task('blog', [
  'blog:stylus',
  'blog:js',
  'blog:images',
  'blog:connect',
  'blog:files'
]);
