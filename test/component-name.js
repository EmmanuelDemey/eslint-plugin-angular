'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/component-name');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('component-name', rule, {
    valid: [{
        code: 'app.component("eslintComponent", function() {});',
        options: ['eslint'],
        settings: {angular: 1}
    }, {
        code: 'app.component("eslintComponent", function() {});',
        options: [/^eslint/],
        settings: {angular: 1}
    }, {
        code: 'app.component("eslintComponent", function() {});',
        options: [undefined],
        settings: {angular: 1}
    }, {
        code: 'app.component("eslintComponent", function() {});',
        options: ['/^eslint/'],
        settings: {angular: 1}
    }, {
        code: 'app.component("Component", function() {});',
        options: ['eslint'],
        settings: {angular: 2}
    }].concat(commonFalsePositives),
    invalid: [
        {
            code: 'app.component("Component", function() {});',
            options: ['eslint'],
            errors: [{message: 'The Component component should be prefixed by eslint'}]
        },
        {
            code: 'app.component("esLintComponent", function() {});',
            options: ['eslint'],
            settings: {angular: 1},
            errors: [{message: 'The esLintComponent component should be prefixed by eslint'}]
        },
        {
            code: 'app.component("Component", function() {});',
            options: [/^eslint/],
            settings: {angular: 1},
            errors: [{message: 'The Component component should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.component("Component", function() {});',
            options: ['/^eslint/'],
            settings: {angular: 1},
            errors: [{message: 'The Component component should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.component("ngComponent", []);',
            options: [/^eslint/],
            settings: {angular: 1},
            errors: [{message: 'The ngComponent component should not start with "ng". This is reserved for AngularJS components'}]
        }
    ]
});
