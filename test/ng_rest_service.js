//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

var angularObjectList = ['controller', 'filter', 'directive', 'service', 'factory', 'provider'];
var possibleValues = ['$http', '$resource', 'Restangular'];
var valid = [], invalid = [];


angularObjectList.forEach(function(object){
    possibleValues.forEach(function(value) {
        valid.push({
            code: 'app.' + object + '("name", function(Service1){});',
            args: [1, value]
        },{
            code: 'app.' + object + '("name", function(Service1){});',
            args: [1]
        }, {
            code: 'app.' + object + '("name", ["Service1", function(Service1){}]);',
            args: [1, value]
        }, {
            code: '"use strict";app.' + object + '("name", ["Service1", function(Service1){}]);',
            args: [1, value]
        });
    });

    possibleValues.forEach(function(value){
        possibleValues.filter(function(v){ return v !== value}).forEach(function(badValue){
            invalid.push({
                code: 'app.' + object + '("name", function(' + badValue + '){});',
                args: [1, value],
                errors: [{ message: 'You should use the same service (' + value + ') for REST API calls'}]
            }, {
                code: 'app.' + object + '("name", ["' + badValue + '", function(' + badValue + '){}]);',
                args: [1, value],
                errors: [{ message: 'You should use the same service (' + value + ') for REST API calls'}]
            });
        });
    });

});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_rest_service', {
    valid: valid,
    invalid: invalid
});
