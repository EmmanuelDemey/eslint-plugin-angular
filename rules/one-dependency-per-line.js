/**
 * require all DI parameters to be located in their own line
 *
 * Injected dependencies should be written one per line.
 *
 * @version 0.14.0
 */
'use strict';

var utils = require('./utils/utils');

module.exports = function(context) {
    var angularObjectList = ['animation', 'config', 'constant', 'controller', 'directive', 'factory', 'filter', 'provider', 'service', 'value', 'decorator'];

    function checkArgumentPositionInFunction(node) {
        if (!node.params || node.params.length < 2) {
            return;
        }

        var linesFound = [];
        node.params.forEach(reportMultipleItemsInOneLine.bind(null, node, linesFound));
    }

    function reportMultipleItemsInOneLine(node, linesFound, item) {
        var currentLine = item.loc.start.line;
        if (linesFound.indexOf(currentLine) !== -1) {
            context.report({
                node: node,
                message: 'Do not use multiple dependencies in one line',
                loc: item.loc.start
            });
        }
        linesFound.push(currentLine);
    }

    function checkArgumentPositionArrayExpression(angularComponentNode, arrayNode) {
        var linesFound = [];

        arrayNode.elements.forEach(function(element) {
            if (element.type === 'Literal') {
                reportMultipleItemsInOneLine(arrayNode, linesFound, element);
            }
            if (element.type === 'FunctionExpression') {
                checkArgumentPositionInFunction(element);
            }
            if (element.type === 'Identifier') {
                var fn = utils.getFunctionDeclaration(angularComponentNode, element.name);
                checkArgumentPositionInFunction(fn);
            }
        });
    }

    return {

        CallExpression: function(node) {
            var fn;
            if (utils.isAngularComponent(node) &&
                node.callee.type === 'MemberExpression' &&
                node.arguments[1].type === 'FunctionExpression' &&
                angularObjectList.indexOf(node.callee.property.name) >= 0) {
                fn = node.arguments[1];
                return checkArgumentPositionInFunction(fn);
            }
            if (utils.isAngularComponent(node) &&
                node.callee.type === 'MemberExpression' &&
                node.arguments[1].type === 'Identifier' &&
                angularObjectList.indexOf(node.callee.property.name) >= 0) {
                var fName = node.arguments[1].name;
                fn = utils.getFunctionDeclaration(node, fName);
                if (fn) {
                    return checkArgumentPositionInFunction(fn);
                }
            }
            if (utils.isAngularComponent(node) &&
                node.callee.type === 'MemberExpression' &&
                node.arguments[1].type === 'ArrayExpression' &&
                angularObjectList.indexOf(node.callee.property.name) >= 0) {
                return checkArgumentPositionArrayExpression(node, node.arguments[1]);
            }
        }
    };
};
