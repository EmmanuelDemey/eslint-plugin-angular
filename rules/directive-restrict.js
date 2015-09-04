'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');

    var options = context.options[0] || {};
    var restrictOpt = options.restrict || 'AE';
    var explicitRestrict = options.explicit === 'always';
    var restrictChars = [];

    restrictOpt.split('').forEach(function(char) {
        if ('ACEM'.indexOf(char) === -1) {
            return;
        }
        restrictChars.push(char);
    });

    restrictOpt = restrictChars.join('');
    // Example RegExp for ACEM: /^A?C?E?M?$/
    var restrictRegExp = new RegExp('^' + restrictChars.join('?') + '?$');
    var uncheckedDirectives = [];
    var defaultRestrictions = ['AE', 'EA'];

    function checkLiteralNode(node) {
        if (node.type !== 'Literal') {
            return;
        }
        var directiveNode;
        context.getAncestors().some(function(ancestor) {
            if (utils.isAngularDirectiveDeclaration(ancestor)) {
                directiveNode = ancestor;
                return true;
            }
        });
        // The restrict property was not defined inside of a directive.
        if (!directiveNode) {
            return;
        }
        if (!explicitRestrict && defaultRestrictions.indexOf(node.value) !== -1) {
            context.report(node, 'No need to explicitly specify a default directive restriction');
            return;
        }
        if (restrictRegExp.test(node.value)) {
            uncheckedDirectives.splice(uncheckedDirectives.indexOf(directiveNode), 1);
            return;
        }
        context.report(directiveNode, 'Disallowed directive restriction. It must be one of {{allowed}} in that order', {
            allowed: restrictOpt
        });
    }

    return {
        CallExpression: function(node) {
            if (utils.isAngularDirectiveDeclaration(node)) {
                uncheckedDirectives.push(node);
            }
        },
        AssignmentExpression: function(node) {
            // Only check for literal member property assignments.
            if (node.left.type !== 'MemberExpression') {
                return;
            }
            // Only check setting properties named 'restrict'.
            if (node.left.property.name !== 'restrict') {
                return;
            }
            checkLiteralNode(node.right);
        },
        Property: function(node) {
            // This only checks for objects which have defined a literal restrict property.
            if (node.key.name !== 'restrict') {
                return;
            }
            checkLiteralNode(node.value);
        },
        'Program:exit': function() {
            if (explicitRestrict) {
                uncheckedDirectives.forEach(function(directiveNode) {
                    context.report(directiveNode, 'Missing directive restriction');
                });
            }
        }
    };
};

module.exports.schema = [{
    type: 'object',
    properties: {
        restrict: {
            type: 'string',
            pattern: '^[ACEM]{1,4}$'
        },
        explicit: {
            enum: ['always', 'never']
        }
    }
}];
