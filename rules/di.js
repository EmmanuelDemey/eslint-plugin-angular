/**
 * require a consistent DI syntax
 *
 * All your DI should use the same syntax : the Array, function, or $inject syntaxes ("di":  [2, "array, function, or $inject"])
 *
 * @version 0.1.0
 * @category conventions
 */
'use strict';

var utils = require('./utils/utils');

var angularRule = require('./utils/angular-rule');


module.exports = angularRule(function(context) {
    var syntax = context.options[0];

    function report(node) {
        context.report(node, 'You should use the {{syntax}} syntax for DI', {
            syntax: syntax
        });
    }

    function checkDi(callee, fn) {
        if (!fn || !fn.params) {
            return;
        }

        if (syntax === 'array') {
            if (utils.isArrayType(fn.parent)) {
                if (fn.parent.elements.length - 1 !== fn.params.length) {
                    context.report(fn, 'The signature of the method is incorrect', {});
                    return;
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
    }

    return {
        'angular:animation': checkDi,
        'angular:config': checkDi,
        'angular:controller': checkDi,
        'angular:directive': checkDi,
        'angular:factory': checkDi,
        'angular:filter': checkDi,
        'angular:inject': checkDi,
        'angular:run': checkDi,
        'angular:service': checkDi,
        'angular:provider': function(callee, providerFn, $get) {
            checkDi(null, providerFn);
            checkDi(null, $get);
        }
    };
});

module.exports.schema = [{
    enum: [
        'function',
        'array',
        '$inject'
    ]
}];
