var gulp = require('gulp');

gulp.task('blog:files', function() {
  return gulp.src(['./src/blog/CNAME'])
    .pipe(gulp.dest('./build/blog'));
});


