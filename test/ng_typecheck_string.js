//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_typecheck_string'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_typecheck_string', rule, {
    valid: [
        'angular.isString("")'
    ],
    invalid: [
        { code: 'Object.prototype.toString.call(variable) === "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" === Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'variable === "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" === variable', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'Object.prototype.toString.call(variable) !== "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" !== Object.prototype.toString.call(variable)', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'variable !== "[object String]"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"[object String]" !== variable', errors: [{ message: 'You should use the angular.isString method'}] },
        
        { code: 'typeof variable === "string"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"string" === typeof variable', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'variable === "string"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"string" === variable', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'typeof variable !== "string"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"string" !== typeof variable', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: 'variable !== "string"', errors: [{ message: 'You should use the angular.isString method'}] },
        { code: '"string" !== variable', errors: [{ message: 'You should use the angular.isString method'}] }
    ]
});
