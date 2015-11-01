/**
 * use `angular.isDefined` and `angular.isUndefined` instead of other undefined checks
 *
 * You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined.
 * We also check the use of !angular.isUndefined and !angular.isDefined (should prefer the reverse function)
 *
 * @version 0.1.0
 */
'use strict';

module.exports = function(context) {
    /**
    *    Rule that check if we use angular.is(Un)defined() instead of the undefined keyword
    */
    return {
        MemberExpression: function(node) {
            if (node.object.name === 'angular' &&
                    node.parent !== undefined &&
                    node.parent.parent !== undefined &&
                    node.parent.parent.operator === '!') {
                if (node.property.name === 'isDefined') {
                    context.report(node, 'Instead of !angular.isDefined, you can use the out-of-box angular.isUndefined method', {});
                } else if (node.property.name === 'isUndefined') {
                    context.report(node, 'Instead of !angular.isUndefined, you can use the out-of-box angular.isDefined method', {});
                }
            }
        },
        BinaryExpression: function(node) {
            if (node.operator === '===' || node.operator === '!==') {
                if (node.left.type === 'Identifier' && node.left.name === 'undefined') {
                    context.report(node, 'You should not use directly the "undefined" keyword. Prefer ' +
                        'angular.isUndefined or angular.isDefined', {});
                }

                if (node.right.type === 'Identifier' && node.right.name === 'undefined') {
                    context.report(node, 'You should not use directly the "undefined" keyword. Prefer ' +
                        'angular.isUndefined or angular.isDefined', {});
                }
            }
        }
    };
};

module.exports.schema = [];
