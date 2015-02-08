//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_interval_service', {
    valid: [
        '$interval(function(){})',
        '$interval(function(){}, 1000)',
        '$interval(function(){}, 1000, 2)',
        '$interval(function(){}, 1000, true)'
    ],
    invalid: [
        { code: 'window.setInterval(function(){}, 1000)', errors: [{ message: 'You should use the $interval service instead of the default window.setInterval method'}] },
        { code: 'window.setInterval(function(){}, 1000, param1)', errors: [{ message: 'You should use the $interval service instead of the default window.setInterval method'}] }
    ]
});
