//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_typecheck_date'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_typecheck_date', rule, {
    valid: [
        'angular.isDate(variable)'
    ],
    invalid: [
        { code: 'Object.prototype.toString.call(variable) === "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" === Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: 'variable === "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" === variable', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: 'Object.prototype.toString.call(variable) !== "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" !== Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: 'variable !== "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" !== variable', errors: [{ message: 'You should use the angular.isDate method'}] }
    ]
});
