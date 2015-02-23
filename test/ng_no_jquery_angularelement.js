//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_no_jquery_angularelement', {
    valid: [
        'angular.element("#id")'
    ],
    invalid: [
        { code: '$(angular.element("#id"))', errors: [{ message: 'angular.element returns already a jQLite element. No need to wrap with the jQuery object'}] },
        { code: 'jQuery(angular.element("#id"))', errors: [{ message: 'angular.element returns already a jQLite element. No need to wrap with the jQuery object'}] }
    ]
});
