//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

var angularObjectList = ['value', 'constant', 'factory', 'service', 'provider', 'controller', 'filter', 'directive'];
var valid = [], invalid = [];

angularObjectList.forEach(function(object){
    valid.push({
        code: 'angular.' + object + '("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.' + object + '("name", [function(){}]);',
        args: [1, 'array']
    }, {
        code: 'angular.' + object + '("name", ["Service1", function(Service1){}]);',
        args: [1, 'array']
    }, {
        code: 'angular.' + object + '("name", myFunction);function MyFunction(){}',
        args: [1, 'function']
    });

    invalid.push({
        code: 'angular.' + object + '("name", function(){});',
        args: [1, 'array'],
        errors: [{ message: 'You should use the array syntax for DI'}]
    }, {
        code: 'angular.' + object + '("name", [function(){}]);',
        args: [1, 'function'],
        errors: [{ message: 'You should use the function syntax for DI'}]
    }, {
        code: 'angular.' + object + '("name", ["Service1", function(){}]);',
        args: [1, 'array'],
        errors: [{ message: 'The signature of the method is incorrect'}]
    }, {
        code: 'angular.' + object + '("name", [function(Service1){}]);',
        args: [1, 'array'],
        errors: [{ message: 'The signature of the method is incorrect'}]
    });
});
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_di', {
    valid: valid,
    invalid: invalid
});
