'use strict';

module.exports = angularRule;


/**
 * Method names from an AngularJS module which can be chained.
 */
var angularChainables = [
    'config',
    'constant',
    'controller',
    'directive',
    'factory',
    'filter',
    'provider',
    'run',
    'service',
    'value'
];


/**
 * Angular functions which can be injected.
 */
var angularInjectibles = [
    'config',
    'controller',
    'directive',
    'factory',
    'filter',
    'inject',
    'provider',
    'run',
    'service'
];


function angularRule(ruleDefinition) {
    // This object holds resolved AngularJS module chainables which will be passed to the rule definition.
    var resolvedChainables;
    // This object holds AngularJS chainables for which the function reference has not been resolved.
    var unresolvedChainables;
    var moduleGetters;
    var moduleDefinitions;

    return wrapper;

    function reset() {
        resolvedChainables = {};
        unresolvedChainables = {};
        moduleGetters = [];
        moduleDefinitions = [];

        angularChainables.forEach(function(name) {
            resolvedChainables[name] = [];
            unresolvedChainables[name] = [];
        });
        resolvedChainables.inject = [];
        unresolvedChainables.inject = [];
    }

    /**
     * A wrapper around the rule definition.
     */
    function wrapper(context) {
        reset();
        var ruleObject = ruleDefinition(context);
        // injectCall(ruleObject, context, 'Program', reset);
        injectCall(ruleObject, context, 'ExpressionStatement', parseAngularComponentChain);
        injectCall(ruleObject, context, 'AssignmentExpression', collectProviderGet);
        injectCall(ruleObject, context, 'CallExpression', collectInject);
        injectCall(ruleObject, context, 'Program:exit', callAngularRules);
        return ruleObject;
    }

    /**
     * Makes sure an extra function gets called after custom defined rule has run.
     */
    function injectCall(ruleObject, context, propName, toCallAlso) {
        var original = ruleObject[propName];
        ruleObject[propName] = callBoth;

        function callBoth(node) {
            if (original) {
                original.call(ruleObject, node);
            }
            toCallAlso(ruleObject, context, node);
        }
    }

    /**
     * Collect expressions from an entire Angular module call chain expression statement.
     *
     * This collects the following nodes:
     * ```js
     * angular.module()
     *         ^^^^^^
     * .config(function() {})
     *  ^^^^^^ ^^^^^^^^^^
     * .constant()
     *  ^^^^^^^^
     * .controller('', function() {})
     *  ^^^^^^^^^^     ^^^^^^^^^^
     * .directive('', function() {})
     *  ^^^^^^^^^     ^^^^^^^^^^
     * .factory('', function() {})
     *  ^^^^^^^     ^^^^^^^^^^
     * .filter('', function() {})
     *  ^^^^^^     ^^^^^^^^^^
     * .provider('', function() {})
     *  ^^^^^^^^     ^^^^^^^^^^
     * .run('', function() {})
     *  ^^^     ^^^^^^^^^^
     * .service('', function() {})
     *  ^^^^^^^     ^^^^^^^^^^
     * .value();
     *  ^^^^^
     * ```
     */
    function parseAngularComponentChain(ruleObject, context, expressionStatementNode) {
        var collected = [];
        var module;

        var currentNode = expressionStatementNode.expression;
        while (currentNode.type === 'CallExpression' && currentNode.callee.type === 'MemberExpression') {
            if (currentNode.callee.object.name === 'angular' && currentNode.callee.property.name === 'module') {
                module = currentNode;
                break;
            }
            if (angularChainables.indexOf(currentNode.callee.property.name) === -1) {
                // This is not a (valid) AngularJS component chain.
                return;
            }
            collected.push(currentNode);
            currentNode = currentNode.callee.object;
        }
        if (!module) {
            // This is not a valid AngularJS component chain.
            return;
        }
        if (module.arguments.length < 2) {
            moduleGetters.push(module);
        } else {
            moduleDefinitions.push(module);
        }
        collected.forEach(function(node) {
            var name = node.callee.property.name;
            switch (name) {
                case 'config':
                case 'run':
                    resolvedChainables[name].push({
                        callee: node,
                        fn: node.arguments[0]
                    });
                    break;
                case 'controller':
                case 'directive':
                case 'factory':
                case 'filter':
                case 'provider':
                case 'service':
                    resolvedChainables[name].push({
                        callee: node,
                        fn: node.arguments[1]
                    });
            }
        });
    }

    function collectProviderGet(ruleObject, context, assignmentExpressionNode) {
        if (assignmentExpressionNode.left.type !== 'MemberExpression' || assignmentExpressionNode.left.property.name !== '$get') {
            return;
        }
        var $getScope = context.getScope();
        resolvedChainables.provider.some(function(provider) {
            var scope = $getScope;
            while (scope.upper) {
                if (scope.block === provider.fn) {
                    provider.$get = assignmentExpressionNode.right;
                    return true;
                }
                scope = scope.upper;
            }
        });
    }

    /**
     * Collect calls to spec inject functions.
     *
     * This collects the following nodes:
     * ```js
     * inject(function() {})
     * ^^^^^^ ^^^^^^^^^^
     * ```
     */
    function collectInject(ruleObject, context, callExpressionNode) {
        if (callExpressionNode.callee.type === 'Identifier' && callExpressionNode.callee.name === 'inject') {
            resolvedChainables.inject.push({
                node: callExpressionNode,
                fn: callExpressionNode.arguments[0]
            });
        }
    }

    function callAngularRules(ruleObject) {
        angularInjectibles.forEach(function(name) {
            var fn = ruleObject['angular:' + name];
            if (!fn) {
                return;
            }
            resolvedChainables[name].forEach(function(obj) {
                var args = [obj.callee, obj.fn];
                if (name === 'provider') {
                    args.push(obj.$get);
                }
                fn.apply(ruleObject, args);
            });
        });
    }
}
