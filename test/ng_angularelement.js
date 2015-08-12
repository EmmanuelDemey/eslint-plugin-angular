//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_angularelement'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_angularelement', rule, {
    valid: [
        'angular.element("#id")'
    ],
    invalid: [
        { code: '$( )', errors: [{ message: 'You should use angular.element instead of the jQuery $ object'}] },
        { code: 'jQuery( )', errors: [{ message: 'You should use angular.element instead of the jQuery $ object'}] }
    ]
});
