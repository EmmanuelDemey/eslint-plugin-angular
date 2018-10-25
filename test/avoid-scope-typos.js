'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../rules/avoid-scope-typos');
const RuleTester = require('eslint').RuleTester;
const commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const eslintTester = new RuleTester();

const variables = ['$scope', '$rootScope'];
const bad = ['new', 'watch', 'watchGroup', 'watchCollection',
    'digest', 'destroy', 'eval', 'evalAsync', 'apply',
    'applyAsync', 'on', 'emit', 'broadcast'];

const nonReservedBad = ['watch', 'watchGroup', 'watchCollection',
    'digest', 'destroy', 'eval', 'evalAsync', 'apply',
    'applyAsync', 'on', 'emit', 'broadcast'];

var invalid = [];
var valid = [];

variables.forEach(function(variable) {
    bad.forEach(function(b) {
        invalid.push({
            code: variable + '.' + b,
            errors: [{message: `The ${b} method should be replaced by $${b}, or you should rename it in order to avoid confusions`}]
        });
    });
});

variables.forEach(function(variable) {
    bad.forEach(function(b) {
        valid.push({
            code: variable + '.$' + b
        });
    });
});

valid.push({
    code: '$ionicPlatform.on("resume", "blabla")'
});

/** Test the usage of the keyword inside an object */
bad.forEach(function(b) {
    valid.push({
        code: '$ctrl.test = {' + b + ':\'test\'}'
    });
});

/** Test for using none reserved keywords as a function name */
nonReservedBad.forEach(function(b) {
    valid.push({
        code: 'function ' + b + '(){}'
    });
});

eslintTester.run('avoid-scope-typos', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid
});
