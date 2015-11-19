/**
 * require DI parameters to be sorted alphabetically
 *
 * Injected dependencies should be sorted alphabetically.
 * If the second parameter is set to false, values which start and end with an underscore those underscores are stripped.
 * This means for example that `_$httpBackend_` goes before `_$http_`.
 *
 * @version 0.6.0
 */
'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');

    var angularNamedObjectList = [
        'controller',
        'directive',
        'factory',
        'filter',
        'provider',
        'service'
    ];
    var setupCalls = [
        'config',
        'run'
    ];

    function checkParamOrder(fn) {
        if (!fn || !fn.params) {
            return;
        }
        var args = fn.params.map(function(arg) {
            if (context.options[0] !== false) {
                return arg.name.replace(/^_(.+)_$/, '$1');
            }
            return arg.name;
        });
        var sortedArgs = args.slice().sort();
        sortedArgs.some(function(value, index) {
            if (args.indexOf(value) !== index) {
                context.report(fn, 'Injected values should be sorted alphabetically');
                return true;
            }
        });
    }

    function checkOrderForArray(angularComponentNode, arrayNode) {
        arrayNode.elements.forEach(function(element) {
            if (element.type === 'FunctionExpression') {
                checkParamOrder(element);
            }
            if (element.type === 'Identifier') {
                var fn = utils.getFunctionDeclaration(angularComponentNode, element.name);
                checkParamOrder(fn);
            }
        });
    }

    return {
        AssignmentExpression: function(node) {
            // The $get function of a provider.
            if (node.left.type === 'MemberExpression' && node.left.property.name === '$get') {
                return checkParamOrder(node.right);
            }
        },

        CallExpression: function(node) {
            // An Angular component definition.
            if (utils.isAngularComponent(node) &&
                node.callee.type === 'MemberExpression' &&
                node.arguments[1].type === 'FunctionExpression' &&
                angularNamedObjectList.indexOf(node.callee.property.name) >= 0) {
                return checkParamOrder(node.arguments[1]);
            }
            if (utils.isAngularComponent(node) &&
                node.callee.type === 'MemberExpression' &&
                node.arguments[1].type === 'Identifier' &&
                angularNamedObjectList.indexOf(node.callee.property.name) >= 0) {
                var fName = node.arguments[1].name;
                var fn = utils.getFunctionDeclaration(node, fName);
                if (fn) {
                    return checkParamOrder(fn);
                }
            }
            if (utils.isAngularComponent(node) &&
                node.callee.type === 'MemberExpression' &&
                node.arguments[1].type === 'ArrayExpression' &&
                angularNamedObjectList.indexOf(node.callee.property.name) >= 0) {
                return checkOrderForArray(node, node.arguments[1]);
            }

            // Config and run functions.
            if (node.callee.type === 'MemberExpression' && node.arguments.length > 0 && setupCalls.indexOf(node.callee.property.name) !== -1 && node.arguments[0].type === 'FunctionExpression') {
                return checkParamOrder(node.arguments[0]);
            }
            // Injected values in unittests.
            if (node.callee.type === 'Identifier' && node.callee.name === 'inject') {
                return checkParamOrder(node.arguments[0]);
            }
        }
    };
};
