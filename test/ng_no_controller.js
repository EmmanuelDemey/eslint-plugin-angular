//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_no_controller'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_no_controller', rule, {
    valid: [
        'app.controller("")',
        'app.service("", function(){})'
    ],
    invalid: [
        { code: 'app.controller("", function(){})', errors: [{ message: 'Based on the Component-First Pattern, you should avoid the use of controllers'}] },
        { code: 'angular.module("").controller("", function(){})', errors: [{ message: 'Based on the Component-First Pattern, you should avoid the use of controllers'}] }
    ]
});
