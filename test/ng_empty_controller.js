//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_empty_controller', {
    valid: [{
        code: 'angular.controller("ctrl", function(){ console.log("ok");});',
        args: [1]
    },
    {
        code: 'angular.controller("ctrl", ["service1", function(service1){ console.log("ok");}]);',
        args: [1]
    }],
    invalid: [
        {
            code: 'angular.controller("ctrl", function(){ });',
            args: [1],
            errors: [{ message: 'The ctrl controller is useless because empty. You can remove it from your Router configuration or in one of your view'}]
        },
        {
            code: 'angular.controller("ctrl", ["service1", function(service1){ }]);',
            args: [1],
            errors: [{ message: 'The ctrl controller is useless because empty. You can remove it from your Router configuration or in one of your view'}]
        }
    ]
});
