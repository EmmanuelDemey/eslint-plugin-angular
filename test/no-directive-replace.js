'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/no-directive-replace');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('no-directive-replace', rule, {
    valid: [
        'angular.module("").factory("", function() {return {replace: false}})',
        'angular.module("").directive("")',
        'angular.module("").directive()',
        'angular.module("").directive("", function() {})',
        'angular.module("").directive("", function() {return {anotherProperty:"anotherValue"}})',
        'angular.module("").directive("", function() {return {restrict:"A"}})',
        'angular.module("").directive("", function() { var def = {}; return def; })',
        'angular.module("").directive("", function() { function x() { return {replace: true} }; x(); return {}; })',

        'angular.module("").directive("", function() { var def = {}; def.otherProperty = true; return def; })',
        'angular.module("").directive("", function() { var nonDef = {replace: true}; return {}; })',
        'angular.module("").directive("", function() { var nonDef = {}; function x() { var nonDef = {replace: true} }; x(); return nonDef; })',
        {
            code: 'angular.module("").directive("", function() {return {replace:false}})',
            options: [{ignoreReplaceFalse: true}]
        },
        {
            code: 'angular.module("").directive("", function() { var def = {}; def.replace = false; return def; })',
            options: [{ignoreReplaceFalse: true}]
        }
    ].concat(commonFalsePositives),
    invalid: [
        // Disallowed with default configuration
        {
            code: 'angular.module("").directive("", function() {return {replace:true}})',
            errors: [{message: 'Directive definition property replace is deprecated.'}]
        },
        {
            code: 'angular.module("").directive("", function() { var def = {replace: true}; return def; })',
            errors: [{message: 'Directive definition property replace is deprecated.'}]
        },
        {
            code: 'angular.module("").directive("", function() { var def = {}; def.replace = true; return def; })',
            errors: [{message: 'Directive definition property replace is deprecated.'}]
        },
        // Disallow replace false with default configuration
        {
            code: 'angular.module("").directive("", function() {return {replace:0}})',
            options: [{ignoreReplaceFalse: true}],
            errors: [{message: 'Directive definition property replace is deprecated.'}]
        },
        // named functions
        {
            code: 'angular.module("").directive("", directive); function directive() { return {replace:true} };',
            errors: [{message: 'Directive definition property replace is deprecated.'}]
        },
        {
            code: 'angular.module("").directive("", directive); function directive() { var def = {}; def.replace = true; return def; };',
            errors: [{message: 'Directive definition property replace is deprecated.'}]
        }
    ]
});
