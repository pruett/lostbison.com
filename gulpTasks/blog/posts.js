var gulp     = require('gulp'),
    connect  = require('gulp-connect'),
    path     = require('path'),
    moment   = require('moment'),
    through  = require('through2'),
    rename   = require('gulp-rename'),
    data     = require('gulp-data'),
    fm       = require('front-matter'),
    jade     = require('gulp-jade');

var gutil = require('gulp-util');

var fileNameRegex = /^(\d{4})-(\d{2})-(\d{2})-([\w|-]*)/i;

var parseFileName = function(fileName) {
  var match = fileNameRegex.exec(fileName)

  return {
    year: match[1],
    month: match[2],
    day: match[3],
    post: match[4]
  }
};

gulp.task('blog:posts', function() {
  var templateData = require('../../src/data');

  return gulp.src('./src/blog/views/posts/*.jade')
    .pipe(data(function(file) {
      var fileName = path.basename(file.path, '.jade')
      var content = fm(String(file.contents));
      var postInfo = parseFileName(fileName);

      file.contents = new Buffer(content.body);
      templateData.post = content.attributes
      templateData.post.convertedDate = moment(postInfo.year+'-'+postInfo.month+'-'+postInfo.day).format('MMM Do, YYYY');
      templateData.dirname = postInfo.year+'/'+postInfo.month+'/'+postInfo.day;
      templateData.basename = postInfo.post;
    }))
    .pipe(jade({ locals: templateData, pretty: false }))
    .pipe(rename(function(path) {
      path.dirname = templateData.dirname;
      path.basename = templateData.basename;
    }))
    .pipe(gulp.dest('./build/blog'))
    .pipe(connect.reload());
});

gulp.task('blog:index', function() {
  var allPosts = [];
  var blogIndexTemplateData = require('../../src/data');

  gulp.src('./src/blog/views/posts/*')
    .pipe(through.obj(function(file, enc, cb) {
      var fileName = path.basename(file.path, '.jade')
      var content = fm(String(file.contents));
      var postInfo = parseFileName(fileName);
      file.contents = new Buffer(content.body);

      var post = {
        meta: content.attributes,
        convertedDate: moment(postInfo.year+'-'+postInfo.month+'-'+postInfo.day).format('MMM Do, YYYY'),
        dirname: postInfo.year+'/'+postInfo.month+'/'+postInfo.day,
        basename: postInfo.post
      };

      if (blogIndexTemplateData.blog.featuredPost === post.basename) {
        post.featured = true;
      }

      this.push(post);

      cb();
    }))
    .on('data', function(data) {
      allPosts.push(data);
    })
    .on('end', function() {
      allPosts.sort(function(a, b) {
        return new Date(b.dirname).getTime() - new Date(a.dirname).getTime()
      });
      gutil.log(allPosts);

      return gulp.src('./src/blog/views/index.jade')
        .pipe(jade({ locals: blogIndexTemplateData, pretty: false }))
        .pipe(gulp.dest('./build/blog'))
        .pipe(connect.reload());
    })
});
