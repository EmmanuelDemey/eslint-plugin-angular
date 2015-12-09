/**
 * require to use `angular.mock` methods directly
 *
 * All methods defined in the angular.mock object are also available in the object window.
 * So you can remove angular.mock from your code
 *
 * @version 0.2.0
 * @category angularWrapper
 */
'use strict';

module.exports = function(context) {
    return {

        MemberExpression: function(node) {
            if (node.object.type === 'Identifier' && node.object.name === 'angular' &&
                    node.property.type === 'Identifier' && node.property.name === 'mock') {
                if (node.parent.type === 'MemberExpression' && node.parent.property.type === 'Identifier') {
                    context.report(node, 'You should use the "{{method}}" method available in the window object.', {
                        method: node.parent.property.name
                    });
                }
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
