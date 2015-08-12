//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_directive_name'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_directive_name', rule, {
    valid: [{
        code: 'app.directive("eslintDirective", function(){});',
        options: ['eslint']
    }, {
        code: 'app.directive("eslintDirective", function(){});',
        options: [/^eslint/]
    }, {
        code: 'app.directive("eslintDirective", function(){});',
        options: [undefined]
    }, {
        code: 'app.directive("eslintDirective", function(){});',
        options: ['/^eslint/']
    }],
    invalid: [
        {
            code: 'app.directive("Directive", function(){});',
            options: ['eslint'],
            errors: [{ message: 'The Directive directive should be prefixed by eslint'}]
        },
        {
            code: 'app.directive("esLintDirective", function(){});',
            options: ['eslint'],
            errors: [{ message: 'The esLintDirective directive should be prefixed by eslint'}]
        },
        {
            code: 'app.directive("Directive", function(){});',
            options: [/^eslint/],
            errors: [{ message: 'The Directive directive should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.directive("Directive", function(){});',
            options: ['/^eslint/'],
            errors: [{ message: 'The Directive directive should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.directive("ngDirective", []);',
            options: [/^eslint/],
            errors: [{ message: 'The ngDirective directive should not start with "ng". This is reserved for AngularJS directives'}]
        }
    ]
});
