var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    jade    = require('gulp-jade');

gulp.task('www:jade:compile', function() {
  return gulp.src(['./src/www/views/*.jade'])
    .pipe(jade({
      locals: require('../../src/data'),
      pretty: false
    }))
    .pipe(gulp.dest('./build/www'))
    .pipe(connect.reload());
});

gulp.task('www:jade', ['www:jade:compile']);
