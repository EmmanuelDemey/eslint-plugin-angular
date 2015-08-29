/**
 * You should use $log service instead of console for the methods 'log', 'debug', 'error', 'info', 'warn'
 *
 * @ruleName log
 * @config 2
 */
module.exports = function(context) {

    'use strict';

    var method = ['log', 'debug', 'error', 'info', 'warn'];

    return {

        'MemberExpression': function(node) {
            if (node.object.name === 'console' && method.indexOf(node.property.name) >= 0) {
                context.report(node, 'You should use the "' + node.property.name + '" method of the AngularJS Service $log instead of the console object');
            }

        }
    };

};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
