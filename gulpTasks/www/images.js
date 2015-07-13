var gulp     = require('gulp'),
    connect  = require('gulp-connect'),
    imagemin = require('gulp-imagemin');

gulp.task('www:images', function () {
  return gulp.src(['./src/assets/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false }
      ]
    }))
    .pipe(gulp.dest('./build/www/images'))
    .pipe(connect.reload());
});
