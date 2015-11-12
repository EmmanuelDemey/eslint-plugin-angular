'use strict';

module.exports = angularRule;


/**
 * Method names from an AngularJS module which can be chained.
 */
var angularChainableNames = [
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


function angularRule(ruleDefinition) {
    var angularModuleCalls;
    var angularChainables;
    var injectCalls;

    return wrapper;

    function reset() {
        angularModuleCalls = [];
        angularChainables = [];
        injectCalls = [];
    }

    /**
     * A wrapper around the rule definition.
     */
    function wrapper(context) {
        reset();
        var ruleObject = ruleDefinition(context);
        injectCall(ruleObject, context, 'CallExpression:exit', checkCallee);
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
     * Collect expressions from an entire Angular module call chain expression statement and inject calls.
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
     *
     * inject(function() {})
     * ^^^^^^ ^^^^^^^^^^
     * ```
     */
    function checkCallee(ruleObject, context, callExpressionNode) {
        var callee = callExpressionNode.callee;
        if (callee.type === 'Identifier') {
            if (callee.name === 'inject') {
                injectCalls.push(callExpressionNode);
            }
            return;
        }
        if (callee.type === 'MemberExpression') {
            if (callee.object.name === 'angular' && callee.property.name === 'module') {
                angularModuleCalls.push(callExpressionNode);
                return;
            }
            if (angularChainableNames.indexOf(callee.property.name !== -1) && (angularModuleCalls.indexOf(callee.object) !== -1 || angularChainables.indexOf(callee.object) !== -1)) {
                angularChainables.push(callExpressionNode);
            }
        }
    }

    function callAngularRules(ruleObject) {
        angularChainables.forEach(function(chainable) {
            var name = chainable.callee.property.name;
            var fn = ruleObject['angular:' + name];
            if (!fn) {
                return;
            }
            fn.apply(ruleObject, assembleArguments(chainable));
        });
        var injectRule = ruleObject['angular:inject'];
        if (injectRule) {
            injectCalls.forEach(function(node) {
                injectRule.apply(ruleObject, assembleRunConfigOrInjectArguments(node));
            });
        }
    }

    function assembleArguments(node) {
        switch (node.callee.property.name) {
            case 'controller':
            case 'directive':
            case 'factory':
            case 'filter':
            case 'service':
                return assembleComponentArguments(node);
            case 'provider':
                return assembleProviderArguments(node);
            case 'config':
            case 'run':
                return assembleRunConfigOrInjectArguments(node);
        }
    }

    function assembleComponentArguments(node) {
        return [node, node.arguments[1]];
    }

    function assembleProviderArguments(node) {
        return [node, node.arguments[1], findProviderGet(node.arguments[1])];
    }

    function assembleRunConfigOrInjectArguments(node) {
        return [node, node.arguments[0]];
    }

    function findProviderGet(providerFn) {
        var getFn;
        providerFn.body.body.some(function(statement) {
            var expression = statement.expression;
            if (!expression || expression.type !== 'AssignmentExpression') {
                return;
            }
            if (expression.left.type === 'MemberExpression' && expression.left.property.name === '$get') {
                getFn = expression.right;
                return true;
            }
        });
        return getFn;
    }
}
