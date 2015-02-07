//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_filter_name', {
    valid: [{
        code: 'angular.filter("eslintFilter", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'angular.filter("eslintFilter", function(){});',
        args: [1, /^eslint/]
    }],
    invalid: [
        {
            code: 'angular.filter("Filter", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Filter filter should be prefixed by eslint'}]
        }, {
            code: 'angular.filter("esLintFilter", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintFilter filter should be prefixed by eslint'}]
        }, {
            code: 'angular.filter("Filter", function(){});',
            args: [1, /^eslint/],
            errors: [{ message: 'The Filter filter should follow this pattern: /^eslint/'}]
        }
    ]
});
