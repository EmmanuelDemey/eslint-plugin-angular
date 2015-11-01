/**
 * limit the number of angular components per file
 *
 * The number of AngularJS components in one file should be limited.
 * The default limit is one.
 *
 * @styleguideReference {johnpapa} `y001` Define 1 component per file
 * @version 0.11.0
 */
'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');
    var limit = context.options[0] || 1;

    var components = [];
    var msg = 'There may be at most {{limit}} AngularJS {{component}} per file, but found {{number}}';

    return {
        CallExpression: function(node) {
            if (utils.isAngularComponent(node) && utils.isMemberExpression(node.callee)) {
                components.push(node);
            }
        },

        'Program:exit': function() {
            if (components.length > limit) {
                components.slice(limit).forEach(function(node) {
                    context.report(node, msg, {
                        limit: limit,
                        component: limit === 1 ? 'component' : 'components',
                        number: components.length
                    });
                });
            }
        }
    };
};

module.exports.schema = [{
    type: 'integer'
}];
