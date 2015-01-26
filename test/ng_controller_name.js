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
        code: 'angular.controller("eslintController", function(){});',
        args: [1, 'eslint']
    }],
    invalid: [
        {
            code: 'angular.controller("Controller", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The Controller controller should be prefixed by eslint'}]
        },
        {
            code: 'angular.controller("esLintController", function(){});',
            args: [1, 'eslint'],
            errors: [{ message: 'The esLintController controller should be prefixed by eslint'}]
        }
    ]
});
