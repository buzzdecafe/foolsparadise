var gulp = require('gulp');
var concat = require('gulp-concat');
var util = require('gulp-util');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var jasmine = require('gulp-jasmine');
var notify = require('gulp-notify');
var browserify = require('browserify');

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('hint', function() {
  gulp.src('src/js/**/*')
    .pipe(jshint());
});

gulp.task('test', function() {
  gulp.src('src/js/*')
    .pipe(jshint());                
  gulp.src('spec/*.js')
    .pipe(jasmine());
});


