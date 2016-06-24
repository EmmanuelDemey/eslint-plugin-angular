'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/controller-as-vm');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('controller-as-vm', rule, {
    valid: [
        {code: 'angular.module("test").controller("Test", function() {var vm = this; vm.test = "test";} )',
            options: ['vm']},
        {code: 'angular.module("test").controller("Test", function() {var viewModel = this; viewModel.test = "test";} )',
            options: ['viewModel']},
        {code: 'angular.module("test").controller("Test", function() {var vm = this; vm.test();} )',
            options: ['vm']},
        {code: 'angular.module("test").controller("Test", class {constructor(){this.x = 0;}} )',
            options: ['vm'], parserOptions: {ecmaVersion: 6}},
        {code: 'angular.module("test").service("Test", function() {this.doSomething();} )',
            options: ['vm']},
        {code: 'angular.module("test").service("Test", class {constructor(){this.x = 0;}} )',
            options: ['vm'], parserOptions: {ecmaVersion: 6}}
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'function controllerFunc() {this.test = "test";} angular.module("test").controller("Test", controllerFunc )',
            options: ['vm'],
            errors: [{message: 'You should not use "this" directly. Instead, assign it to a variable called "vm"'}]},
        {code: 'angular.module("test").controller("Test", function() {this.test();} )',
            options: ['vm'],
            errors: [{message: 'You should not use "this" directly. Instead, assign it to a variable called "vm"'}]},
        {code: 'var myController = function() {var ctrl = this; ctrl.test();}; angular.module("test").controller("Test", myController )',
            options: ['vm'],
            errors: [{message: 'You should assign "this" to a consistent variable across your project: vm'}]},
        {code: 'angular.module("test").controller("Test", function() {var vm = this; vm.test = "test";} )',
            options: ['viewModel'],
            errors: [{message: 'You should assign "this" to a consistent variable across your project: viewModel'}]},
        {code: 'function MyController () {var ctrl = this; ctrl.test();}',
            options: ['vm', '/[A-Z].*Controller/'],
            errors: [{message: 'You should assign "this" to a consistent variable across your project: vm'}]}
    ]
});
