//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/ng_file_name'),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('ng_file_name', rule, {
    valid: [{
        // basic module
        filename: 'myModule.js',
        code: 'angular.module("myModule", []);'
    }, {
        // basic filter
        filename: 'someFilter.js',
        code: 'app.filter("someFilter", function(){});'
    }, {
        // basic controller
        filename: 'SomeController.js',
        code: 'app.controller("SomeController", function(){});'
    }, {
        // basic service
        filename: 'myUtils.js',
        code: 'app.service("myUtils", function(){});'
    }, {
        // basic factory service
        filename: 'myUtils.js',
        code: 'app.factory("myUtils", function(){});'
    }, {
        // basic directive
        filename: 'beautifulDirective.js',
        code: 'app.directive("beautifulDirective", function(){});'
    }, {
        // typeSuffix dot with filter
        filename: 'src/app/myFilter.filter.js',
        code: 'app.filter("myFilter", function(){});',
        options: [{
            typeSuffix: 'dot'
        }]
    }, {
        // ignore $provide declarations
        filename: 'src/app/myApp.module.js',
        code: '$provide.value("accountsService", accountsService);'
    }, {
        // ignore test declarations
        filename: 'src/app/fooBar.spec.js',
        code: 'it("myApp", function(){})'
    },{
        // typeSuffix dash with service (factory)
        filename: 'src/app/someUtil-service.js',
        code: 'app.factory("someUtil", function(){});',
        options: [{
            typeSuffix: 'dash'
        }]
    }, {
        // typeSuffix underscore with controller
        filename: 'src/app/SomeController_controller.js',
        code: 'app.controller("SomeController", function(){});',
        options: [{
            typeSuffix: 'underscore'
        }]
    }],
    invalid: [{
        filename: 'src/app/filters.js',
        code: 'app.filter("myFilter", function(){});',
        errors: [{ message: 'Expected src/app/filters.js to be named myFilter.js'}]
    },{
        filename: 'src/app/myFilter.js',
        code: 'app.filter("myFilter", function(){});',
        options: [{
            typeSuffix: 'dot'
        }],
        errors: [{ message: 'Expected src/app/myFilter.js to be named myFilter.filter.js'}]
    },{
        // typeSuffix underscore with service
        filename: 'src/someService_controller.js',
        code: 'app.factory("someService", function(){});',
        options: [{
            typeSuffix: 'underscore'
        }],
        errors: [{ message: 'Expected src/someService_controller.js to be named someService_service.js'}]
    }]
});
