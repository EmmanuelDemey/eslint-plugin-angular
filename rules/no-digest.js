/**
 * use `$apply()` instead of `$digest()`
 *
 * The scope's $digest() method shouldn't be used.
 * You should prefer the $apply method.
 *
 * The `watchers-execution` rule can be configured to enforce the use of `$apply()` or `$digest()`.
 *
 * @linkDescription use `$apply()` instead of `$digest()` (replaced by [watchers-execution](docs/watchers-execution.md))
 * @version 0.1.0
 * @deprecated There is no reason to forbid the use of `$digest()` in general.
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
