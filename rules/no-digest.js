/**
 * use `$apply()` instead of `$digest()`
 *
 * DEPRECATED! The scope's $digest() method shouldn't be used.
 * You should prefer the $apply method.
 *
 * @linkDescription DEPRECATED! use `$apply()` instead of `$digest()` (replaced by [watchers-execution](docs/watchers-execution.md))
 * @version 0.1.0
 */
'use strict';

module.exports = function(context) {
    return {

        MemberExpression: function(node) {
            if (node.property.type === 'Identifier' && node.property.name === '$digest') {
                context.report(node, 'Instead of using the $digest() method, you should prefer $apply()', {});
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
