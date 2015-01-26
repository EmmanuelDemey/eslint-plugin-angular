//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_string', {
    valid: [
        'angular.isString("")'
    ],
    invalid: [
        { code: 'typeof variable === "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" === typeof variable', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'variable === "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" === variable', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'typeof variable !== "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" !== typeof variable', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'variable !== "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" !== variable', errors: [{ message: 'You should use the angular.isString method'}] }
    ]
});
