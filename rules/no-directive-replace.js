/**
 * disallow the deprecated directive replace property
 *
 * This rule disallows the replace attribute in a directive definition object.
 * The replace property of a directive definition object is deprecated since angular 1.3 ([latest angular docs](https://docs.angularjs.org/api/ng/service/$compile).
 *
 * The option `ignoreReplaceFalse` let you ignore directive definitions with replace set to false.
 *
 * @version 0.15.0
 * @category deprecatedAngularFeature
 */
'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');

    var options = context.options[0] || {};
    var ignoreReplaceFalse = !!options.ignoreReplaceFalse;

    function isDirectiveDefinitionFunction(fnExpression) {
        return fnExpression.parent.type === 'CallExpression' && utils.isAngularDirectiveDeclaration(fnExpression.parent);
    }

    var reportedNodesByName = {};

    function addPotentialReplaceNode(variableName, node) {
        var nodeList = reportedNodesByName[variableName] || [];

        var report = {
            name: variableName,
            node: node,
            block: context.getScope().block.body
        };

        nodeList.push(report);

        reportedNodesByName[variableName] = nodeList;
    }

    return {
        ReturnStatement: function(node) {
            // only check identifiers, because expression in return statements are already checked by the Property callback
            if (node.argument.type === 'Identifier') {
                var reportedNodes = reportedNodesByName[node.argument.name];
                if (!reportedNodes) {
                    return;
                }
                reportedNodes.forEach(function(report) {
                    // only reports nodes that belong to the same expression
                    if (report.block === node.parent) {
                        context.report(report.node, 'Directive definition property replace is deprecated.');
                    }
                });
            }
        },
        AssignmentExpression: function(node) {
            // Only check for literal member property assignments.
            if (node.left.type !== 'MemberExpression') {
                return;
            }
            // Only check setting properties named 'replace'.
            if (node.left.property.name !== 'replace') {
                return;
            }
            if (ignoreReplaceFalse && node.right.value === false) {
                return;
            }
            addPotentialReplaceNode(node.left.object.name, node);
        },
        Property: function(node) {
            // This only checks for objects which have defined a literal restrict property.
            if (node.key.name !== 'replace') {
                return;
            }
            if (ignoreReplaceFalse === true && node.value.value === false) {
                return;
            }

            // assumption: Property always belongs to a ObjectExpression
            var objectExpressionParent = node.parent.parent;

            // add to potential replace nodes if the object is defined in a variable
            if (objectExpressionParent.type === 'VariableDeclarator') {
                addPotentialReplaceNode(objectExpressionParent.id.name, node);
            }

            // report directly if object is part of a return statement and inside a directive body
            if (objectExpressionParent.type === 'ReturnStatement' && isDirectiveDefinitionFunction(context.getScope().block)) {
                context.report(node, 'Directive definition property replace is deprecated.');
            }
        }
    };
};

module.exports.schema = [{
    type: 'object',
    properties: {
        ignoreReplaceFalse: {
            type: 'boolean'
        }
    }
}];
