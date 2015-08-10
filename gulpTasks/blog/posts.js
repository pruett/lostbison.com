var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    data    = require('gulp-data'),
    fm      = require('front-matter'),
    jade    = require('gulp-jade');

gulp.task('blog:posts', function() {
  gulp.src(['./src/blog/views/posts/*.jade'])
    .pipe(data(function(file) {
      var content = fm(String(file.contents));
      file.contents = new Buffer(content.body);
      return { post: content.attributes };
    }))
    .pipe(jade({ pretty: false }))
    .pipe(gulp.dest('./build/blog'))
    .pipe(connect.reload());
});
