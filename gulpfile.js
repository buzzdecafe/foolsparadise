var gulp = require('gulp');
var concat = require('gulp-concat');
var util = require('gulp-util');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var mocha = require('gulp-mocha');
var notify = require('gulp-notify');

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('hint', function() {
  gulp.src('(src|test)/**/*.js')
    .pipe(jshint());
});

gulp.task('test', function() {
  gulp.src('src/js/*')
    .pipe(jshint());                
  gulp.src('test/*.js')
    .pipe(mocha());
});


