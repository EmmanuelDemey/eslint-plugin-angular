'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/typecheck-number');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('typecheck-number', rule, {
    valid: [
        'angular.isNumber(1)'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'Object.prototype.toString.call(variable) === "[object Number]"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"[object Number]" === Object.prototype.toString.call(variable)', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: 'variable === "[object Number]"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"[object Number]" === variable', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: 'Object.prototype.toString.call(variable) !== "[object Number]"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"[object Number]" !== Object.prototype.toString.call(variable)', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: 'variable !== "[object Number]"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"[object Number]" !== variable', errors: [{message: 'You should use the angular.isNumber method'}]},

        {code: 'typeof variable === "number"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"number" === typeof variable', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: 'variable === "number"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"number" === variable', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: 'typeof variable !== "number"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"[object Number]" !== typeof variable', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: 'variable !== "number"', errors: [{message: 'You should use the angular.isNumber method'}]},
        {code: '"number" !== variable', errors: [{message: 'You should use the angular.isNumber method'}]}
    ]
});
