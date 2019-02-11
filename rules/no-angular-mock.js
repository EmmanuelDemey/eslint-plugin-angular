/**
 * require to use `angular.mock` methods directly
 *
 * All methods defined in the angular.mock object are also available in the object window.
 * So you can remove angular.mock from your code
 *
 * @version 0.2.0
 * @category angularWrapper
 *
 * NOTE: While this rule does enforce the use of `angular.mock` methods to be used
 * in the object window, the `eslint` rule no-undef (http://eslint.org/docs/rules/no-undef.html)
 * may prevent you from using undefined global variables such as those provided by
 * `angular.mock`. The current fix for this is to simply add all of the `angular.mock`
 * object methods to your `eslint` globals:
 *
 * "globals": {
 *   "angular": false,
 *   "module": false,
 *   "inject": false
 * }
 *
 * At this time (01/06/2016), there is no way to add globals for a specific environment
 * in `eslint`, although it is an accepted feature (https://github.com/eslint/eslint/issues/4782)
 * and should exist sometime in the future.
 *
 * Check here(https://github.com/Gillespie59/eslint-plugin-angular/issues/330)
 * for more information on this topic.
 *
 * @sinceAngularVersion 1.x
 */
'use strict';

const WEBPACK_OPTION = 'webpack-module-support';
const WEBPACK_OPTION_REPLACEMENT = 'angular.mock.module';

function argumentIsModuleInvocation(arg) {
    return arg.type === 'CallExpression' && arg.callee.name === 'module';
}

function getWebpackFixer(node) {
    return function(fixer) {
        return fixer.replaceText(node.callee, WEBPACK_OPTION_REPLACEMENT);
    };
}

function getCallExpressionHandler(context) {
    return function(node) {
        const moduleCalls = node.arguments.filter(arg => argumentIsModuleInvocation(arg));

        return moduleCalls.map(problem => {
            return context.report({
                node: problem,
                messageId: 'useMockModule',
                fix: getWebpackFixer(problem)
            });
        });
    };
}

function getExpressionStatmentHandler(context) {
    return function(node) {
        const isModuleCall = argumentIsModuleInvocation(node.expression);

        if (!isModuleCall) {
            return;
        }

        return context.report({
            node: node,
            messageId: 'useMockModule',
            fix: getWebpackFixer(node.expression)
        });
    };
}

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/Gillespie59/eslint-plugin-angular/blob/master/docs/rules/no-angular-mock.md'
        },
        schema: [{
            type: 'string'
        }],
        fixable: 'code',
        messages: {
            useMockModule: 'You should use the "angular.mock.module" method directly.'
        }
    },
    create: function(context) {
        const webpackRuleEnabled = context.options && context.options[0] === WEBPACK_OPTION;
        const sourceCode = context.getSourceCode();

        return {
            CallExpression: webpackRuleEnabled ? getCallExpressionHandler(context) : function() {},

            ExpressionStatement: webpackRuleEnabled ? getExpressionStatmentHandler(context) : function() {},

            MemberExpression: function(node) {
                const isAngularMock =
                    node.object.type === 'Identifier' &&
                    node.object.name === 'angular' &&
                    node.property.type === 'Identifier' &&
                    node.property.name === 'mock' &&
                    node.parent.type === 'MemberExpression' &&
                    node.parent.property.type === 'Identifier' &&

                    // If the webpack option is turned on, we only need to check
                    // for non-"module" mock properties
                    (webpackRuleEnabled ? node.parent.property.name !== 'module' : true);

                if (isAngularMock) {
                    context.report({
                        node: node,
                        message: 'You should use the "{{method}}" method available in the window object.',
                        data: {
                            method: node.parent.property.name
                        },
                        fix: (fixer) => {
                            if (webpackRuleEnabled && node.parent.property.name === 'module') {
                                return;
                            }

                            let angularPeriod = sourceCode.getTokenAfter(node.object);
                            let mockPeriod = sourceCode.getTokenAfter(node.property);
                            return [
                                fixer.remove(angularPeriod),
                                fixer.remove(mockPeriod),
                                fixer.remove(node.object),
                                fixer.remove(node.property)
                            ];
                        }
                    });
                }
            }
        };
    }
};
