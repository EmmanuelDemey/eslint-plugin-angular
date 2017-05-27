'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/timeout-service');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();

var message = 'You should use the $timeout service instead of the default window.setTimeout method';

eslintTester.run('timeout-service', rule, {
    valid: [
        'jasmine.getGlobal().setTimeout',
        '$timeout(function() {})',
        '$timeout(function() {}, 1000)',
        '$timeout(function() {}, 1000, true)',
        'nonWindowObject.setTimeout(function() {})'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'window.setTimeout(function() {}, 1000)', errors: [{message: message}]},
        {code: 'window.setTimeout(function() {}, 1000, param1)', errors: [{message: message}]},
        {code: '$window.setTimeout(function() {}, 1000)', errors: [{message: message}]},
        {code: 'this.$window.setTimeout(function() {}, 1000)', errors: [{message: message}]},
        {code: 'setTimeout(function() {}, 1000)', errors: [{message: message}]},
        {code: 'setTimeout(function() {}, 1000, param1)', errors: [{message: message}]}
    ]
});
