//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_foreach', {
    valid: [
        'angular.forEach(variable, function(){})'
    ],
    invalid: [
        { code: 'variable.forEach(function(){})', errors: [{ message: 'You should use the angular.forEach method'}] }
    ]
});
