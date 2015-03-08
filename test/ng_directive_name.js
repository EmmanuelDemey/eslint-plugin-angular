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
        code: 'app.directive("eslintDirective", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'app.directive("eslintDirective", function(){});',
        args: [1, /^eslint/]
    }, {
        code: 'app.directive("eslintDirective", function(){});',
        args: [1, undefined]
    }],
    invalid: [
        {
            code: 'app.directive("Directive", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Directive directive should be prefixed by eslint'}]
        },
        {
            code: 'app.directive("esLintDirective", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintDirective directive should be prefixed by eslint'}]
        },
        {
            code: 'app.directive("Directive", function(){});',
            args: [1, /^eslint/],
            errors: [{ message: 'The Directive directive should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.directive("ngDirective", []);',
            args: [1, /^eslint/],
            errors: [{ message: 'The ngDirective directive should not start with "ng". This is reserved for AngularJS directives'}]
        }
    ]
});
