//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_no_digest', {
    valid: [
        '$scope.$apply(function(){})',
        '$rootScope.$apply(function(){})'
    ],
    invalid: [
        { code: '$scope.$digest()', errors: [{ message: 'Instead of using the $digest() method, you should prefer $apply()'}] },
        { code: '$rootScope.$digest()', errors: [{ message: 'Instead of using the $digest() method, you should prefer $apply()'}] }
    ]
});
