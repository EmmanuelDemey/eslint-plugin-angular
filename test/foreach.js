'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/foreach');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('foreach', rule, {
    valid: [
        'angular.forEach(variable, function() {})'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'variable.forEach(function() {})', errors: [{message: 'You should use the angular.forEach method'}]}
    ]
});
