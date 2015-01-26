module.exports = function(context) {

    'use strict';

    /**
    *  Rule that check if we use angular.is(Un)defined() instead of the undefined keyword
    */
    return {

        'CallExpression': function(node) {
            if(node.callee.name === '$' || node.callee.name === 'jQuery'){
                context.report(node, 'You should use angular.element instead of the jQuery $ object', {});
            }

        }
    };

};
