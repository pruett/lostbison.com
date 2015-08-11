var gulp         = require('gulp'),
    connect      = require('gulp-connect'),
    path         = require('path'),
    moment       = require('moment'),
    rename       = require('gulp-rename'),
    data         = require('gulp-data'),
    fm           = require('front-matter'),
    templateData = require('../../src/data'),
    jade         = require('gulp-jade');

var getDateFromFileName = function(path) {
  //regex this shit
  //return YYYY-MM-DD
};

var formatDate = function(date) {
  //return moment(date).format('MMM Do, YYYY'));
};

gulp.task('blog:posts', function() {
  gulp.src('./src/blog/views/posts/*.jade')
    .pipe(data(function(file) {
      //console.log(path.basename(file.path, '.jade');
      var content = fm(String(file.contents));
      file.contents = new Buffer(content.body);
      //console.log(content.attributes);
      //content.attributes.attributes
      // augment generic data to include post frontmatter
      templateData.post = content.attributes
      console.log(getDateFromFileName(path.basename(file.path, '.jade')));
      //templateData.post.url = something
      //templateData.post.convertedDate = 
    }))
    .pipe(rename(function(path) {
      // rename to 2015/08/06/name-of-post.jade
      console.log(path);
      console.log(templateData.post.date);
    }))
    .pipe(jade({
      locals: templateData,
      pretty: false
    }))
    .pipe(gulp.dest('./build/blog'))
    .pipe(connect.reload());
});

//gulp.task('blog:index', function() {
  //gulp.src('./src/blog/views/posts/*.jade')
    //.pipe(data(function(file) {
      //var content = fm(String(file.contents));
      //file.contents = new Buffer(content.body);
      //// augment generic data to include post frontmatter
      //templateData.post = content.attributes
    //}))
    //.pipe(jade({
      //locals: templateData,
      //pretty: false
    //}))
    //.pipe(gulp.dest('./build/blog'))
    //.pipe(connect.reload());
//});
