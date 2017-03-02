'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');
var jsdoc = require('gulp-jsdoc3');
var subtree = require('gulp-subtree');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('test', function(){
    return gulp
        .src(['test/*.js'], {read: false})
        .pipe(mocha());
});

gulp.task('watch', function(){
    var watcher = gulp.watch(['lib/**', 'test/**'], ['test']);
    watcher.on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('coverage', function(){
    return gulp.src(['test/*.js'], {read: false})
        .pipe(cover.instrument({
            pattern: ['index.js', 'lib/**.js'],
            debugDirectory: 'debug'
        }))
        .pipe(mocha())
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});

gulp.task('clean-docs', function(){
    return gulp.src(['docs/'])
        .pipe(vinylPaths(del));
});

gulp.task('make-docs', function(cb){
    return gulp.src(['index.js', 'lib/**/*.js', 'README.md'], {read: false})
        .pipe(jsdoc('./docs'));
});

gulp.task('docs', ['clean-docs', 'make-docs']);

gulp.task('default', ['test', 'watch']);
