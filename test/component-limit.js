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
        'angular.module("").animation();',
        'angular.module("").component();',
        'angular.module("").config();',
        'angular.module("").controller();',
        'angular.module("").directive();',
        'angular.module("").factory();',
        'angular.module("").filter();',
        'angular.module("").provider();',
        'angular.module("").run();',
        'angular.module("").service();',
        'angular.module("").animation("", "");',
        'angular.module("").config("");',
        'angular.module("").controller("", "");',
        'angular.module("").directive("", "");',
        'angular.module("").factory("", "");',
        'angular.module("").filter("", "");',
        'angular.module("").provider("", "");',
        'angular.module("").run("");',
        'angular.module("").service("", "");',
        // Identified potential false positives
        '$scope.$on("", function() {});$scope.$on("", function() {});',
        'app.service("", function(myService) { var data = {}; myService.someMethod("", data); });',
        '$httpBackend.expectGET("").respond(200, dummyData);$httpBackend.expectGET("").respond(200, dummyData);',
        'angular.module("").filter("", function() {var emptyArray = [1, 2, 3].filter(function() {});});',
        'it("", function() {});it("", function() {});',
        'describe("", function() {it("", function() {});it("", function() {});});',
        'angular.module("").service("", function() {});',
        {
            code: 'angular.module("").component("", {}).controller("", function() {}).directive("", function() {}).factory("", function() {}).filter("", function() {}).provider("", function() {}).service("", function() {});',
            options: [7]
        }
    ].concat(commonFalsePositives),
    invalid: [
        // animation
        {
            code: 'angular.module("").animation().animation();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").animation(); app.animation();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.animation().animation();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // directive
        {
            code: 'angular.module("").component().component();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").component(); app.component();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.component().component();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // config
        {
            code: 'angular.module("").config().config();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").config(); app.config();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.config().config();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // controller
        {
            code: 'angular.module("").controller().controller();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").controller(); app.controller();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.controller().controller();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // directive
        {
            code: 'angular.module("").directive().directive();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").directive(); app.directive();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.directive().directive();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // factory
        {
            code: 'angular.module("").factory().factory();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").factory(); app.factory();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.factory().factory();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // filter
        {
            code: 'angular.module("").filter().filter();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").filter(); app.filter();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.filter().filter();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // provider
        {
            code: 'angular.module("").provider().provider();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").provider(); app.provider();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.provider().provider();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // service
        {
            code: 'angular.module("").run().run();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").run(); app.run();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.run().run();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // service
        {
            code: 'angular.module("").service().service();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module("").service(); app.service();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        }, {
            code: 'var app = angular.module(""); app.service().service();',
            errors: [{message: 'There may be at most 1 AngularJS component per file, but found 2'}]
        },
        // Using non-default settings
        {
            code: 'angular.module("").component("", {}).controller("", function() {}).directive("", function() {}).factory("", function() {}).filter("", function() {}).provider("", function() {}).service("", function() {});',
            options: [6],
            errors: [{
                message: 'There may be at most 6 AngularJS components per file, but found 7'
            }]
        }
    ]
});
