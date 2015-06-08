//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_object', {
    valid: [
        'angular.isObject({})'
    ],
    invalid: [
        { code: 'typeof variable === "object"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"object" === typeof variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'variable === "object"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"object" === variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'typeof variable !== "object"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"object" !== typeof variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'variable !== "object"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"object" !== variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        
        { code: 'Object.prototype.toString.call(variable) === "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" === Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'variable === "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" === variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'Object.prototype.toString.call(variable) !== "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" !== Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'variable !== "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" !== variable', errors: [{ message: 'You should use the angular.isObject method'}] }
    ]
});
