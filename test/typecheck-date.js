'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/typecheck-date');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('typecheck-date', rule, {
    valid: [
        'angular.isDate(variable)'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'Object.prototype.toString.call(variable) === "[object Date]"', errors: [{message: 'You should use the angular.isDate method'}]},
        {code: '"[object Date]" === Object.prototype.toString.call(variable)', errors: [{message: 'You should use the angular.isDate method'}]},
        {code: 'variable === "[object Date]"', errors: [{message: 'You should use the angular.isDate method'}]},
        {code: '"[object Date]" === variable', errors: [{message: 'You should use the angular.isDate method'}]},
        {code: 'Object.prototype.toString.call(variable) !== "[object Date]"', errors: [{message: 'You should use the angular.isDate method'}]},
        {code: '"[object Date]" !== Object.prototype.toString.call(variable)', errors: [{message: 'You should use the angular.isDate method'}]},
        {code: 'variable !== "[object Date]"', errors: [{message: 'You should use the angular.isDate method'}]},
        {code: '"[object Date]" !== variable', errors: [{message: 'You should use the angular.isDate method'}]}
    ]
});
