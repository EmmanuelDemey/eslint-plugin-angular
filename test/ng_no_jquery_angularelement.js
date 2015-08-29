//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_no_jquery_angularelement'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_no_jquery_angularelement', rule, {
    valid: [
        'angular.element("#id")'
    ],
    invalid: [
        { code: '$(angular.element("#id"))', errors: [{ message: 'angular.element returns already a jQLite element. No need to wrap with the jQuery object'}] },
        { code: 'jQuery(angular.element("#id"))', errors: [{ message: 'angular.element returns already a jQLite element. No need to wrap with the jQuery object'}] }
    ]
});
