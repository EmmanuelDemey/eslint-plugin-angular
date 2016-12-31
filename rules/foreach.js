/**
 * use `angular.forEach` instead of native `Array.prototype.forEach`
 *
 * You should use the angular.forEach method instead of the default JavaScript implementation [].forEach.
 *
 * @version 0.1.0
 * @category angularWrapper
 * @sinceAngularVersion 1.x
 */
'use strict';

module.exports = {
    meta: {
        schema: []
    },
    create: function(context) {
        return {
            MemberExpression: function(node) {
                if (node.object.type === 'Identifier' && node.object.name !== 'angular' && node.property.name === 'forEach') {
                    context.report(node, 'You should use the angular.forEach method', {});
                }
            }
        };
    }
};
