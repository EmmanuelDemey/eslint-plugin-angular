//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_boolean', {
    valid: [
        'angular.isBoolean(variable)'
    ],
    invalid: [
        { code: 'Object.prototype.toString.call(variable) === "[object Boolean]"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"[object Boolean]" === Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: 'variable === "[object Boolean]"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"[object Boolean]" === variable', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: 'Object.prototype.toString.call(variable) !== "[object Boolean]"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"[object Boolean]" !== Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: 'variable !== "[object Boolean]"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"[object Boolean]" !== variable', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        
        { code: 'typeof variable === "boolean"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"boolean" === typeof variable', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: 'variable === "boolean"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"boolean" === variable', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: 'typeof variable !== "boolean"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"boolean" !== typeof variable', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: 'typeof variable !== "boolean"', errors: [{ message: 'You should use the angular.isBoolean method'}] },
        { code: '"boolean" !== typeof variable', errors: [{ message: 'You should use the angular.isBoolean method'}] }
    ]
});
