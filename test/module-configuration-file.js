'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/module-configuration-file');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('module-configuration-file', rule, {
    valid: [
        {
            // config in a .config.js file
            filename: 'app.config.js',
            code: 'angular.module("app").config(function() {});'
        },
        {
            // config in a .config.js file with module getter
            filename: 'admin.config.js',
            code: 'angular.module("admin").config(function($httpProvider) { $httpProvider.interceptors.push("authInterceptor"); });'
        },
        {
            // simple config.js filename
            filename: 'config.js',
            code: 'angular.module("app").config(function() {});'
        },
        {
            // config in a subdirectory
            filename: 'src/app/modules/admin.config.js',
            code: 'angular.module("admin").config(function() {});'
        },
        {
            // module declaration without config
            filename: 'app.module.js',
            code: 'angular.module("app", []);'
        },
        {
            // controller in non-config file
            filename: 'home.controller.js',
            code: 'angular.module("app").controller("HomeController", function() {});'
        },
        {
            // service in non-config file
            filename: 'user.service.js',
            code: 'angular.module("app").factory("userService", function() {});'
        },
        {
            // test file should be ignored
            filename: 'app.spec.js',
            code: 'angular.module("app").config(function() {});'
        },
        {
            // test file should be ignored
            filename: 'app.test.js',
            code: 'angular.module("app").config(function() {});'
        }
    ].concat(commonFalsePositives),
    invalid: [
        {
            filename: 'app.js',
            code: 'angular.module("app").config(function() {});',
            errors: [{
                message: 'Module configuration should be in a separate file with a .config.js suffix'
            }]
        },
        {
            filename: 'app.module.js',
            code: 'angular.module("app").config(function($httpProvider) { $httpProvider.interceptors.push("authInterceptor"); });',
            errors: [{
                message: 'Module configuration should be in a separate file with a .config.js suffix'
            }]
        },
        {
            filename: 'admin.js',
            code: 'angular.module("admin").config(function() {});',
            errors: [{
                message: 'Module configuration should be in a separate file with a .config.js suffix'
            }]
        },
        {
            filename: 'src/app/admin.module.js',
            code: 'angular.module("admin").config(configFunction);',
            errors: [{
                message: 'Module configuration should be in a separate file with a .config.js suffix'
            }]
        }
    ]
});
