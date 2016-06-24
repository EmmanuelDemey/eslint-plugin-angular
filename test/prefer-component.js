'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/prefer-component');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('prefer-component', rule, {
    valid: [
        'angular.module("").directive("")',
        'angular.module("").directive()',
        'angular.module("").factory("", function() {return {link: false}})',
        'angular.module("").directive("", function() {return {compile: false}})',
        'angular.module("").directive("", function() {return {multiElement: false}})',
        'angular.module("").directive("", function() {return {priority: false}})',
        'angular.module("").directive("", function() {return {templateNamespace: false}})',
        'angular.module("").directive("", function() {return {terminal: false}})',
        'angular.module("").directive("", function() {return {restrict: "A"}})',
        'angular.module("").directive("", function() {return {restrict: "C"}})',
        'angular.module("").directive("", function() {return {restrict: "AE"}})',
        'angular.module("").directive("", function() { function x() { return {link: function(){}} }; x(); return {}; })',
        'angular.module("").directive("", function() {return {link:function(){}}})',
        'angular.module("").directive("", function() { var def = {link: function(){}}; return def; })',
        'angular.module("").directive("", function() { var def = {}; def.link = function(){}; return def; })',
        'angular.module("").directive("", directive); function directive() { return {link:function(){}} };',
        'angular.module("").directive("", directive); function directive() { var def = {}; def.link = function(){}; return def; };'
    ].concat(commonFalsePositives),
    invalid: [
        {
            code: 'angular.module("").directive("", function() {return {anotherProperty:"anotherValue"}})',
            errors: [{message: 'Directive should be implemented with the component method.'}]
        },
        {
            code: 'angular.module("").directive("", function() {return {restrict:"E"}})',
            errors: [{message: 'Directive should be implemented with the component method.'}]
        },
        {
            code: 'angular.module("").directive("", function() { var def = {}; return def; })',
            errors: [{message: 'Directive should be implemented with the component method.'}]
        },
        {
            code: 'angular.module("").directive("", function() { var def = {}; def.otherProperty = true; return def; })',
            errors: [{message: 'Directive should be implemented with the component method.'}]
        },
        {
            code: 'angular.module("").directive("", function() { var nonDef = {link: true}; return {}; })',
            errors: [{message: 'Directive should be implemented with the component method.'}]
        }
    ]
});
