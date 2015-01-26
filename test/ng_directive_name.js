//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_directive_name', {
    valid: [{
        code: 'angular.directive("eslintDirective", function(){});',
        args: [1, 'eslint']
    }],
    invalid: [
        {
            code: 'angular.directive("Directive", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Directive directive should be prefixed by eslint'}]
        },
        {
            code: 'angular.directive("esLintDirective", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintDirective directive should be prefixed by eslint'}]
        }
    ]
});
