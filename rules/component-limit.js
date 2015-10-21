/**
 * limit the number of angular components per file
 *
 * The number of AngularJS components in one file should be limited.
 * The default limit is one, which follows  [Y001](https://github.com/johnpapa/angular-styleguide#style-y001)
 */
'use strict';

module.exports = function(context) {
    var utils = require('./utils/utils');
    var limit = context.options[0] || 1;

    var components = [];
    var msg = 'There may be at most {{limit}} AngularJS {{component}} per file, but found {{number}}';

    return {
        CallExpression: function(node) {
            if (utils.isAngularComponent(node) && utils.isMemberExpression(node.callee)) {
                components.push(node);
            }
        },

        'Program:exit': function() {
            if (components.length > limit) {
                components.slice(limit).forEach(function(node) {
                    context.report(node, msg, {
                        limit: limit,
                        component: limit === 1 ? 'component' : 'components',
                        number: components.length
                    });
                });
            }
        }
    };
};

module.exports.schema = [{
    type: 'integer'
}];

module.exports.examples = {
    valid: [
        'app.controller("SomeController", function() {\n    // ...\n});',
        'angular.module("myModule").directive("myDirective", function() {\n    // ...\n});',
        {
            code: 'app.controller("ControllerOne", function() {\n    // ...\n})' +
            '.directive("directiveTwo", function() {\n    // ...\n})' +
            '.factory("serviceThree", function() {\n    // ...\n});',
            options: [3]
        }
    ],
    invalid: [{
        code: 'app.controller("ControllerOne", function() {\n    // ...\n})' +
        '.directive("directiveTwo", function() {\n    // ...\n});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file, but found 2'
        }]
    }, {
        code: 'app.controller("ControllerOne", function() {\n    // ...\n})' +
        '.directive("directiveTwo", function() {\n    // ...\n})' +
        '.factory("serviceThree", function() {\n    // ...\n})' +
        '.filter("filterFour", function() {\n    // ...\n});',
        options: [3],
        errors: [{
            message: 'There may be at most 3 AngularJS components per file, but found 4'
        }]
    }]
}
