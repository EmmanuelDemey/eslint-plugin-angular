/**
 * disallow use of controllers (according to the component first pattern)
 *
 * According to the Component-First pattern, we should avoid the use of AngularJS controller.
 *
 * @version 0.9.0
 * @category bestPractice
 * @sinceAngularVersion 1.x
 */
'use strict';

var utils = require('./utils/utils');

module.exports = {
    meta: {
        schema: []
    },
    create: function(context) {
        return {

            CallExpression: function(node) {
                if (utils.isAngularControllerDeclaration(node)) {
                    context.report(node, 'Based on the Component-First Pattern, you should avoid the use of controllers', {});
                }
            }
        };
    }
};
