var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    jade    = require('gulp-jade');

gulp.task('blog:jade', ['blog:posts', 'blog:index']);
