//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_module_name', {
    valid: [{
        code: 'angular.module("eslintModule", []);',
        args: [1, 'eslint']
    },
    {
        code: 'angular.module("module");',
        args: [1, 'eslint']
    }],
    invalid: [
        {
            code: 'angular.module("module", []);',
            args: [1, 'eslint'],
            errors: [{ message: 'The module module should be prefixed by eslint'}]
        },
        {
            code: 'angular.module("ESLintModule", []);',
            args: [1, 'eslint'],
            errors: [{ message: 'The ESLintModule module should be prefixed by eslint'}]
        }
    ]
});
