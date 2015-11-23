'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/no-jquery-angularelement');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('no-jquery-angularelement', rule, {
    valid: [
        'angular.element("#id")'
    ].concat(commonFalsePositives),
    invalid: [
        {code: '$(angular.element("#id"))', errors: [{message: 'angular.element returns already a jQLite element. No need to wrap with the jQuery object'}]},
        {code: 'jQuery(angular.element("#id"))', errors: [{message: 'angular.element returns already a jQLite element. No need to wrap with the jQuery object'}]}
    ]
});
