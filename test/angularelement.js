'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/angularelement');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('angularelement', rule, {
    valid: [
        'angular.element("#id")'
    ].concat(commonFalsePositives),
    invalid: [
        {code: '$( )', errors: [{message: 'You should use angular.element instead of the jQuery $ object'}]},
        {code: 'jQuery( )', errors: [{message: 'You should use angular.element instead of the jQuery $ object'}]}
    ]
});
