var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    jade    = require('gulp-jade');

gulp.task('jade:compile', function() {
  gulp.src(['./src/views/*.jade'])
    .pipe(jade({
      locals: require('../../src/views/data'),
      pretty: false
    }))
    .pipe(gulp.dest('./build/www'))
    .pipe(connect.reload());
});

gulp.task('www:jade', ['jade:compile']);
