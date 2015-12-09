/**
 * use `angular.isRegexp` instead of other comparisons
 *
 * You should use the angular.isRegexp method instead of the default JavaScript implementation (toString.call(/^A/) === "[object RegExp]").
 *
 * @linkDescription use `angular.isRegexp` instead of other comparisons (no native angular method)
 * @version 0.1.0
 * @deprecated `angular.isRegexp` is no built-in angular method.
 */
'use strict';

var utils = require('./utils/utils');

module.exports = function(context) {
    function recordError(node, origin) {
        if (node.type === 'Literal' && node.value === '[object RegExp]') {
            context.report(origin, 'You should use the angular.isRegexp method', {});
        }
    }

    function checkNode(node) {
        return node.type === 'Identifier' || utils.isToStringStatement(node);
    }

    return {

        BinaryExpression: function(node) {
            if (node.operator === '===' || node.operator === '!==') {
                if (checkNode(node.left)) {
                    recordError(node.right, node);
                } else if (checkNode(node.right)) {
                    recordError(node.left, node);
                }
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
