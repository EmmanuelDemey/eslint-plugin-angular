'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/no-directive');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('no-directive', rule, {
    valid: [
        'angular.module("").component("", {})',
        'angular.module("").component("", obj)'
    ],
    invalid: [
        {code: 'angular.module("").directive("", function(){});', errors: [{message: 'Directive should be implemented with the component method'}]},
        {code: 'angular.module("").directive("", fn);', errors: [{message: 'Directive should be implemented with the component method'}]}
    ]
});

