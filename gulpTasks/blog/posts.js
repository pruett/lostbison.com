var gulp     = require('gulp'),
    connect  = require('gulp-connect'),
    path     = require('path'),
    moment   = require('moment'),
    foreach  = require('gulp-foreach'),
    rename   = require('gulp-rename'),
    data     = require('gulp-data'),
    fm       = require('front-matter'),
    allPosts = [],
    jade     = require('gulp-jade');

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

  gulp.src('./src/blog/views/posts/*.jade')
    .pipe(data(function(file) {
      var fileName = path.basename(file.path, '.jade')
      var content = fm(String(file.contents));
      var postInfo = parseFileName(fileName);

      file.contents = new Buffer(content.body);
      // augment local data to include post frontmatter
      templateData.post = content.attributes
      templateData.post.convertedDate = moment(postInfo.year+'-'+postInfo.month+'-'+postInfo.day).format('MMM Do, YYYY');
      templateData.dirname = postInfo.year+'/'+postInfo.month+'/'+postInfo.day;
      templateData.basename = postInfo.post;
    }))
    .pipe(jade({
      locals: templateData,
      pretty: false
    }))
    .pipe(rename(function(path) {
      path.dirname = templateData.dirname;
      path.basename = templateData.basename;
    }))
    .pipe(gulp.dest('./build/blog'))
    .pipe(connect.reload());
});

gulp.task('blog:compile:posts', function() {
  allPosts = [];

  gulp.src('./src/blog/views/posts/*.jade')
    .pipe(data(function(file) {
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

      allPosts.push(post);
    }));

  return false;
});

gulp.task('blog:index', ['blog:compile:posts'], function() {
  var templateData = require('../../src/data');
  templateData.posts = allPosts;

  return gulp.src('./src/blog/views/index.jade')
    .pipe(jade({
      locals: templateData,
      pretty: false
    }))
    .pipe(gulp.dest('./build/blog'))
    .pipe(connect.reload());
});
