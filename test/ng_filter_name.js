//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_filter_name'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_filter_name', rule, {
    valid: [{
        code: 'app.filter("eslintFilter", function(){});',
        options: ['eslint']
    }, {
        code: 'app.filter("eslintFilter", function(){});',
        options: [/^eslint/]
    }, {
        code: 'app.filter("eslintFilter", function(){});',
        options: [undefined]
    }, {
        code: 'app.filter("eslintFilter", function(){});',
        options: ['/^eslint/']
    }],
    invalid: [
        {
            code: 'app.filter("Filter", function(){});',
            options: ['eslint'],
            errors: [{ message: 'The Filter filter should be prefixed by eslint'}]
        }, {
            code: 'app.filter("esLintFilter", function(){});',
            options: ['eslint'],
            errors: [{ message: 'The esLintFilter filter should be prefixed by eslint'}]
        }, {
            code: 'app.filter("Filter", function(){});',
            options: [/^eslint/],
            errors: [{ message: 'The Filter filter should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.filter("Filter", function(){});',
            options: ['/^eslint/'],
            errors: [{ message: 'The Filter filter should follow this pattern: /^eslint/'}]
        }
    ]
});
