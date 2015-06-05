(function () {
   'use strict';
   var gulp = require('gulp'),
		eslint = require('gulp-eslint'),
		istanbul = require('gulp-istanbul'),
		mocha = require('gulp-mocha');

	gulp.task('quality', function() {

		gulp.src(['rules/*.js'])
			.pipe(eslint({
				rules: {
					'no-console': 0,
					'quotes': [2, 'single'],
                    'angular/ng_definedundefined': 0,
                    'angular/ng_typecheck_string': 0,
                    'angular/ng_typecheck_function': 0
				},
				globals: {
					'require': false,
					'module': false,
					'console': false,
					'process': true
				}
			}))
			.pipe(eslint.format());
	});

	gulp.task('test', function (cb) {
		gulp.src(['rules/*.js'])
			.pipe(istanbul()) // Covering files
			.pipe(istanbul.hookRequire()) // Force `require` to return covered files
			.on('finish', function () {
				gulp.src(['test/*.js'])
					.pipe(mocha())
					.pipe(istanbul.writeReports()) // Creating the reports after tests runned
					.on('end', cb);
		});
	});

	gulp.task('default', ['quality', 'test']);
}());
