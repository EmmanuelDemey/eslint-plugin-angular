'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/di');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');


var angularNamedObjectList = ['factory', 'service', 'provider', 'controller', 'filter', 'directive'];
var angularObjectList = ['run', 'config'];


var valid = [];
var invalid = [];

angularObjectList.forEach(function(object) {
    valid.push({
        code: 'angular.' + object + '(function() {});',
        options: ['function']
    }, {
        code: 'angular.module("myModule").' + object + '(function() {});',
        options: ['array']
    }, {
        code: 'angular.module("myModule").' + object + '([function() {}]);',
        options: ['array']
    }, {
        code: 'angular.module("myModule").' + object + '(["Service1", function(Service1) {}]);',
        options: ['array']
    }, {
        code: 'angular.module("myModule").' + object + '(myFunction);function MyFunction() {}',
        options: ['function']
    }, {
        code: 'angular.module("myModule").' + object + '(myFunction);myFunction.$inject=[];function myFunction() {}',
        options: ['$inject']
    }, {
        code: 'angular.module("myModule").' + object + '(myFunction);myFunction["$inject"]=["myService"];function myFunction(myService) {}',
        options: ['$inject']
    }, {
        code: 'myFunction.$inject=[];function myFunction() {} angular.module("myModule").' + object + '(myFunction);',
        options: ['$inject']
    }, {
        code: 'function myFunction() {} myFunction.$inject=[];angular.module("myModule").' + object + '(myFunction);',
        options: ['$inject']
    }, {
        code: 'var myFunction = function() {}; myFunction.$inject=[];angular.module("myModule").' + object + '(myFunction);',
        options: ['$inject']
    });

    invalid.push({
        code: 'angular.module("myModule").' + object + '(function(myService) {});',
        options: ['array'],
        errors: [{message: 'You should use the array syntax for DI'}]
    }, {
        code: 'angular.module("myModule").' + object + '([function() {}]);',
        options: ['function'],
        errors: [{message: 'You should use the function syntax for DI'}]
    }, {
        code: 'angular.module("myModule").' + object + '(["Service1", function() {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.module("myModule").' + object + '([function(Service1) {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.module("myModule").' + object + '(myFunction); function myFunction(myService) {}',
        options: ['$inject'],
        errors: [{message: 'You should use the $inject syntax for DI'}]
    }, {
        code: 'function myFunction(myService) {} angular.module("myModule").' + object + '(myFunction);',
        options: ['$inject'],
        errors: [{message: 'You should use the $inject syntax for DI'}]
    }, {
        code: 'function myFunction(myService) {} myFunction.$inject=[];angular.module("myModule").' + object + '(myFunction);',
        options: ['$inject'],
        errors: [{message: 'The signature of the method is incorrect'}]
    });
});

angularNamedObjectList.forEach(function(object) {
    valid.push({
        code: 'angular.module("myModule").' + object + '("name", function() {});',
        options: ['function']
    }, {
        code: 'angular.module("myModule").' + object + '("name", function() {});',
        options: ['array']
    }, {
        code: 'angular.module("myModule").' + object + '("name", [function() {}]);',
        options: ['array']
    }, {
        code: 'angular.module("myModule").' + object + '("name", ["Service1", function(Service1) {}]);',
        options: ['array']
    }, {
        code: 'angular.module("myModule").' + object + '("name", myFunction);function MyFunction() {}',
        options: ['function']
    }, {
        code: 'angular.module("myModule").' + object + '("name", function() {});',
        options: ['$inject']
    }, {
        code: 'angular.module("myModule").' + object + '("name", myFunction);myFunction.$inject=["myService"];function myFunction(myService) {}',
        options: ['$inject']
    }, {
        code: 'myFunction.$inject=["myService"];function myFunction(myService) {} angular.module("myModule").' + object + '("name", myFunction);',
        options: ['$inject']
    }, {
        code: 'function myFunction(myService) {} myFunction.$inject=["myService"];angular.module("myModule").' + object + '("name", myFunction);',
        options: ['$inject']
    }, {
        code: 'var myFunction = function(myService) {}; myFunction.$inject=["myService"];angular.module("myModule").' + object + '("name", myFunction);',
        options: ['$inject']
    });

    invalid.push({
        code: 'angular.module("myModule").' + object + '("name", function(myService) {});',
        options: ['array'],
        errors: [{message: 'You should use the array syntax for DI'}]
    }, {
        code: 'angular.module("myModule").' + object + '("name", [function() {}]);',
        options: ['function'],
        errors: [{message: 'You should use the function syntax for DI'}]
    }, {
        code: 'angular.module("myModule").' + object + '("name", ["Service1", function() {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.module("myModule").' + object + '("name", [function(Service1) {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.module("myModule").' + object + '("name", function (myService) {});',
        options: ['$inject'],
        errors: [{message: 'You should use the $inject syntax for DI'}]
    }, {
        code: 'angular.module("myModule").' + object + '("name", myFunction); function myFunction(myService) {}',
        options: ['$inject'],
        errors: [{message: 'You should use the $inject syntax for DI'}]
    }, {
        code: 'function myFunction(myService) {} angular.module("myModule").' + object + '("name", myFunction);',
        options: ['$inject'],
        errors: [{message: 'You should use the $inject syntax for DI'}]
    });
});


valid.push({
    code: 'vm.navRoutes = states.filter(x).sort(y);',
    options: ['function']
}, {
    code: 'vm.navRoutes = states.filter(x).sort(y);',
    options: ['array']
}, {
    code: 'mocha.run();',
    options: ['array']
}, {
    code: 'mocha.run();',
    options: ['array']
}, {
    // value false positive with function
    code: 'angular.module("") .value("", function () {});',
    options: ['array']
}, {
    // value false positive with array (example from issue #99)
    code: 'angular.module("") .value("", [{ }, { }]);',
    options: ['function']
});

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('di', rule, {
    valid: valid.concat(commonFalsePositives),
    invalid: invalid
});
