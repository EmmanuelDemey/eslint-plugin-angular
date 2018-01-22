'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/provider-name');
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
    code: 'app.provider("eslintProvider", function() {});',
    options: ['eslint']
}, {
    code: 'app.provider("eslintProvider", function() {});',
    options: [/^eslint/]
}, {
    code: 'app.provider("eslintProvider", function() {});'
}, {
    code: 'app.provider("eslintProvider", function() {});',
    options: ['/^eslint/']
});

invalid.push({
    code: 'app.provider("Provider", function() {});',
    options: ['eslint'],
    errors: [{message: 'The Provider provider should be prefixed by eslint'}]
}, {
    code: 'app.provider("esLintProvider", function() {});',
    options: ['eslint'],
    errors: [{message: 'The esLintProvider provider should be prefixed by eslint'}]
}, {
    code: 'app.provider("Provider", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The Provider provider should follow this pattern: /^eslint/'}]
}, {
    code: 'app.provider("Provider", function() {});',
    options: ['/^eslint/'],
    errors: [{message: 'The Provider provider should follow this pattern: /^eslint/'}]
}, {
    code: 'app.provider("$Provider", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The $Provider provider should not start with "$". This is reserved for AngularJS services'}]
});

eslintTester.run('provider-name', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid: invalid
});
