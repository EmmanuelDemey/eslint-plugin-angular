'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/di');
var RuleTester = require('eslint').RuleTester;


var angularNamedObjectList = ['value', 'factory', 'service', 'provider', 'controller', 'filter', 'directive'];
var angularObjectList = ['run', 'config'];


var valid = [];
var invalid = [];

angularObjectList.forEach(function(object) {
    valid.push({
        code: 'angular.' + object + '(function() {});',
        options: ['function']
    }, {
        code: 'angular.' + object + '([function() {}]);',
        options: ['array']
    }, {
        code: 'angular.' + object + '(["Service1", function(Service1) {}]);',
        options: ['array']
    }, {
        code: 'angular.' + object + '(myFunction);function MyFunction() {}',
        options: ['function']
    }, {
        code: 'angular.' + object + '(myFunction);myFunction.$inject=[];function myFunction() {}',
        options: ['function.$inject']
    }, {
        code: 'angular.' + object + '(myFunction);myFunction["$inject"]=[];function myFunction() {}',
        options: ['function.$inject']
    }, {
        code: 'myFunction.$inject=[];function myFunction() {} angular.' + object + '(myFunction);',
        options: ['function.$inject']
    }, {
        code: 'function myFunction() {} myFunction.$inject=[];angular.' + object + '(myFunction);',
        options: ['function.$inject']
    }, {
        code: 'var myFunction = function() {}; myFunction.$inject=[];angular.' + object + '(myFunction);',
        options: ['function.$inject']
    });

    invalid.push({
        code: 'angular.' + object + '(function() {});',
        options: ['array'],
        errors: [{message: 'You should use the array syntax for DI'}]
    }, {
        code: 'angular.' + object + '([function() {}]);',
        options: ['function'],
        errors: [{message: 'You should use the function syntax for DI'}]
    }, {
        code: 'angular.' + object + '(["Service1", function() {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.' + object + '([function(Service1) {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.' + object + '(myFunction); function myFunction() {}',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
    }, {
        code: 'function myFunction() {} angular.' + object + '(myFunction);',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
    }, {
        code: 'var myFunction = function() {};angular.' + object + '(myFunction);',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
    }, {
        code: 'angular.' + object + '(function() {});',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
    });
});

angularNamedObjectList.forEach(function(object) {
    valid.push({
        code: 'angular.' + object + '("name", function() {});',
        options: ['function']
    }, {
        code: 'angular.' + object + '("name", [function() {}]);',
        options: ['array']
    }, {
        code: 'angular.' + object + '("name", ["Service1", function(Service1) {}]);',
        options: ['array']
    }, {
        code: 'angular.' + object + '("name", myFunction);function MyFunction() {}',
        options: ['function']
    }, {
        code: 'angular.' + object + '("name", myFunction);myFunction.$inject=[];function myFunction() {}',
        options: ['function.$inject']
    }, {
        code: 'myFunction.$inject=[];function myFunction() {} angular.' + object + '("name", myFunction);',
        options: ['function.$inject']
    }, {
        code: 'function myFunction() {} myFunction.$inject=[];angular.' + object + '("name", myFunction);',
        options: ['function.$inject']
    }, {
        code: 'var myFunction = function() {}; myFunction.$inject=[];angular.' + object + '("name", myFunction);',
        options: ['function.$inject']
    });

    invalid.push({
        code: 'angular.' + object + '("name", function() {});',
        options: ['array'],
        errors: [{message: 'You should use the array syntax for DI'}]
    }, {
        code: 'angular.' + object + '("name", [function() {}]);',
        options: ['function'],
        errors: [{message: 'You should use the function syntax for DI'}]
    }, {
        code: 'angular.' + object + '("name", ["Service1", function() {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.' + object + '("name", [function(Service1) {}]);',
        options: ['array'],
        errors: [{message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.' + object + '("name", myFunction); function myFunction() {}',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
    }, {
        code: 'function myFunction() {} angular.' + object + '("name", myFunction);',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
    }, {
        code: 'var myFunction = function () {};angular.' + object + '("name", myFunction);',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
    }, {
        code: 'angular.' + object + '("name", function() {});',
        options: ['function.$inject'],
        errors: [{message: 'You should use the function.$inject syntax for DI'}]
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
});
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('di', rule, {
    valid: valid,
    invalid: invalid
});
