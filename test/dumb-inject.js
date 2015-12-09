'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/dumb-inject');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('log', rule, {
    valid: [
        // Don't crash if no function is passed.
        'inject()',
        // Some valid examples
        'inject(function() {$httpBackend = _$httpBackend_})',
        'inject(function() {$controller = _$controller_; $rootScope = _$rootScope_})',
        'inject(function() {$httpBackend = _$httpBackend_; myService = _myService_})'
    ],
    invalid: [
        // Not an expression statement
        {
            code: 'inject(function() {function foo() {}})',
            errors: [{message: 'inject functions may only consist of assignments in the form myService = _myService_'}]
        },
        // Not an assignment expression
        {
            code: 'inject(function() {$httpBackend.whenGET()})',
            errors: [{message: 'inject functions may only consist of assignments in the form myService = _myService_'}]
        },
        // Right is not a simple identifier
        {
            code: 'inject(function() {navigator = $window.navigator})',
            errors: [{message: 'inject functions may only consist of assignments in the form myService = _myService_'}]
        },
        // Left is not a simple identifier
        {
            code: 'inject(function() {foo.bar = _bar_})',
            errors: [{message: 'inject functions may only consist of assignments in the form bar = _bar_'}]
        },
        // Right is not wrapped using underscores
        {
            code: 'inject(function() {bar = bar})',
            errors: [{message: 'inject functions may only consist of assignments in the form bar = _bar_'}]
        },
        // Left does not match right
        {
            code: 'inject(function() {foo = _bar_})',
            errors: [{message: 'inject functions may only consist of assignments in the form bar = _bar_'}]
        },
        // Bad sorting of statements
        {
            code: 'inject(function() {foo = _foo_; bar = _bar_})',
            errors: [{message: "'bar' must be sorted before 'foo'"}]
        }
    ]
});
