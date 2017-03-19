/**
 * require a consistent DI syntax
 *
 * All your DI should use the same syntax : the Array, function, or $inject syntaxes ("di":  [2, "array, function, or $inject"])
 *
 * @version 0.1.0
 * @category conventions
 * @sinceAngularVersion 1.x
 */
'use strict';

var utils = require('./utils/utils');

var angularRule = require('./utils/angular-rule');


module.exports = {
    meta: {
        schema: [{
            enum: [
                'function',
                'array',
                '$inject'
            ]
        }, {
            type: 'object',
            properties: {
                matchNames: {
                    type: 'boolean'
                }
            }
        }]
    },
    create: angularRule(function(context) {
        var syntax = context.options[0] || 'function';

        var extra = context.options[1] || {};
        var matchNames = extra.matchNames !== false;

        function report(node) {
            context.report(node, 'You should use the {{syntax}} syntax for DI', {
                syntax: syntax
            });
        }

        var $injectProperties = {};

        function maybeNoteInjection(node) {
            if (syntax === '$inject' && node.left && node.left.property &&
                ((utils.isLiteralType(node.left.property) && node.left.property.value === '$inject') ||
                    (utils.isIdentifierType(node.left.property) && node.left.property.name === '$inject'))) {
                $injectProperties[node.left.object.name] = node.right;
            }
        }

        function checkDi(callee, fn) {
            if (!fn) {
                return;
            }

            if (syntax === 'array') {
                if (utils.isArrayType(fn.parent)) {
                    if (fn.parent.elements.length - 1 !== fn.params.length) {
                        context.report(fn, 'The signature of the method is incorrect', {});
                        return;
                    }

                    if (matchNames) {
                        var invalidArray = fn.params.filter(function(e, i) {
                            return e.name !== fn.parent.elements[i].value;
                        });
                        if (invalidArray.length > 0) {
                            context.report(fn, 'You have an error in your DI configuration. Each items of the array should match exactly one function parameter', {});
                            return;
                        }
                    }
                } else {
                    if (fn.params.length === 0) {
                        return;
                    }
                    report(fn);
                }
            }

            if (syntax === 'function') {
                if (utils.isArrayType(fn.parent)) {
                    report(fn);
                }
            }

            if (syntax === '$inject') {
                if (fn && fn.id && utils.isIdentifierType(fn.id)) {
                    var $injectArray = $injectProperties[fn.id.name];

                    if ($injectArray && utils.isArrayType($injectArray)) {
                        if ($injectArray.elements.length !== fn.params.length) {
                            context.report(fn, 'The signature of the method is incorrect', {});
                            return;
                        }

                        if (matchNames) {
                            var invalidInjectArray = fn.params.filter(function(e, i) {
                                return e.name !== $injectArray.elements[i].value;
                            });
                            if (invalidInjectArray.length > 0) {
                                context.report(fn, 'You have an error in your DI configuration. Each items of the array should match exactly one function parameter', {});
                                return;
                            }
                        }
                    } else if (fn.params.length > 0) {
                        report(fn);
                    }
                } else if (fn.params && fn.params.length !== 0) {
                    report(fn);
                }
            }
        }

        return {
            'angular?animation': checkDi,
            'angular?config': checkDi,
            'angular?controller': checkDi,
            'angular?directive': checkDi,
            'angular?factory': checkDi,
            'angular?filter': checkDi,
            'angular?inject': checkDi,
            'angular?run': checkDi,
            'angular?service': checkDi,
            'angular?provider': function(callee, providerFn, $get) {
                checkDi(null, providerFn);
                checkDi(null, $get);
            },
            AssignmentExpression: function(node) {
                maybeNoteInjection(node);
            }
        };
    })
};
