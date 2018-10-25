'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/file-name');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('file-name', rule, {
    valid: [{
        // basic module
        filename: 'app.module.js',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: 'fs'
        }],
        code: `(function () {

var mod = 'shared.sales';

angular.module(mod + 'shared.sales.core.angular', ['ngCookies', 'ngRoute', 'ngLocale', 'ngResource', 'ngAnimate', 'ngSanitize', 'ngMessages', 'ngIOS9UIWebViewPatch']);

angular.module(mod + 'shared.sales.thirdparty', ['tmh.dynamicLocale', 'gettext', 'ngMaterial', 'md.data.table', 'fixed.table.header', 'as.sortable', 'ngCsv', 'telemetry']);

angular.module(mod, [mod + '.core.angular', mod + '.thirdparty']);
})();`
    }, {
        // basic module
        filename: 'myModule.js',
        code: 'angular.module("myModule", []);'
    }, {
        // basic filter
        filename: 'someFilter.js',
        code: 'app.filter("someFilter", function() {});'
    }, {
        // basic controller
        filename: 'SomeController.js',
        code: 'app.controller("SomeController", function() {});'
    }, {
        // basic service
        filename: 'myUtils.js',
        code: 'app.service("myUtils", function() {});'
    }, {
        // basic factory service
        filename: 'myUtils.js',
        code: 'app.factory("myUtils", function() {});'
    }, {
        // basic directive
        filename: 'beautifulDirective.js',
        code: 'app.directive("beautifulDirective", function() {});'
    }, {
        // basic component
        filename: 'beautifulComponent.js',
        code: 'app.component("beautifulComponent", {});'
    }, {
        // typeSeparator dot with filter
        filename: 'src/app/myFilter.filter.js',
        code: 'app.filter("myFilter", function() {});',
        options: [{
            typeSeparator: 'dot'
        }]
    }, {
        // ignore $provide declarations
        filename: 'src/app/myApp.module.js',
        code: '$provide.value("accountsService", accountsService);'
    }, {
        // ignore test declarations
        filename: 'src/app/fooBar.spec.js',
        code: 'it("myApp", function() {})'
    }, {
        // ignore test declarations
        filename: 'src/app/myService.spec.js',
        code: '$httpBackend.expectGET("/api/my/service").respond(200, dummyVorversicherer)'
    }, {
        // typeSeparator dash with service (factory)
        filename: 'src/app/someUtil-service.js',
        code: 'app.factory("someUtil", function() {});',
        options: [{
            typeSeparator: 'dash'
        }]
    }, {
        // typeSeparator underscore with controller
        filename: 'src/app/SomeController_controller.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            typeSeparator: 'underscore'
        }]
    }, {
        // typeSeparator dot with controller and ignored type suffix
        filename: 'src/app/Avengers.controller.js',
        code: 'app.controller("AvengersController", function() {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }]
    }, {
        // typeSeparator dot with component and ignored type suffix
        filename: 'src/app/Avengers.component.js',
        code: 'app.component("AvengersComponent", {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }]
    }, {
        // typeSeparator dot with service and ignored type suffix
        filename: 'src/app/avengers.service.js',
        code: 'app.factory("avengersService", function() {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }]
    }, {
        // typeSeparator dot with service and ignored type suffix
        filename: 'src/app/avengersApi.service.js',
        code: 'app.factory("avengersApi", function() {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }]
    }, {
        // typeSeparator dot with service and ignored type suffix (optimization: name shorter than type name)
        filename: 'src/app/utils.service.js',
        code: 'app.factory("utils", function() {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }]
    }, {
        // nameStyle dash and typeSeparator dash with service
        filename: 'src/app/app-utils-service.js',
        code: 'app.factory("appUtils", function() {});',
        options: [{
            typeSeparator: 'dash',
            nameStyle: 'dash'
        }]
    }, {
        // nameStyle underscore and typeSeparator dot with directive
        filename: 'src/app/my_tab.directive.js',
        code: 'app.directive("myTab", function() {});',
        options: [{
            typeSeparator: 'dot',
            nameStyle: 'underscore'
        }]
    }, {
        // ignorePrefix xp with typeSeparator dot and ignoreTypeSuffix
        filename: 'src/app/asset.service.js',
        code: 'angular.factory("xpAssetService", xpAssetService)',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: 'xp'
        }]
    }, {
        // ignorePrefix xp with regex
        filename: 'src/app/asset.service.js',
        code: 'angular.factory("xp.AssetService", xpAssetService)',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: 'xp.'
        }]
    }, {
        // ignorePrefix xp in module name
        filename: 'src/app/core.module.js',
        code: 'angular.module("xp.core", function(){})',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: 'xp.'
        }]
    }, {
        // ignorePrefix xp in main module name
        filename: 'src/app/xp.module.js',
        code: 'angular.module("xp", function(){})',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: 'xp.'
        }]
    }, {
        // ignorePrefix st with typeSeparator dash
        filename: 'src/app/appUtils-service.js',
        code: 'angular.factory("stAppUtils", stAppUtils)',
        options: [{
            typeSeparator: 'dash',
            ignorePrefix: 'st'
        }]
    }, {
        // test to detect false positives for ignorePrefix
        filename: 'staging_service.js',
        code: 'angular.factory("staging", staging)',
        options: [{
            typeSeparator: 'underscore',
            ignorePrefix: 'st'
        }]
    }, {
        // alphanumeric nameStyle dash and typeSeparator dash with service
        filename: 'src/app/app2-utils-service.js',
        code: 'app.factory("app2Utils", function() {});',
        options: [{
            typeSeparator: 'dash',
            nameStyle: 'dash'
        }]
    }, {
        // alphanumeric nameStyle underscore and typeSeparator dot with directive
        filename: 'src/app/my2_tab.directive.js',
        code: 'app.directive("my2Tab", function() {});',
        options: [{
            typeSeparator: 'dot',
            nameStyle: 'underscore'
        }]
    }, {
        // custom componentTypeMappings for factory
        filename: 'src/app/users.factory.js',
        code: 'app.factory("users", function() {});',
        options: [{
            componentTypeMappings: {
                factory: 'factory'
            },
            typeSeparator: 'dot'
        }]
    }, {
        // camel casing, dot typeSeparator, ignoreTypeSuffix of true
        filename: 'src/app/some.controller.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'camel',
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }]
    }, {
        // camel casing
        filename: 'src/app/someController.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'camel'
        }]
    }, {
        // pascal casing, dot typeSeparator, ignoreTypeSuffix of true
        filename: 'src/app/Some.controller.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'pascal',
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }]
    }, {
        // pascal casing
        filename: 'src/app/SomeController.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'pascal'
        }]
    }, {
        // import case
        filename: 'src/app/SomeOtherController.js',
        code: `
            var MyCtrl4 = function() {};
            import {MyCtrl1} from 'src/app/SomeController.js';
            import {MyCtrl2} from 'src/app/SomeDirective.js';
            import {MyCtrl3} from 'src/app/SomeService.js';
            app.controller("SomeController", MyCtrl1);
            app.directive("SomeDirective", MyCtrl2);
            app.service("SomeService", MyCtrl3);
            app.controller("SomeOtherController", MyCtrl4);`,
        parserOptions: {
            ecmaVersion: 6,
            sourceType: 'module'
        }
    }, {
        // RegExp case
        filename: 'src/app/regexp.service.js',
        code: 'app.factory("epaRegexpService", function() {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: '/^epa/'
        }]
    }].concat(commonFalsePositives),
    invalid: [{
        filename: 'src/app/filters.js',
        code: 'app.filter("myFilter", function() {});',
        errors: [{
            message: 'Filename must be "myFilter.js"'
        }]
    }, {
        filename: 'src/app/myFilter.js',
        code: 'app.filter("myFilter", function() {});',
        options: [{
            typeSeparator: 'dot'
        }],
        errors: [{
            message: 'Filename must be "myFilter.filter.js"'
        }]
    }, {
        // typeSeparator underscore with service
        filename: 'src/someService_controller.js',
        code: 'app.factory("someService", function() {});',
        options: [{
            typeSeparator: 'underscore'
        }],
        errors: [{
            message: 'Filename must be "someService_service.js"'
        }]
    }, {
        // typeSeparator dot with controller, but no ignored type suffix
        filename: 'src/app/Avengers.controller.js',
        code: 'app.controller("AvengersController", function() {});',
        options: [{
            typeSeparator: 'dot'
        }],
        errors: [{
            message: 'Filename must be "AvengersController.controller.js"'
        }]
    }, {
        // typeSeparator dot with component, but no ignored type suffix
        filename: 'src/app/Avengers.component.js',
        code: 'app.component("AvengersComponent", {});',
        options: [{
            typeSeparator: 'dot'
        }],
        errors: [{
            message: 'Filename must be "AvengersComponent.component.js"'
        }]
    }, {
        // typeSeparator dot with controller and ignored type suffix
        filename: 'src/app/AvengersController.controller.js',
        code: 'app.controller("AvengersController", function() {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }],
        errors: [{
            message: 'Filename must be "Avengers.controller.js"'
        }]
    }, {
        // typeSeparator dot with component and ignored type suffix
        filename: 'src/app/AvengersComponent.component.js',
        code: 'app.component("AvengersComponent", {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }],
        errors: [{
            message: 'Filename must be "Avengers.component.js"'
        }]
    }, {
        // nameStyle dash and typeSeparator dot with directive
        filename: 'src/app/avangerProfile.directive.js',
        code: 'app.directive("avangerProfile", function() {});',
        options: [{
            typeSeparator: 'dot',
            nameStyle: 'dash'
        }],
        errors: [{
            message: 'Filename must be "avanger-profile.directive.js"'
        }]
    }, {
        // ignorePrefix xp
        filename: 'src/app/xpAsset.service.js',
        code: 'angular.factory("xpAssetService", xpAssetService)',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: 'xp'
        }],
        errors: [{
            message: 'Filename must be "asset.service.js"'
        }]
    }, {
        // ignorePrefix xp.
        filename: 'src/app/xpAsset.service.js',
        code: 'angular.factory("xp.AssetService", xpAssetService)',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: 'xp.'
        }],
        errors: [{
            message: 'Filename must be "asset.service.js"'
        }]
    }, {
        // alphanumeric nameStyle dash and typeSeparator dash with service
        filename: 'src/app/app2utils-service.js',
        code: 'app.factory("app2Utils", function() {});',
        options: [{
            typeSeparator: 'dash',
            nameStyle: 'dash'
        }],
        errors: [{
            message: 'Filename must be "app2-utils-service.js"'
        }]
    }, {
        // alphanumeric nameStyle underscore and typeSeparator dot with directive
        filename: 'src/app/my2tab.directive.js',
        code: 'app.directive("my2Tab", function() {});',
        options: [{
            typeSeparator: 'dot',
            nameStyle: 'underscore'
        }],
        errors: [{
            message: 'Filename must be "my2_tab.directive.js"'
        }]
    }, {
        // custom componentTypeMappings for provider
        filename: 'src/app/users.service.js',
        code: 'app.provider("users", function() {});',
        options: [{
            componentTypeMappings: {
                provider: 'provider'
            },
            typeSeparator: 'dot'
        }],
        errors: [{
            message: 'Filename must be "users.provider.js"'
        }]
    }, {
        // camel casing, dot typeSeparator, ignoreTypeSuffix of true
        filename: 'src/app/SomeController.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'camel',
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }],
        errors: [{
            message: 'Filename must be "some.controller.js"'
        }]
    }, {
        // camel casing
        filename: 'src/app/SomeController.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'camel'
        }],
        errors: [{
            message: 'Filename must be "someController.js"'
        }]
    }, {
        // pascal casing, dot typeSeparator, ignoreTypeSuffix of true
        filename: 'src/app/someController.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'pascal',
            typeSeparator: 'dot',
            ignoreTypeSuffix: true
        }],
        errors: [{
            message: 'Filename must be "Some.controller.js"'
        }]
    }, {
        // pascal casing
        filename: 'src/app/someController.js',
        code: 'app.controller("SomeController", function() {});',
        options: [{
            casing: 'pascal'
        }],
        errors: [{
            message: 'Filename must be "SomeController.js"'
        }]
    }, {
        // import case
        filename: 'src/app/SomeController.js',
        code: `
            import {MyCtrl} from 'src/app/main.js'
            app.controller("SomeController", MyCtrl);`,
        parserOptions: {
            ecmaVersion: 6,
            sourceType: 'module'
        },
        errors: [{
            message: 'Filename must be "SomeController.js"'
        }]
    }, {
        // RegExp case
        filename: 'src/app/Regexp.service.js',
        code: 'app.factory("epaRegexpService", function() {});',
        options: [{
            typeSeparator: 'dot',
            ignoreTypeSuffix: true,
            ignorePrefix: '/^epa/'
        }],
        errors: [{
            message: 'Filename must be "regexp.service.js"'
        }]
    }]
});
