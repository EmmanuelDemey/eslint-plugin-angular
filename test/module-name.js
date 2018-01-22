'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/module-name');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('module-name', rule, {
    valid: [{
        code: 'app.module("eslintModule", []);',
        options: ['eslint']
    }, {
        code: 'app.module("module");',
        options: ['eslint']
    }, {
        code: 'app.module("eslintModule", []);',
        options: [/^eslint/]
    }, {
        code: 'app.module("eslintModule", []);',
        options: ['/^eslint/']
    }, {
        code: 'app.module("eslintModule", []);'
    }].concat(commonFalsePositives),
    invalid: [
        {
            code: 'app.module("module", []);',
            options: ['eslint'],
            errors: [{message: 'The module module should be prefixed by eslint'}]
        }, {
            code: 'app.module("ESLintModule", []);',
            options: ['eslint'],
            errors: [{message: 'The ESLintModule module should be prefixed by eslint'}]
        }, {
            code: 'app.module("module", []);',
            options: [/^eslint/],
            errors: [{message: 'The module module should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.module("module", []);',
            options: ['/^eslint/'],
            errors: [{message: 'The module module should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.module("ngModule", []);',
            options: [/^ng/],
            errors: [{message: 'The ngModule module should not start with "ng". This is reserved for AngularJS modules'}]
        }
    ]
});
