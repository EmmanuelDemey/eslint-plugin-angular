/**
 * use `$timeout` instead of `setTimeout`
 *
 * Instead of the default setTimeout function, you should use the AngularJS wrapper service $timeout
 **
 * @styleguideReference {johnpapa} `y181` Angular $ Wrapper Services - $timeout and $interval
 * @version 0.1.0
 * @category angularWrapper
 * @sinceAngularVersion 1.x
 */
'use strict';

module.exports = {
    schema: [],
    create: function(context) {
        var message = 'You should use the $timeout service instead of the default window.setTimeout method';

        return {

            MemberExpression: function(node) {
                if (node.object.name === 'window' && node.property.name === 'setTimeout') {
                    context.report(node, message, {});
                }
            },

            CallExpression: function(node) {
                if (node.callee.name === 'setTimeout') {
                    context.report(node, message, {});
                }
            }
        };
    }
};
