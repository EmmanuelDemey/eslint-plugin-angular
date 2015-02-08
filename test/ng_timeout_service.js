//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_timeout_service', {
    valid: [
        '$timeout(function(){})',
        '$timeout(function(){}, 1000)',
        '$timeout(function(){}, 1000, true)'
    ],
    invalid: [
        { code: 'window.setTimeout(function(){}, 1000)', errors: [{ message: 'You should use the $timeout service instead of the default window.setTimeout method'}] },
        { code: 'window.setTimeout(function(){}, 1000, param1)', errors: [{ message: 'You should use the $timeout service instead of the default window.setTimeout method'}] },
        { code: 'setTimeout(function(){}, 1000)', errors: [{ message: 'You should use the $timeout service instead of the default window.setTimeout method'}] },
        { code: 'setTimeout(function(){}, 1000, param1)', errors: [{ message: 'You should use the $timeout service instead of the default window.setTimeout method'}] }
    ]
});
