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

module.exports = function(context) {
    var angularNamedObjectList = ['factory', 'service', 'provider', 'controller', 'filter', 'directive'];

    function report(node, syntax) {
        context.report(node, 'You should use the {{syntax}} syntax for DI', {
            syntax: syntax
        });
    }

    var noninjectedFunctions = {};
    var injectedFunctions = [];

    function checkDi(syntax, node, param) {
        if (syntax === 'function' && (!utils.isFunctionType(param) && !utils.isIdentifierType(param))) {
            report(node, syntax);
        } else if (syntax === 'array') {
            if (utils.isArrayType(param)) {
                var fn = param.elements[param.elements.length - 1];
                if (utils.isFunctionType(fn) && fn.params.length !== param.elements.length - 1) {
                    context.report(fn, 'The signature of the method is incorrect', {});
                }
            } else {
                report(node, syntax);
            }
        } else if (syntax === '$inject') {
            if (utils.isIdentifierType(param)) {
                noninjectedFunctions[param.name] = node;
            } else {
                report(node, syntax);
            }
        }
    }

    function maybeNoteInjection(syntax, node) {
        if (syntax === '$inject' && node.left && node.left.property &&
            ((utils.isLiteralType(node.left.property) && node.left.property.value === '$inject') ||
             (utils.isIdentifierType(node.left.property) && node.left.property.name === '$inject'))) {
            injectedFunctions.push(node.left.object.name);
        }
    }

    function verifyInjections(syntax) {
        if (syntax === '$inject') {
            injectedFunctions.forEach(function(f) {
                delete noninjectedFunctions[f];
            });

            for (var func in noninjectedFunctions) {
                report(noninjectedFunctions[func], syntax);
            }
        }
    }

    return {

        CallExpression: function(node) {
            if (utils.isAngularComponent(node) && node.callee.type === 'MemberExpression' && angularNamedObjectList.indexOf(node.callee.property.name) >= 0) {
                /**
                * Check AngularJS components using functions with two parameters : name and constructor
                */
                checkDi(context.options[0], node, node.arguments[1]);
            } else if (utils.isAngularRunSection(node) || utils.isAngularConfigSection(node)) {
                /**
                * Check AngularJS components using functions with one parameter : the constructor
                */
                checkDi(context.options[0], node, node.arguments[0]);
            }
        },
        AssignmentExpression: function(node) {
            maybeNoteInjection(context.options[0], node);
        },
        'Program:exit': function() {
            verifyInjections(context.options[0]);
        }
    };
};

module.exports.schema = [{
    enum: [
        'function',
        'array',
        '$inject'
    ]
}];
