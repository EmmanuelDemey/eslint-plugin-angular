'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/document-service');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('document-service', rule, {
    valid: [
        '$document[0].title = ""'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'document.title', errors: [{message: 'You should use the $document service instead of the default document object'}]},
        {code: 'window.document.title', errors: [{message: 'You should use the $document service instead of the default document object'}]}
    ]
});
