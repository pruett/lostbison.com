var gulp       = require('gulp'),
    connect    = require('gulp-connect');

gulp.task('www:vendor', function() {
  return gulp.src('./src/www/assets/vendor/**/*')
    .pipe(gulp.dest('./build/www/vendor'))
    .pipe(connect.reload());
});

