var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    jade    = require('gulp-jade');

gulp.task('blog:jade:compile', function() {
  return gulp.src(['./src/blog/views/*.jade'])
    .pipe(jade({
      locals: require('../../src/data'),
      pretty: false
    }))
    .pipe(gulp.dest('./build/blog'))
    .pipe(connect.reload());
});

gulp.task('blog:jade', ['blog:jade:compile', 'blog:posts']);
