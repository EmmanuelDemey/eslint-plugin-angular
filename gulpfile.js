'use strict';

var {spawn} = require('child_process');
var gulp = require('gulp');
var docs = require('./scripts/docs.js');


gulp.task('quality', function(cb) {
    const cmd = spawn('npx', [
        'eslint',
        '*.js',
        '{rules,test,scripts}/**/*.js'
    ], {stdio: 'inherit', shell: true});
    cmd.on('close', cb);
});

gulp.task('test', function(cb) {
    const cmd = spawn('nyc', [
        '--reporter=lcov',
        '--reporter=text',
        'mocha',
        'test/**'
    ], {stdio: 'inherit', shell: true});
    cmd.on('close', cb);
});


gulp.task('docs', function(done) {
    docs.updateReadme('README.md');
    docs.createDocFiles();
    // docs.testDocs(cb);
    done();
});

gulp.task('default', gulp.series('quality', 'docs', 'test'));
