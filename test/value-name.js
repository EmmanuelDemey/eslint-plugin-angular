'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/value-name');
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
    code: 'app.value("eslintValue", function() {});',
    options: ['eslint']
}, {
    code: 'app.value("eslintValue", function() {});',
    options: [/^eslint/]
}, {
    code: 'app.value("eslintValue", function() {});',
    options: [undefined]
}, {
    code: 'app.value("eslintValue", function() {});',
    options: ['/^eslint/']
});

invalid.push({
    code: 'app.value("Value", function() {});',
    options: ['eslint'],
    errors: [{message: 'The Value value should be prefixed by eslint'}]
}, {
    code: 'app.value("esLintValue", function() {});',
    options: ['eslint'],
    errors: [{message: 'The esLintValue value should be prefixed by eslint'}]
}, {
    code: 'app.value("Value", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The Value value should follow this pattern: /^eslint/'}]
}, {
    code: 'app.value("Value", function() {});',
    options: ['/^eslint/'],
    errors: [{message: 'The Value value should follow this pattern: /^eslint/'}]
}, {
    code: 'app.value("$Value", function() {});',
    options: [/^eslint/],
    errors: [{message: 'The $Value value should not start with "$". This is reserved for AngularJS services'}]
});

eslintTester.run('value-name', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid: invalid
});
