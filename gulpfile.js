'use strict';

var gulp = require('gulp');
var docs = require('./scripts/docs.js');

gulp.task('docs', function(done) {
    docs.updateReadme('README.md');
    docs.createDocFiles();
    // docs.testDocs(cb);
    done();
});

gulp.task('default', gulp.series('docs'));
