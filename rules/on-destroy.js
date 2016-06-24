/**
 * Check for common misspelling $on('destroy', ...).
 *
 * It should be $on('$destroy', ...).
 * @version 0.1.0
 * @category misspelling
 */
'use strict';

module.exports = function(context) {
    function report(node) {
        context.report(node, 'You probably misspelled $on("$destroy").');
    }

    /**
     * Return true if the given node is a call expression calling a function
     * named '$on'.
     */
    function isOn(node) {
        var calledFunction = node.callee;
        if (calledFunction.type !== 'MemberExpression') {
            return false;
        }

        // can only easily tell what name was used if a simple
        // identifiers were used to access it.
        var accessedFunction = calledFunction.property;
        if (accessedFunction.type !== 'Identifier') {
            return false;
        }

        var functionName = accessedFunction.name;

        return functionName === '$on';
    }

    /**
     * Return true if the given node is a call expression that has a first
     * argument of the string '$destroy'.
     */
    function isFirstArgDestroy(node) {
        var args = node.arguments;

        return (args.length >= 1 &&
                args[0].type === 'Literal' &&
                args[0].value === 'destroy');
    }

    return {
        CallExpression: function(node) {
            if (isOn(node) && isFirstArgDestroy(node)) {
                report(node);
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
