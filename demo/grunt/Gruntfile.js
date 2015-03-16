(function () {
    'use strict';
    module.exports = function(grunt) {

		grunt.initConfig({
			eslint: {
				options: {
					reset: true
				},
				target: ['app/**/*.js']
			}
		});

		grunt.loadNpmTasks('grunt-eslint');
		grunt.registerTask('default', ['eslint']);
    };
})();