'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');

var paths = {
  sass: './style/style.scss',
  public: {
    style: './public/css/'
  }
};

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.public.style))
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();

  gulp.watch('./style/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
