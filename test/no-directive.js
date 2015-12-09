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
        'module.component("", {})',
        'module.component("", obj)'
    ],
    invalid: [
        {code: 'module.directive("", function(){});', errors: [{message: 'Directive should be implemented wiith the "component" method'}]},
        {code: 'module.directive("", fn);', errors: [{message: 'Directive should be implemented wiith the "component" method'}]}
    ]
});

