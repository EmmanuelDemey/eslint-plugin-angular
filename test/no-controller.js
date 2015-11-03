'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/no-controller');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('no-controller', rule, {
    valid: [
        'app.controller("")',
        'app.service("", function() {})'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'app.controller("", function() {})', errors: [{message: 'Based on the Component-First Pattern, you should avoid the use of controllers'}]},
        {code: 'angular.module("").controller("", function() {})', errors: [{message: 'Based on the Component-First Pattern, you should avoid the use of controllers'}]}
    ]
});
