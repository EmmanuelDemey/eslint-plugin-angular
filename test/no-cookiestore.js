'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/no-cookiestore');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('no-cookiestore', rule, {
    valid: [
        '$cookies();'
    ].concat(commonFalsePositives),
    invalid: [{
        code: '$cookieStore.get("");',
        errors: [{message: 'Since Angular 1.4, the $cookieStore service is deprecated. Please use now the $cookies service.'}]
    }, {
        code: '$cookieStore.put("", "");',
        errors: [{message: 'Since Angular 1.4, the $cookieStore service is deprecated. Please use now the $cookies service.'}]
    }
    ]
});
