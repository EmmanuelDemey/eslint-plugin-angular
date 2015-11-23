'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/typecheck-function');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('typecheck-function', rule, {
    valid: [
        'angular.isFunction(function() {})'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'typeof variable === "function"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"function" === typeof variable', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: 'variable === "function"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"function" === variable', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: 'typeof variable !== "function"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"function" !== typeof variable', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: 'variable !== "function"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"function" !== variable', errors: [{message: 'You should use the angular.isFunction method'}]},

        {code: 'Object.prototype.toString.call(variable) === "[object Function]"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"[object Function]" === Object.prototype.toString.call(variable)', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: 'variable === "[object Function]"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"[object Function]" === variable', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: 'Object.prototype.toString.call(variable) !== "[object Function]"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"[object Function]" !== Object.prototype.toString.call(variable)', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: 'variable !== "[object Function]"', errors: [{message: 'You should use the angular.isFunction method'}]},
        {code: '"[object Function]" !== variable', errors: [{message: 'You should use the angular.isFunction method'}]}
    ]
});
