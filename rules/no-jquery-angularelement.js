/**
 * disallow to wrap `angular.element` objects with `jQuery` or `$`
 *
 * You should not wrap angular.element object into jQuery(), because angular.element already return jQLite element
 * @version 0.1.0
 */
'use strict';

module.exports = function(context) {
    return {

        MemberExpression: function(node) {
            if (node.object.name === 'angular' && node.property.name === 'element') {
                if (node.parent !== undefined && node.parent.parent !== undefined &&
                        node.parent.parent.type === 'CallExpression' &&
                        node.parent.parent.callee.type === 'Identifier' &&
                        (node.parent.parent.callee.name === 'jQuery' || node.parent.parent.callee.name === '$')) {
                    context.report(node, 'angular.element returns already a jQLite element. No need to wrap with the jQuery object', {});
                }
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
