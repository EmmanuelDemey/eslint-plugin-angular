/**
 * use `angular.isArray` instead of `typeof` comparisons
 *
 * You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]").
 *
 * @version 0.1.0
 * @category angularWrapper
 */
'use strict';

var utils = require('./utils/utils');

module.exports = function(context) {
    function recordError(node, origin) {
        if (node.type === 'Literal' && node.value === '[object Array]') {
            context.report(origin, 'You should use the angular.isArray method', {});
        }
    }

    return {
        MemberExpression: function(node) {
            if (node.object.name === 'Array' && node.property.name === 'isArray') {
                context.report(node, 'You should use the angular.isArray method', {});
            }
        },
        BinaryExpression: function(node) {
            if (node.operator === '===' || node.operator === '!==') {
                if (utils.isTypeOfStatement(node.left) || utils.isToStringStatement(node.left)) {
                    recordError(node.right, node);
                } else if (utils.isTypeOfStatement(node.right) || utils.isToStringStatement(node.right)) {
                    recordError(node.left, node);
                }
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
