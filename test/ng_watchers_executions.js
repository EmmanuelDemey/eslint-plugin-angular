//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_watchers_execution', {
    valid: [
        {code: '$scope.$apply(function(){})',  args: [1, '$apply']},
        {code: '$rootScope.$apply(function(){})',  args: [1, '$apply']},
        {code: '$scope.$digest()',  args: [1, '$digest']},
        {code: '$rootScope.$digest()',  args: [1, '$digest']}
    ],
    invalid: [
        {code: '$scope.$apply(function(){})',  args: [1, '$digest'], errors: [{ message: 'Instead of using the $apply() method, you should prefer $digest()'}]},
        {code: '$rootScope.$apply(function(){})',  args: [1, '$digest'], errors: [{ message: 'Instead of using the $apply() method, you should prefer $digest()'}]},
        {code: '$scope.$digest()',  args: [1, '$apply'], errors: [{ message: 'Instead of using the $digest() method, you should prefer $apply()'}]},
        {code: '$rootScope.$digest()',  args: [1, '$apply'], errors: [{ message: 'Instead of using the $digest() method, you should prefer $apply()'}]}
    ]
});
