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
        code: 'app.module("eslintModule", []);',
        args: [1, 'eslint']
    }, {
        code: 'app.module("module");',
        args: [1, 'eslint']
    }, {
        code: 'app.module("eslintModule", []);',
        args: [1, /^eslint/]
    }, {
        code: 'app.module("eslintModule", []);',
        args: [1, '/^eslint/']
    }, {
        code: 'app.module("eslintModule", []);',
        args: [1, undefined]
    }],
    invalid: [
        {
            code: 'app.module("module", []);',
            args: [1, 'eslint'],
            errors: [{ message: 'The module module should be prefixed by eslint'}]
        }, {
            code: 'app.module("ESLintModule", []);',
            args: [1, 'eslint'],
            errors: [{ message: 'The ESLintModule module should be prefixed by eslint'}]
        }, {
            code: 'app.module("module", []);',
            args: [1, /^eslint/],
            errors: [{ message: 'The module module should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.module("module", []);',
            args: [1, "/^eslint/"],
            errors: [{ message: 'The module module should follow this pattern: /^eslint/'}]
        }, {
            code: 'app.module("ngModule", []);',
            args: [1, /^ng/],
            errors: [{ message: 'The ngModule module should not start with "ng". This is reserved for AngularJS modules'}]
        }
    ]
});
