var gulp    = require('gulp'),
    jade    = require('gulp-jade');

gulp.task('blog:jade', ['blog:posts', 'blog:index']);
