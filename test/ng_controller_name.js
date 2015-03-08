//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_controller_name', {
    valid: [{
        code: 'app.controller("eslintController", function(){});',
        args: [1, 'eslint']
    }, {
        code: 'app.controller("eslintController", function(){});',
        args: [1, /^eslint/]
    }, {
        code: 'app.controller("eslintController", function(){});',
        args: [1, undefined]
    }, {
        code: 'app.controller("EslintController", function(){});',
        args: [1, /[A-Z].*Controller$/]
    }],
    invalid: [
        {
            code: 'app.controller("Controller", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Controller controller should be prefixed by eslint'}]
        },
        {
            code: 'app.controller("esLintController", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintController controller should be prefixed by eslint'}]
        },
        {
            code: 'app.controller("Controller", function(){});',
            args: [1, /^eslint/],
            errors: [{ message: 'The Controller controller should follow this pattern: /^eslint/'}]
        },
        {
            code: 'app.controller("customers", function(){});',
            args: [1, /[A-Z].*Controller$/],
            errors: [{ message: 'The customers controller should follow this pattern: /[A-Z].*Controller$/'}]
        },
        {
            code: 'app.controller("customersController", function(){});',
            args: [1, /[A-Z].*Controller$/],
            errors: [{ message: 'The customersController controller should follow this pattern: /[A-Z].*Controller$/'}]
        }
    ]
});
