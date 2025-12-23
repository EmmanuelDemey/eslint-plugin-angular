/**
 * require `$on` and `$watch` deregistration callbacks not to be ignored
 *
 * Deregistration functions returned by Watch and On methods on the scope object should not be ignored, in order to be deleted in a $destroy event handler.
 * They should be assigned to a variable, returned from a function, put in an array or passed to a function as an argument.
 * @version 0.1.0
 * @category bestPractice
 * @sinceAngularVersion 1.x
 */
'use strict';

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/Gillespie59/eslint-plugin-angular/blob/master/docs/rules/on-watch.md'
        },
        schema: []
    },
    create: function(context) {
        function report(node, method) {
            context.report(node, 'The deregistration function returned by "{{method}}" call should not be ignored', {
                method: method
            });
        }

        /**
         * Return true if the given node is a call expression calling a function
         * named '$on' or '$watch' on an object named '$rootScope'.
         */
        function isRootScopeOnOrWatch(node) {
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

            return objectName === '$rootScope' && (functionName === '$on' ||
                functionName === '$watch');
        }

        /**
         * Return true if the given node is a call expression that has a first
         * argument of the string '$destroy'.
         */
        function isFirstArgDestroy(node) {
            var args = node.arguments;

            return (args.length >= 1 &&
                args[0].type === 'Literal' &&
                args[0].value === '$destroy');
        }

        return {

            CallExpression: function(node) {
                if (isRootScopeOnOrWatch(node) && !isFirstArgDestroy(node)) {
                    if (node.parent.type !== 'VariableDeclarator' &&
                        node.parent.type !== 'AssignmentExpression' &&
                        node.parent.type !== 'ReturnStatement' &&
                        node.parent.type !== 'CallExpression' &&
                        node.parent.type !== 'ArrayExpression') {
                        report(node, node.callee.property.name);
                    }
                }
            }
        };
    }
};
