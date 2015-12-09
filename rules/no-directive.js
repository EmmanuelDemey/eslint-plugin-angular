/*
 * Since AngularJS 1.5, we can use a new API when creating directives. This API will help the migration to the next version of the framework
 *
 * @version 0.16.0
 * @category bestPractice
 * @sinceAngularVersion 1.5
 */
'use strict';

var angularRule = require('./utils/angular-rule');

module.exports = angularRule(function(context) {
    function report(node) {
        context.report(node, 'Directive should be implemented with the component method', {});
    }

    return {
        'angular:directive': function(callExpression) {
            report(callExpression);
        }
    };
});

module.exports.schema = [];
