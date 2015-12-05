/**
 * use the `$log` service instead of the `console` methods
 *
 * You should use $log service instead of console for the methods 'log', 'debug', 'error', 'info', 'warn'
 * @version 0.1.0
 * @category angularWrapper
 */
'use strict';

module.exports = function(context) {
    var method = ['log', 'debug', 'error', 'info', 'warn'];

    return {

        MemberExpression: function(node) {
            if (node.object.name === 'console' && method.indexOf(node.property.name) >= 0) {
                context.report(node, 'You should use the "' + node.property.name + '" method of the AngularJS Service $log instead of the console object');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
