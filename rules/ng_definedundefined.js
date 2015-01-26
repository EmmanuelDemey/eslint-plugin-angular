module.exports = function(context) {

    'use strict';

    /**
    *  Rule that check if we use angular.is(Un)defined() instead of the undefined keyword
    */
    return {
        'BinaryExpression': function(node) {

            if(node.operator === '===' || node.operator === '!=='){

                if(node.left.type === 'Identifier' && node.left.name === 'undefined'){
                    context.report(node, 'You should not use directly the "undefined" keyword. Prefer ' +
                        'angular.isUndefined or angular.isDefined', {});
                }

                if(node.right.type === 'Identifier' && node.right.name === 'undefined'){
                    context.report(node, 'You should not use directly the "undefined" keyword. Prefer ' +
                        'angular.isUndefined or angular.isDefined', {});
                }

            }

        }
    };

};
