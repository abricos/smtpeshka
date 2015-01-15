'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

var opts = {
    mocha: {
        reporter: 'spec',
        globals: [
            'setImmediate',
            'clearImmediate'
        ]
    }
};

gulp.task('test', ['test-net']);

gulp.task('default', ['test', 'watch']);

gulp.task('test-net', function(){
    return gulp
        .src(['test/*.js'])
        .pipe(mocha(opts.mocha));
});

gulp.task('watch', function(){
    var watcher = gulp.watch(['index.js', 'lib/**', 'test/**'], ['test']);
    watcher.on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
