'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/component-limit');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('component-limit', rule, {
    valid: [
        'angular.module("").controller("", function() {});',
        'angular.module("").directive("", function() {});',
        'angular.module("").factory("", function() {});',
        'angular.module("").filter("", function() {});',
        'angular.module("").filter("", function() {var emptyArray = [1, 2, 3].filter(function() {});});',
        'angular.module("").provider("", function() {});',
        'it("", function() {});it("", function() {});',
        'describe("", function() {it("", function() {});it("", function() {});});',
        'angular.module("").service("", function() {});',
        {
            code: 'angular.module("").controller("", function() {}).directive("", function() {}).factory("", function() {}).filter("", function() {}).provider("", function() {}).service("", function() {});',
            options: [6]
        }
    ].concat(commonFalsePositives),
    invalid: [{
        code: 'angular.module("").controller("", function() {}).directive("", function() {});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file, but found 2'
        }]
    }, {
        code: 'angular.module("").animation("", function() {}).filter("", function() {});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file, but found 2'
        }]
    }, {
        code: 'angular.module("").factory("", function() {}).filter("", function() {});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file, but found 2'
        }]
    }, {
        code: 'angular.module("").provider("", function() {}).service("", function() {});',
        errors: [{
            message: 'There may be at most 1 AngularJS component per file, but found 2'
        }]
    }, {
        code: 'angular.module("").controller("", function() {}).directive("", function() {}).factory("", function() {}).filter("", function() {}).provider("", function() {}).service("", function() {});',
        options: [5],
        errors: [{
            message: 'There may be at most 5 AngularJS components per file, but found 6'
        }]
    }]
});
