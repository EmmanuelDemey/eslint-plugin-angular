'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/directive-name');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('directive-name', rule, {
    valid: [{
        code: 'app.directive("eslintDirective", function() {});',
        options: ['eslint'],
        settings: {angular: 1}
    }, {
        code: 'app.directive("eslintDirective", function() {});',
        options: [/^eslint/],
        settings: {angular: 1}
    }, {
        code: 'app.directive("eslintDirective", function() {});',
        settings: {angular: 1}
    }, {
        code: 'app.directive("eslintDirective", function() {});',
        options: ['/^eslint/'],
        settings: {angular: 1}
    }, {
        code: 'app.directive("Directive", function() {});',
        options: ['eslint'],
        settings: {angular: 2}
    }, {
        code: 'app.directive("eslintDirective", require(""));',
        options: ['/^eslint/'],
        settings: {angular: 1}
    }].concat(commonFalsePositives),
    invalid: [
        {
            code: 'app.directive("Directive", function() {});',
            options: ['eslint'],
            errors: [{message: 'The Directive directive should be prefixed by eslint'}]
        },
        {
            code: 'app.directive("esLintDirective", function() {});',
            options: ['eslint'],
            settings: {angular: 1},
            errors: [{message: 'The esLintDirective directive should be prefixed by eslint'}]
        },
        {
            code: 'app.directive("Directive", function() {});',
            options: [/^eslint/],
            settings: {angular: 1},
            errors: [{message: 'The Directive directive should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.directive("Directive", function() {});',
            options: ['/^eslint/'],
            settings: {angular: 1},
            errors: [{message: 'The Directive directive should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.directive("ngDirective", []);',
            options: [/^eslint/],
            settings: {angular: 1},
            errors: [{message: 'The ngDirective directive should not start with "ng". This is reserved for AngularJS directives'}]
        }
    ]
});
