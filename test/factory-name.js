'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/factory-name');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
var valid = [];
var invalid = [];


/**
 * New Behaviour
 */

valid.push({
    code: 'app.factory("eslintFactory", function() {});',
    options: ['eslint']
}, {
    code: 'app.factory("eslintFactory", EslintFactory); class EslintFactory {}',
    options: ['eslint'],
    languageOptions: {ecmaVersion: 6}
}, {
    code: 'app.factory("eslintFactory", function() {});',
    options: [/^eslint/]
}, {
    code: 'app.factory("eslintFactory", function() {});'
}, {
    code: 'app.factory("eslintFactory", function() {});',
    options: ['/^eslint/']
});

invalid.push({
    code: 'app.factory("Factory", function() {});',
    options: ['eslint'],
    errors: [{message: 'The Factory factory should be prefixed by eslint'}]
}, {
    code: 'app.factory("esLintFactory", function() {});',
    options: ['eslint'],
    errors: [{message: 'The esLintFactory factory should be prefixed by eslint'}]
}, {
    code: 'app.factory("Factory", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The Factory factory should follow this pattern: /^eslint/'}]
}, {
    code: 'app.factory("Factory", function() {});',
    options: ['/^eslint/'],
    errors: [{message: 'The Factory factory should follow this pattern: /^eslint/'}]
}, {
    code: 'app.factory("$Factory", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The $Factory factory should not start with "$". This is reserved for AngularJS services'}]
});

eslintTester.run('factory-name', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid: invalid
});
