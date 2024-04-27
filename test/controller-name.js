'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/controller-name');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('controller-name', rule, {
    valid: [{
        code: 'app.controller("loginController", function() {});',
        options: ['/[a-zA-Z].*Controller$/']
    }, {
        code: 'app.controller("eslintController", function() {});',
        options: ['/^eslint/']
    }, {
        code: 'app.controller("EslintController", function() {});',
        options: ['/[A-Z].*Controller$/']
    }, {
        code: 'controller = el.controller();',
        options: ['/[A-Z].*Controller$/']
    }, {
        code: 'controller = el.controller("no-match");',
        options: ['/^SpamController$/']
    }].concat(commonFalsePositives),
    invalid: [
        {
            code: 'app.controller("Controller", function() {});',
            options: ['eslint'],
            errors: [{message: 'The Controller controller should be prefixed by eslint'}]
        },
        {
            code: 'app.controller("PrefixBananaSuffixasdf", function() {});',
            options: ['/^Prefix[A-Z][a-zA-Z0-9]*Suffix$/'],
            errors: [{message: 'The PrefixBananaSuffixasdf controller should follow this pattern: /^Prefix[A-Z][a-zA-Z0-9]*Suffix$/'}]
        },
        {
            code: 'app.controller("esLintController", function() {});',
            options: ['eslint'],
            errors: [{message: 'The esLintController controller should be prefixed by eslint'}]
        },
        {
            code: 'app.controller("Controller", function() {});',
            options: ['/^eslint/'],
            errors: [{message: 'The Controller controller should follow this pattern: /^eslint/'}]
        },
        {
            code: 'app.controller("customers", function() {});',
            options: ['/[A-Z].*Controller$/'],
            errors: [{message: 'The customers controller should follow this pattern: /[A-Z].*Controller$/'}]
        },
        {
            code: 'app.controller("customersController", function() {});',
            options: ['/[A-Z].*Controller$/'],
            errors: [{message: 'The customersController controller should follow this pattern: /[A-Z].*Controller$/'}]
        }, {
            code: 'app.controller("eslintController", function() {});',
            options: ['/[A-Z].*Controller$/'],
            errors: [{message: 'The eslintController controller should follow this pattern: /[A-Z].*Controller$/'}]
        }
    ]
});
