//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_typecheck_array'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_typecheck_array', rule, {
    valid: [
        'angular.isArray([])'
    ],
    invalid: [
        { code: 'Object.prototype.toString.call([]) === "[object Array]"', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: '"[object Array]" === Object.prototype.toString.call([])', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: 'variable === "[object Array]"', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: '"[object Array]" === variable', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: 'Object.prototype.toString.call([]) !== "[object Array]"', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: '"[object Array]" !== typeof []', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: 'variable !== "[object Array]"', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: '"[object Array]" !== variable', errors: [{ message: 'You should use the angular.isArray method'}] },
        { code: 'Array.isArray(variable)', errors: [{ message: 'You should use the angular.isArray method'}] }
    ]
});
