/**
 * Since AngularJS 1.5, we can use a new API when creating directives. This API will help the migration to the next version of the framework 
 *
 * @version 0.15.0
 * @category conventions
 * @sinceAngularVersion 1.5
 */
'use strict';

var angularRule = require('./utils/angular-rule');


module.exports = angularRule(function(context) {console.log('init')
    function report(node) {
        context.report(node, 'Directive should be implemented with the "component" method', {});
    }

    return {
        'angular:directive': function(callExpression, fn) {console.log('directive');
           report(callExpression);
        }
    };
});

module.exports.schema = [];
