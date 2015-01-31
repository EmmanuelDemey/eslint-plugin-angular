//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_di', {
    valid: [{
        code: 'angular.controller("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.controller("name", [function(){}]);',
        args: [1, 'array']
    },
    {
        code: 'angular.directive("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.directive("name", [function(){}]);',
        args: [1, 'array']
    },
    {
        code: 'angular.filter("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.filter("name", [function(){}]);',
        args: [1, 'array']
    },
    {
        code: 'angular.value("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.value("name", [function(){}]);',
        args: [1, 'array']
    },
    {
        code: 'angular.constant("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.constant("name", [function(){}]);',
        args: [1, 'array']
    },
    {
        code: 'angular.service("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.service("name", [function(){}]);',
        args: [1, 'array']
    },
    {
        code: 'angular.factory("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.factory("name", [function(){}]);',
        args: [1, 'array']
    },
    {
        code: 'angular.provider("name", function(){});',
        args: [1, 'function']
    }, {
        code: 'angular.provider("name", [function(){}]);',
        args: [1, 'array']
    }],
    invalid: [
        {
            code: 'angular.controller("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.controller("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        },
        {
            code: 'angular.directive("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.directive("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        },
        {
            code: 'angular.filter("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.filter("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        },
        {
            code: 'angular.value("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.value("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        },
        {
            code: 'angular.constant("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.constant("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        },
        {
            code: 'angular.service("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.service("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        },
        {
            code: 'angular.factory("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.factory("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        },
        {
            code: 'angular.provider("name", function(){});',
            args: [1, 'array'],
            errors: [{ message: 'You should use the array syntax for DI'}]
        }, {
            code: 'angular.provider("name", [function(){}]);',
            args: [1, 'function'],
            errors: [{ message: 'You should use the function syntax for DI'}]
        }
    ]
});
