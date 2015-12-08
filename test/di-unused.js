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
        'angular.module("").provider("", function() {this.$get = ["$q", function($q) {return $q}];});',
        // Potential crashes
        'angular.module("").animation("", "");',
        'angular.module("").config("");',
        'angular.module("").controller("", "");',
        'angular.module("").directive("", "");',
        'angular.module("").factory("", "");',
        'angular.module("").filter("", "");',
        'angular.module("").provider("", "");',
        'angular.module("").run("");',
        'angular.module("").service("", "");'
    ].concat(commonFalsePositives),
    invalid: [
        // animation
        {
            code: 'angular.module("").animation("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").animation("", ["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.animation("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").animation("", fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // controller
        {
            code: 'angular.module("").controller("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").controller("", ["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.controller("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").controller("", fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // directive
        {
            code: 'angular.module("").directive("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").directive("", ["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.directive("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").directive("", fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // factory
        {
            code: 'angular.module("").factory("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").factory("", ["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.factory("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").factory("", fn); function fn($q) {}',
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
            code: 'angular.module("").factory("", ["$http", "$q", function($http, $q) {return $q.resolve()}]);',
            errors: [
                {message: 'Unused injected value $http'}
            ]
        },
        // filter
        {
            code: 'angular.module("").filter("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").filter("", ["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.filter("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").filter("", fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // provider
        {
            code: 'angular.module("").provider("", function($httpProvider) {});',
            errors: [{message: 'Unused injected value $httpProvider'}]
        }, {
            code: 'angular.module("").provider("", ["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.provider("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").provider("", fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // service
        {
            code: 'angular.module("").service("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").service("", ["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.service("", function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").service("", fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // config
        {
            code: 'angular.module("").config(function($httpProvider) {})',
            errors: [{message: 'Unused injected value $httpProvider'}]
        }, {
            code: 'angular.module("").config(["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.config(function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").config(fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // run
        {
            code: 'angular.module("").run(function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").run(["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'var app = angular.module(""); app.run(function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").run(fn); function fn($q) {}',
            errors: [{message: 'Unused injected value $q'}]
        },
        // inject
        {
            code: 'inject(function($q) {});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'inject(["q", function($q) {}]);',
            errors: [{message: 'Unused injected value $q'}]
        },
        // provider $get
        {
            code: 'angular.module("").provider("", function() {this.$get = function($q) {};});',
            errors: [{message: 'Unused injected value $q'}]
        }, {
            code: 'angular.module("").provider("", function() {this.$get = ["q", function($q) {}];});',
            errors: [{message: 'Unused injected value $q'}]
        },
        // examples from issue #287
        {
            code: 'angular.module("myapp").filter("myfilter", [ "$translate", "$filter", function ($translate, $filter) { return function (value) { return $filter(value, 4) * 100; } } ]);',
            errors: [{message: 'Unused injected value $translate'}]
        }
    ]
});
