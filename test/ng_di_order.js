//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_di_order'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_di_order', rule, {
    valid: [
        'app.controller("", function($http, $q){});',
        'app.directive("", function($http, $q){});',
        'app.factory("", function($http, $q){});',
        'app.filter("", function($http, $q){});',
        'app.provider("", function($http, $q){});',
        'app.service("", function($http, $q){});',
        'inject(function($http, $q){});',
        'it(inject(function($http, $q){}));',
        'this.$get = function($http, $q){};',
    ],
    invalid: [{
        code: 'app.controller("", function($q, $http){});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'app.directive("", function($q, $http){});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'app.factory("", function($q, $http){});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'app.filter("", function($q, $http){});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'app.provider("", function($q, $http){});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'app.service("", function($q, $http){});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'inject(function($q, $http){});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'it(inject(function($q, $http){}));',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'this.$get = function($q, $http){};',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }]
});
