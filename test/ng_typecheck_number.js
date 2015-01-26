//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_number', {
    valid: [
        'angular.isNumber(1)'
    ],
    invalid: [
        { code: 'typeof variable === "[object Number]"', errors: [{ message: 'You should use the angular.isNumber method'}] },
        { code: '"[object Number]" === typeof variable', errors: [{ message: 'You should use the angular.isNumber method'}] },
        { code: 'variable === "[object Number]"', errors: [{ message: 'You should use the angular.isNumber method'}] },
        { code: '"[object Number]" === variable', errors: [{ message: 'You should use the angular.isNumber method'}] },
        { code: 'typeof variable !== "[object Number]"', errors: [{ message: 'You should use the angular.isNumber method'}] },
        { code: '"[object Number]" !== typeof variable', errors: [{ message: 'You should use the angular.isNumber method'}] },
        { code: 'variable !== "[object Number]"', errors: [{ message: 'You should use the angular.isNumber method'}] },
        { code: '"[object Number]" !== variable', errors: [{ message: 'You should use the angular.isNumber method'}] }
    ]
});
