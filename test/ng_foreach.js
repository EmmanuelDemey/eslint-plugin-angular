//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_foreach'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_foreach', rule, {
    valid: [
        'angular.forEach(variable, function(){})'
    ],
    invalid: [
        { code: 'variable.forEach(function(){})', errors: [{ message: 'You should use the angular.forEach method'}] }
    ]
});
