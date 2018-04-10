'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

gulp.task('default', ['watch']);

gulp.task('build-css', function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      //only minify if run with '--type production'
      .pipe(gutil.env.type === 'production' ? cssnano() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(livereload());
});

gulp.task('build-js', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if run with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(livereload());
});

gulp.task('copy-html', function() {
  gulp.src('source/*.html').pipe(gulp.dest('public'))
  .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('source/*.html', ['copy-html']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch('source/js/**/*.js', ['build-js']);
});
