'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/di-unused');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('di-unused', rule, {
    valid: [
        'angular.module("").controller("", function($q) {return $q;});',
        'angular.module("").controller("", ["$q", function($q) {return $q;}]);',
        'angular.module("").animation("", function($q) {return $q;});',
        'angular.module("").animation("", ["$q", function($q) {return $q;}]);',
        'angular.module("").directive("", function($q) {return $q;});',
        'angular.module("").directive("", ["$q", function($q) {return $q;}]);',
        'angular.module("").factory("", function($q) {return $q;});',
        'angular.module("").factory("", ["$q", function($q) {return $q;}]);',
        'angular.module("").factory("", function($q) {return function() {return $q;};});',
        'angular.module("").factory("", function() {var myVar;});',
        'angular.module("").filter("", function($q) {return $q;});',
        'angular.module("").filter("", ["$q", function($q) {return $q;}]);',
        'angular.module("").provider("", function($httpProvider) {return $httpProvider;});',
        'angular.module("").provider("", ["$$httpProvider", function($$httpProvider) {return $$httpProvider;}]);',
        'angular.module("").service("", function($q) {return $q;});',
        'angular.module("").service("", ["$q", function($q) {return $q;}]);',
        'angular.module("").config(function($httpProvider) {$httpProvider.defaults.headers.post.answer="42"})',
        'angular.module("").config(["$httpProvider", function($httpProvider) {$httpProvider.defaults.headers.post.answer="42"}]);',
        'angular.module("").run(function($q) {$q()})',
        'angular.module("").run(["$q", function($q) {return $q;}]);',
        'inject(function($q) {_$q_ = $q;});',
        'angular.module("").provider("", function() {this.$get = function($q) {return $q};});',
        'angular.module("").provider("", function() {this.$get = ["$q", function($q) {return $q}];});'
    ].concat(commonFalsePositives),
    invalid: [{
        code: 'angular.module("").animation("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").animation("", ["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").controller("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").controller("", ["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'var app = angular.module("").controller(""); app.controller("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'var app = angular.module(""); app.controller("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").controller("", LoginController); function LoginController($q) {}',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").directive("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").directive("", ["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").factory("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").factory("", ["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").factory("", function($http, $q) {});',
        errors: [
            {message: 'Unused injected value $http'},
            {message: 'Unused injected value $q'}
        ]
    }, {
        code: 'angular.module("").factory("", function($http, $q) {return $q.resolve()});',
        errors: [
            {message: 'Unused injected value $http'}
        ]
    }, {
        code: 'angular.module("").filter("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").filter("", ["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").provider("", function($httpProvider) {});',
        errors: [{message: 'Unused injected value $httpProvider'}]
    }, {
        code: 'angular.module("").provider("", ["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").service("", function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").service("", ["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").config(function($httpProvider) {})',
        errors: [{message: 'Unused injected value $httpProvider'}]
    }, {
        code: 'angular.module("").config(["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").run(function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").run(["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'inject(function($q) {});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'inject(["q", function($q) {}]);',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").provider("", function() {this.$get = function($q) {};});',
        errors: [{message: 'Unused injected value $q'}]
    }, {
        code: 'angular.module("").provider("", function() {this.$get = ["q", function($q) {}];});',
        errors: [{message: 'Unused injected value $q'}]
    }]
});
