'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/service-name');
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
    code: 'app.service("eslintService", function() {});',
    options: ['eslint', {oldBehavior: false}]
}, {
    code: 'app.service("eslintService", function() {});',
    options: [/^eslint/, {oldBehavior: false}]
}, {
    code: 'app.service("eslintService", function() {});'
}, {
    code: 'app.service("eslintService", function() {});',
    options: ['/^eslint/', {oldBehavior: false}]
}, {
    code: 'app.factory("$Service", function() {});',
    options: [/^eslint/, {oldBehavior: false}]
}, {
    code: 'app.constant("$Service", function() {});',
    options: [/^eslint/, {oldBehavior: false}]
}, {
    code: 'app.value("$Service", function() {});',
    options: [/^eslint/, {oldBehavior: false}]
}, {
    code: 'app.provider("$Service", function() {});',
    options: [/^eslint/, {oldBehavior: false}]
});

invalid.push({
    code: 'app.service("Service", function() {});',
    options: ['eslint', {oldBehavior: false}],
    errors: [{message: 'The Service service should be prefixed by eslint'}]
}, {
    code: 'app.service("esLintService", function() {});',
    options: ['eslint', {oldBehavior: false}],
    errors: [{message: 'The esLintService service should be prefixed by eslint'}]
}, {
    code: 'app.service("Service", function() {});',
    options: [/^eslint/, {oldBehavior: false}],
    errors: [{message: 'The Service service should follow this pattern: /^eslint/'}]
}, {
    code: 'app.service("Service", function() {});',
    options: ['/^eslint/', {oldBehavior: false}],
    errors: [{message: 'The Service service should follow this pattern: /^eslint/'}]
}, {
    code: 'app.service("$Service", function() {});',
    options: [/^eslint/, {oldBehavior: false}],
    errors: [{message: 'The $Service service should not start with "$". This is reserved for AngularJS services'}]
});


/**
 * Old Behaviour
 */

['service', 'factory', 'provider', 'constant', 'value'].forEach(function(syntax) {
    valid.push({
        code: 'app.' + syntax + '("eslintService", function() {});',
        options: ['eslint']
    }, {
        code: 'app.' + syntax + '("eslintService", function() {});',
        options: [/^eslint/]
    }, {
        code: 'app.' + syntax + '("eslintService", function() {});'
    }, {
        code: 'app.' + syntax + '("eslintService", function() {});',
        options: ['/^eslint/']
    });

    invalid.push({
        code: 'app.' + syntax + '("Service", function() {});',
        options: ['eslint'],
        errors: [{message: 'The Service service should be prefixed by eslint'}]
    }, {
        code: 'app.' + syntax + '("esLintService", function() {});',
        options: ['eslint'],
        errors: [{message: 'The esLintService service should be prefixed by eslint'}]
    }, {
        code: 'app.' + syntax + '("Service", function() {});',
        options: [/^eslint/],
        errors: [{message: 'The Service service should follow this pattern: /^eslint/'}]
    }, {
        code: 'app.' + syntax + '("Service", function() {});',
        options: ['/^eslint/'],
        errors: [{message: 'The Service service should follow this pattern: /^eslint/'}]
    }, {
        code: 'app.' + syntax + '("$Service", function() {});',
        options: [/^eslint/],
        errors: [{message: 'The $Service service should not start with "$". This is reserved for AngularJS services'}]
    });
});


eslintTester.run('service-name', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid: invalid
});
