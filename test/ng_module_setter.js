//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_module_setter', {
    valid: [
        'angular.module("module", []);'
    ],
    invalid: [{
            code: 'var app = angular.module("module", []);',
            errors: [{ message: 'Declare modules without a variable using the setter syntax.'}]
        }, {
            code: 'let app = angular.module("module", []);',
            errors: [{ message: 'Declare modules without a variable using the setter syntax.'}]
        }, {
            code: 'const app = angular.module("module", []);',
            errors: [{ message: 'Declare modules without a variable using the setter syntax.'}]
        }, {
            code: 'app = angular.module("module", []);',
            errors: [{ message: 'Declare modules without a variable using the setter syntax.'}]
        }
    ]
});
