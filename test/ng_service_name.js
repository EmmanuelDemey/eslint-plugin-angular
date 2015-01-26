//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_service_name', {
    valid: [{
        code: 'angular.service("eslintDirective", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'angular.factory("eslintDirective", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'angular.provider("eslintDirective", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'angular.constant("eslintDirective", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'angular.value("eslintDirective", function(){});',
        args: [1, 'eslint']
    }],
    invalid: [
        {
            code: 'angular.service("Service", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Service service should be prefixed by eslint'}]
        },
        {
            code: 'angular.service("esLintService", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintService service should be prefixed by eslint'}]
        },
        {
            code: 'angular.provider("Service", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Service service should be prefixed by eslint'}]
        },
        {
            code: 'angular.provider("esLintService", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintService service should be prefixed by eslint'}]
        },
        {
            code: 'angular.factory("Service", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Service service should be prefixed by eslint'}]
        },
        {
            code: 'angular.factory("esLintService", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintService service should be prefixed by eslint'}]
        },
        {
            code: 'angular.constant("Service", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Service service should be prefixed by eslint'}]
        },
        {
            code: 'angular.constant("esLintService", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintService service should be prefixed by eslint'}]
        },
        {
            code: 'angular.value("Service", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Service service should be prefixed by eslint'}]
        },
        {
            code: 'angular.value("esLintService", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintService service should be prefixed by eslint'}]
        }
    ]
});
