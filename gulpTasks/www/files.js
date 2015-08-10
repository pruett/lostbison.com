var gulp = require('gulp');

gulp.task('www:files', function() {
  return gulp.src(['./src/www/CNAME'])
    .pipe(gulp.dest('./build/www'));
});


