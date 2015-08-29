/**
 * @ruleName angularelement
 * @description
 *
 * The angular.element method should be used instead of the $ or jQuery object (if you are using jQuery of course).
 * If the jQuery library is imported, angular.element will be a wrapper around the jQuery object.
 */
module.exports = function(context) {

    'use strict';

    return {

        'CallExpression': function(node) {
            if(node.callee.name === '$' || node.callee.name === 'jQuery'){
                context.report(node, 'You should use angular.element instead of the jQuery $ object', {});
            }

        }
    };

};

module.exports.schema = [];
