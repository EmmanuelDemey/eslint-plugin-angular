//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_regexp', {
    valid: [
        'angular.isRegexp(/^T/)'
    ],
    invalid: [
        { code: 'Object.prototype.toString.call(value) === "[object RegExp]"', errors: [{ message: 'You should use the angular.isRegexp method'}] },
        { code: '"[object RegExp]" === Object.prototype.toString.call(value)', errors: [{ message: 'You should use the angular.isRegexp method'}] },
        { code: 'variable === "[object RegExp]"', errors: [{ message: 'You should use the angular.isRegexp method'}] },
        { code: '"[object RegExp]" === variable', errors: [{ message: 'You should use the angular.isRegexp method'}] },
        { code: 'Object.prototype.toString.call(value) !== "[object RegExp]"', errors: [{ message: 'You should use the angular.isRegexp method'}] },
        { code: '"[object RegExp]" !== Object.prototype.toString.call(value)', errors: [{ message: 'You should use the angular.isRegexp method'}] },
        { code: 'variable !== "[object RegExp]"', errors: [{ message: 'You should use the angular.isRegexp method'}] },
        { code: '"[object RegExp]" !== variable', errors: [{ message: 'You should use the angular.isRegexp method'}] }
    ]
});
