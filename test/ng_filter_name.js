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
        code: 'app.filter("eslintFilter", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'app.filter("eslintFilter", function(){});',
        args: [1, /^eslint/]
    }, {
        code: 'app.filter("eslintFilter", function(){});',
        args: [1, undefined]
    }, {
        code: 'app.filter("eslintFilter", function(){});',
        args: [1, '/^eslint/']
    }],
    invalid: [
        {
            code: 'app.filter("Filter", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Filter filter should be prefixed by eslint'}]
        }, {
            code: 'app.filter("esLintFilter", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintFilter filter should be prefixed by eslint'}]
        }, {
            code: 'app.filter("Filter", function(){});',
            args: [1, /^eslint/],
            errors: [{ message: 'The Filter filter should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.filter("Filter", function(){});',
            args: [1, '/^eslint/'],
            errors: [{ message: 'The Filter filter should follow this pattern: /^eslint/'}]
        }
    ]
});
