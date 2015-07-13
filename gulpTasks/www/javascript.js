var gulp       = require('gulp'),
    source     = require('vinyl-source-stream'),
    rename     = require('gulp-rename'),
    browserify = require('browserify'),
    glob       = require('glob'),
    es         = require('event-stream'),
    connect    = require('gulp-connect'),
    uglify     = require('gulp-uglify'),
    babelify   = require('babelify'),
    buffer     = require('vinyl-buffer');

gulp.task('www:js', function(done) {
  glob('./src/assets/javascripts/*.js', function(err, files) {

  if(err) done(err);

  var tasks = files.map(function(entry) {
    return browserify({ entries: [entry] })
      .transform(babelify)
      .bundle()
      .on("error", function (err) {
        console.log("Error : " + err.message);
      })
      .pipe(source(entry))
      .pipe(rename({
        dirname: 'js',
        extname: '.bundle.js'
      }))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./build/www'));
    });
    es.merge(tasks).on('end', done);
  });
});
