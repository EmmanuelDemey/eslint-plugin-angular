//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_angularelement', {
    valid: [
        'angular.element("#id")'
    ],
    invalid: [
        { code: '$( )', errors: [{ message: 'You should use angular.element instead of the jQuery $ object'}] },
        { code: 'jQuery( )', errors: [{ message: 'You should use angular.element instead of the jQuery $ object'}] }
    ]
});
