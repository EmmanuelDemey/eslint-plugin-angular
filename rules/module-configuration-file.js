/**
 * require module configuration to be in separate files
 *
 * Separate configuration for a module into its own file named after the module.
 * A configuration file for the main `app` module is named `app.config.js` (or simply `config.js`).
 * A configuration for a module named `admin.module.js` is named `admin.config.js`.
 *
 * @styleguideReference {johnpapa} `y128` Modules - Configuration
 * @version 0.16.0
 * @category conventions
 * @sinceAngularVersion 1.x
 */
'use strict';

var path = require('path');
var utils = require('./utils/utils');

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/Gillespie59/eslint-plugin-angular/blob/master/docs/rules/module-configuration-file.md'
        },
        schema: []
    },
    create: function(context) {
        return {
            CallExpression: function(node) {
                // Check if this is a .config() call on an Angular module
                if (!utils.isMemberExpression(node.callee)) {
                    return;
                }

                if (node.callee.property.name !== 'config') {
                    return;
                }

                // Check if this is called on an angular.module() getter
                var callee = node.callee.object;
                if (!utils.isAngularModuleGetter(callee) && !utils.isMemberExpression(callee)) {
                    return;
                }

                // Get the filename
                var filename = path.basename(context.getFilename());

                // Skip if this is a test file
                if (filename.indexOf('.spec.') !== -1 || filename.indexOf('.test.') !== -1) {
                    return;
                }

                // Check if the filename follows the .config.js pattern
                if (!filename.endsWith('.config.js')) {
                    context.report(node, 'Module configuration should be in a separate file with a .config.js suffix');
                }
            }
        };
    }
};
