/**
 * keep run functions clean and simple
 *
 * Initialization logic should be moved into a factory or service. This improves testability.
 *
 * @styleguideReference {johnpapa} `y171` Run Blocks
 * @version 0.15.0
 * @category bestPractice
 */
'use strict';

var angularRule = require('./utils/angular-rule');


module.exports = angularRule(function(context) {
    var options = context.options[0] || {};
    var allowParams = options.allowParams !== false;

    function report(node) {
        context.report(node, 'The run function may only contain call expressions');
    }

    return {
        'angular:run': function(callExpression, fn) {
            if (!fn) {
                return;
            }
            fn.body.body.forEach(function(statement) {
                if (statement.type !== 'ExpressionStatement') {
                    return report(statement);
                }
                var expression = statement.expression;
                if (expression.type !== 'CallExpression') {
                    return report(statement);
                }
                if (expression.callee.type === 'MemberExpression' && expression.callee.object.type !== 'Identifier') {
                    return report(statement);
                }
                if (!allowParams && expression.arguments.length) {
                    return context.report(expression, 'Run function call expressions may not take any arguments');
                }
                expression.arguments.forEach(function(argument) {
                    if (argument.type !== 'Literal' && argument.type !== 'Identifier') {
                        context.report(argument, 'Run function call expressions may only take simple arguments');
                    }
                });
            });
        }
    };
});

module.exports.schema = [{
    type: 'object',
    properties: {
        allowParams: {
            type: 'boolean'
        }
    }
}];
