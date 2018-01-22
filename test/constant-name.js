'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/constant-name');
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
    code: 'app.constant("eslintConstant", function() {});',
    options: ['eslint']
}, {
    code: 'app.constant("eslintConstant", function() {});',
    options: [/^eslint/]
}, {
    code: 'app.constant("eslintConstant", function() {});'
}, {
    code: 'app.constant("eslintConstant", function() {});',
    options: ['/^eslint/']
});

invalid.push({
    code: 'app.constant("Constant", function() {});',
    options: ['eslint'],
    errors: [{message: 'The Constant constant should be prefixed by eslint'}]
}, {
    code: 'app.constant("esLintConstant", function() {});',
    options: ['eslint'],
    errors: [{message: 'The esLintConstant constant should be prefixed by eslint'}]
}, {
    code: 'app.constant("Constant", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The Constant constant should follow this pattern: /^eslint/'}]
}, {
    code: 'app.constant("Constant", function() {});',
    options: ['/^eslint/'],
    errors: [{message: 'The Constant constant should follow this pattern: /^eslint/'}]
}, {
    code: 'app.constant("$Constant", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The $Constant constant should not start with "$". This is reserved for AngularJS services'}]
});

eslintTester.run('constant-name', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid: invalid
});
