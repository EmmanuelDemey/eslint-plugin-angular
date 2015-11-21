'use strict';

module.exports = function(context) {
    function report(node, method) {
        context.report(node, 'The "{{method}}" call should be assigned to a variable, in order to be destroyed during the $destroy event', {
            method: method
        });
    }

    /**
     * Return true if the given node is a call expression calling a function
     * named '$on' on an object named '$scope' or 'scope'.
     */
    function isScopeOn(node) {
        if (node.type !== 'CallExpression') {
            return false;
        }

        var calledFunction = node.callee;
        if (calledFunction.type !== 'MemberExpression') {
            return false;
        }

        // can only easily tell what name was used if a simple
        // identifiers were used to access it.
        var parentObject = calledFunction.object;
        var accessedFunction = calledFunction.property;

        // cannot check name of the parent object if it is returned from a
        // complex expression.
        if (parentObject.type !== 'Identifier' ||
            accessedFunction.type !== 'Identifier') {
            return false;
        }

        var objectName = parentObject.name;
        var functionName = accessedFunction.name;

        return ['$scope', 'scope'].indexOf(objectName) >= 0 && functionName === '$on';
    }

    /**
     * Return true if the given node or its parent is a call expression that has a first
     * argument of the string '$destroy'.
     */
    function isFirstArgDestroy(node) {
        var args = (node.arguments || []).length > 0 ? node.arguments : node.parent.arguments;

        return args &&
                (args.length >= 1 &&
                args[0].type === 'Literal' &&
                args[0].value === '$destroy');
    }

    return {

        CallExpression: function(node) {
            if (!isScopeOn(node)) {
                return;
            }

            if (isFirstArgDestroy(node)) {
                return;
            }

            if (node.parent.type !== 'VariableDeclarator' && node.parent.type !== 'AssignmentExpression') {
                report(node, node.callee.property.name);
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
