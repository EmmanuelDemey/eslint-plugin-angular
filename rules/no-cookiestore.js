/**
 * use `$cookies` instead of `$cookieStore`
 *
 * In Angular 1.4, the $cookieStore service is now deprected.
 * Please use the $cookies service instead
 *
 * @version 0.3.0
 * @category deprecatedAngularFeature
 */
'use strict';

module.exports = function(context) {
    return {

        MemberExpression: function(node) {
            if (node.object && node.object.name === '$cookieStore') {
                context.report(node, 'Since Angular 1.4, the $cookieStore service is deprecated. Please use now the $cookies service.', {});
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
