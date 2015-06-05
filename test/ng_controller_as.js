//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_controller_as', {
    valid: [
        'angular.module("test").controller("Test", function () { $scope.$watch() } )',
        'angular.module("test").controller("Test", function () { doSomething($scope) } )'
    ],
    invalid: [
        { code: 'angular.module("test").controller("Test", function () { $scope.name = "test" } );',
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'angular.module("test").controller("Test", function () { var test = function () { $scope.thing = "none" }; } );',
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'function controllerFunc() { $scope.name = "test" } angular.module("test").controller("Test", controllerFunc );',
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'var controllerFunc = function () { $scope.name = "test" }; angular.module("test").controller("Test", controllerFunc );',
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'var controllerFunc = function () { $scope.name() }; angular.module("test").controller("Test", controllerFunc );',
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'angular.module("test").controller("Test", ["$scope", function ($scope) { $scope.name = "test" }] );',
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'var controllerFunc = function () { $scope.name() }; angular.module("test").controller("Test", ["$scope", controllerFunc] );',
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'function MyController () { $scope.name() }',
            args: [2, /MyController/],
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'module.exports = function MyController () { $scope.name() }',
            args: [2, /MyController/],
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] },
        { code: 'module.exports = function MyController () { $scope.name() }',
            args: [2, '/MyController/'],
            errors: [{ message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}] }
    ]
});
