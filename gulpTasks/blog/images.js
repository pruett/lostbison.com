var gulp     = require('gulp'),
    connect  = require('gulp-connect'),
    imagemin = require('gulp-imagemin');

gulp.task('blog:images', function () {
  return gulp.src(['./src/blog/assets/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false }
      ]
    }))
    .pipe(gulp.dest('./build/blog/images'))
    .pipe(connect.reload());
});
