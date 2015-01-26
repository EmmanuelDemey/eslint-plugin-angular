//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_function', {
    valid: [
        'angular.isFunction(function(){})'
    ],
    invalid: [
        { code: 'typeof variable === "function"', errors: [{ message: 'You should use the angular.isFunction method'}] },
        { code: '"function" === typeof variable', errors: [{ message: 'You should use the angular.isFunction method'}] },
        { code: 'variable === "function"', errors: [{ message: 'You should use the angular.isFunction method'}] },
        { code: '"function" === variable', errors: [{ message: 'You should use the angular.isFunction method'}] },
        { code: 'typeof variable !== "function"', errors: [{ message: 'You should use the angular.isFunction method'}] },
        { code: '"function" !== typeof variable', errors: [{ message: 'You should use the angular.isFunction method'}] },
        { code: 'variable !== "function"', errors: [{ message: 'You should use the angular.isFunction method'}] },
        { code: '"function" !== variable', errors: [{ message: 'You should use the angular.isFunction method'}] }
    ]
});
