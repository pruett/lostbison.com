var gulp  = require('gulp');

gulp.task('default', [
  'www:stylus', // this task compiles jade first
  //'blog:stylus',
  'www:js',
  //'blog:js',
  'www:images',
  //'blog:images',
  'www:connect',
  //'blog:connect',
  //'www:vendor',
  'watch'
]);
