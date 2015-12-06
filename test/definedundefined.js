'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/definedundefined');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('definedundefined', rule, {
    valid: [
        'angular.isUndefined(toto)',
        'angular.isDefined(toto)',
        // possible false positives
        'variable === otherValue',
        'variable === null',
        'variable > undefined',
        'angular.isString(null)'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'variable === undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined === variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined !== variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'variable !== undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'variable == undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined == variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined != variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'variable != undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'typeof variable === "undefined"', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'typeof variable !== "undefined"', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: '"undefined" == typeof variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: '"undefined" != typeof variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: '!angular.isUndefined(variable)', errors: [{message: 'Instead of !angular.isUndefined, you can use the out-of-box angular.isDefined method'}]},
        {code: '!angular.isDefined(variable)', errors: [{message: 'Instead of !angular.isDefined, you can use the out-of-box angular.isUndefined method'}]}
    ]
});
