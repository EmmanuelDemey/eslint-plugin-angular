module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');
    var badStatements = [];
    var controllerFunctions = [];

    //If your Angular code is written so that controller functions are in
    //separate files from your .controller() calls, you can specify a regex for your controller function names
    var controllerNameMatcher = context.options[0];
    if (controllerNameMatcher && utils.isStringRegexp(controllerNameMatcher)) {
        controllerNameMatcher = utils.convertStringToRegex(controllerNameMatcher);
    }

    //check node against known controller functions or pattern if specified
    function isControllerFunction(node) {
        return controllerFunctions.indexOf(node) >= 0 ||
            (controllerNameMatcher && (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') &&
            node.id && controllerNameMatcher.test(node.id.name))
    }

    //for each of the bad uses, find any parent nodes that are controller functions
    function reportBadUses() {
        badStatements.forEach(function (item) {
            item.parents.forEach(function (parent) {
                if (isControllerFunction(parent)) {
                    context.report(item.stmt, "You should not set properties on $scope in controllers. Use controllerAs syntax and add data to 'this'");
                }
            })
        });
    }

    function findIdentiferInScope(identifier) {
        var identifierNode = null;
        context.getScope().variables.forEach(function (variable) {
            if (variable.name === identifier.name) {
                identifierNode = variable.defs[0].node
                if (identifierNode.type === 'VariableDeclarator') {
                    identifierNode = identifierNode.init;
                }
            }
        });
        return identifierNode;
    }

    return {
        //Looking for .controller() calls here and getting the associated controller function
        'CallExpression:exit': function(node) {
            var controllerArg = null;

            if(utils.isAngularControllerDeclaration(node)) {
                controllerArg = node.arguments[1];

                //Three ways of creating a controller function: function expression,
                //variable name that references a function, and an array with a function
                //as the last item
                if (utils.isFunctionType(controllerArg)) {
                    controllerFunctions.push(controllerArg);
                } else if (utils.isArrayType(controllerArg)) {
                    controllerArg = controllerArg.elements[controllerArg.elements.length - 1];

                    if (utils.isIdentifierType(controllerArg)) {
                        controllerFunctions.push(findIdentiferInScope(controllerArg));
                    } else {
                        controllerFunctions.push(controllerArg);
                    }
                }
                else if (utils.isIdentifierType(controllerArg)) {
                    controllerFunctions.push(findIdentiferInScope(controllerArg));
                }

            }
        },
        //statements are checked here for bad uses of $scope
        'ExpressionStatement': function (stmt) {
            if (stmt.expression.type === 'AssignmentExpression' &&
                stmt.expression.left.object &&
                stmt.expression.left.object.name === '$scope' &&
                utils.scopeProperties.indexOf(stmt.expression.left.property.name) < 0) {
                badStatements.push({ parents: context.getAncestors(), stmt: stmt });
            } else if (stmt.expression.type === 'CallExpression' &&
                stmt.expression.callee.object &&
                stmt.expression.callee.object.name === '$scope' &&
                utils.scopeProperties.indexOf(stmt.expression.callee.property.name) < 0) {
                badStatements.push({ parents: context.getAncestors(), stmt: stmt });
            }
        },
        'Program:exit': function () {
            reportBadUses();
        }
    }
};